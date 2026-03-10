import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "할 일 관리",
  description: "Next.js + Tailwind CSS 할 일 관리 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
