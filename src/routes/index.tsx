import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/landing.html"
      title="UA Recovery Map"
      style={{ width: "100%", height: "100vh", border: 0, display: "block" }}
    />
  );
}
