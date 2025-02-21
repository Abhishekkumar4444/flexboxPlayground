import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Flexbox Playground",
    default:
      "Interactive Flexbox Playground - Learn CSS Layout Visually | CSS Tools",
  },
  description:
    "Master CSS Flexbox layouts through an interactive visual playground. Real-time preview, customizable properties, and hands-on learning for web developers and designers.",
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
