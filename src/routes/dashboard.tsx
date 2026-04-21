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
  const src = `https://ua-recovery-map.uamap.workers.dev/map.html?v=${Date.now()}`;
  return (
    <iframe
      src={src}
      title="UA Recovery Map"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        display: 'block',
        margin: 0,
        padding: 0,
      }}
    />
  );
}
