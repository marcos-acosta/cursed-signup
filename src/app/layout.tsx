import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
