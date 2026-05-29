import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/alert")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/alert"!</div>;
}
