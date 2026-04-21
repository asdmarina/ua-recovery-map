import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { chatFn } from "@/server/chat";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "UA Recovery Map · Dashboard" },
      { name: "description", content: "Інтерактивна карта відновлення України — пілотний доступ." },
    ],
  }),
});

function Dashboard() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    async function onMessage(e: MessageEvent) {
      if (e.source !== ref.current?.contentWindow) return;
      const data = e.data as { type?: string; id?: string; system?: string; message?: string };
      if (data?.type !== "chat-request" || !data.id) return;
      try {
        const result = await chatFn({
          data: { system: data.system ?? "", message: data.message ?? "" },
        });
        ref.current?.contentWindow?.postMessage(
          { type: "chat-response", id: data.id, ...result },
          window.location.origin
        );
      } catch (err) {
        ref.current?.contentWindow?.postMessage(
          { type: "chat-response", id: data.id, text: "", error: (err as Error).message },
          window.location.origin
        );
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={ref}
      src="/map.html"
      title="UA Recovery Map Dashboard"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }}
    />
  );
}
