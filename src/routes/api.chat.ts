import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_FALLBACK =
  "You are UA Recovery AI — an analyst for Ukraine recovery data platform. Be concise.";

type ChatBody = {
  system?: unknown;
  message?: unknown;
  lang?: unknown;
};

function isString(v: unknown): v is string {
  return typeof v === "string";
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "AI service not configured" }),
            { status: 503, headers: { "Content-Type": "application/json" } }
          );
        }

        let body: ChatBody;
        try {
          body = (await request.json()) as ChatBody;
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const message = isString(body.message) ? body.message.trim() : "";
        const system = isString(body.system) ? body.system : SYSTEM_FALLBACK;

        if (!message || message.length > 2000) {
          return new Response(
            JSON.stringify({ error: "Message must be 1–2000 characters" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        if (system.length > 6000) {
          return new Response(JSON.stringify({ error: "System too long" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
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
                  { role: "system", content: system },
                  { role: "user", content: message },
                ],
              }),
            }
          );
          if (!res.ok) {
            return new Response(
              JSON.stringify({ error: "Upstream AI error" }),
              { status: 502, headers: { "Content-Type": "application/json" } }
            );
          }
          const data = (await res.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const text = data.choices?.[0]?.message?.content ?? "";
          return new Response(JSON.stringify({ text }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          return new Response(JSON.stringify({ error: "Connection error" }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
