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

export default function Dashboard() {
  return (
    <iframe
      src="/map.html"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        display: 'block',
        margin: 0,
        padding: 0
      }}
    />
  );
}
