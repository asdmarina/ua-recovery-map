import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <iframe
      src="/dashboard.html"
      title="UA Recovery Map Dashboard"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }}
    />
  );
}
