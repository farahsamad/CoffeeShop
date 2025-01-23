import Home from "@/components/home";
import AuthEventsHandler from "@/lib/authHandler";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <AuthEventsHandler />
      <Home />
    </>
  );
}
