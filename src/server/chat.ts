import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

type ChatInput = { system: string; message: string };

// Sliding-window in-memory rate limiter: max N requests per window per IP.
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const GLOBAL_MAX = 300; // soft cap across all clients per window
const ipHits = new Map<string, number[]>();
let globalHits: number[] = [];

function getClientIp(): string {
  const fwd =
    getRequestHeader("cf-connecting-ip") ||
    getRequestHeader("x-real-ip") ||
    getRequestHeader("x-forwarded-for") ||
    "";
  const ip = fwd.split(",")[0]?.trim();
  return ip || "unknown";
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  globalHits = globalHits.filter((t) => t > cutoff);
  if (globalHits.length >= GLOBAL_MAX) return false;
  const arr = (ipHits.get(ip) ?? []).filter((t) => t > cutoff);
  if (arr.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, arr);
    return false;
  }
  arr.push(now);
  globalHits.push(now);
  ipHits.set(ip, arr);
  // Opportunistic cleanup
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      const filtered = v.filter((t) => t > cutoff);
      if (filtered.length === 0) ipHits.delete(k);
      else ipHits.set(k, filtered);
    }
  }
  return true;
}

function validate(input: unknown): ChatInput {
  if (!input || typeof input !== "object") throw new Error("Invalid input");
  const { system, message } = input as Record<string, unknown>;
  if (typeof message !== "string" || !message.trim() || message.length > 2000) {
    throw new Error("Message must be 1–2000 characters");
  }
  const sys = typeof system === "string" ? system : "";
  if (sys.length > 6000) throw new Error("System too long");
  return { system: sys, message: message.trim() };
}

export const chatFn = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const ip = getClientIp();
    if (!rateLimit(ip)) {
      return { text: "", error: "Too many requests. Please try again shortly." };
    }
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return { text: "", error: "AI service not configured" };
    }
    try {
      const res = await fetch(
        "https://ua-recovery-chat.uamap.workers.dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiKey,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            max_tokens: 200,
            messages: [
              { role: "system", content: data.system || "You are a helpful AI." },
              { role: "user", content: data.message },
            ],
          }),
        }
      );
      if (!res.ok) return { text: "", error: "Upstream AI error" };
      const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      return { text: json.choices?.[0]?.message?.content ?? "", error: null };
    } catch {
      return { text: "", error: "Connection error" };
    }
  });
