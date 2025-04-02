import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Cursed Signup",
  description: "Make your next account security partner Cursed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId={"G-KEVGM15YEL"} />
      <body>{children}</body>
    </html>
  );
}
