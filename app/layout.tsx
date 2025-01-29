import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoffeeShop",
  description: "Welcome to CoffeeShop, best Website to order beverages and coffees",
  manifest: "/site.webmanifest",
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "CoffeeShop",
    description: "Welcome to CoffeeShop, best Website to order beverages and coffees",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "CoffeeShop",
    images: "/image/open-graph.png",
    // [
    //   {
    //     url: "https://nextjs.org/og.png", // Must be an absolute URL
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
    //     width: 1800,
    //     height: 1600,
    //     alt: "My custom alt",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
};
export default async function RootLayout({
  children,
  login,
  signup,
}: Readonly<{
  children: React.ReactNode;
  login: React.ReactNode;
  signup: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header>
            <div>{login}</div>
            <div>{signup}</div>
            {children}
          </Header>
        </body>
      </html>
    </SessionProvider>
  );
}
