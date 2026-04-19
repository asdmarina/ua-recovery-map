import { createServerFn } from "@tanstack/react-start";

type ChatInput = { system: string; message: string };

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
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return { text: "", error: "AI service not configured" };
    }
    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
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
