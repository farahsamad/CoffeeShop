import Home from "@/components/home";
import AuthEventsHandler from "@/lib/authHandler";

export default function HomePage() {
  return (
    <>
      <AuthEventsHandler />
      <Home />
    </>
  );
}
