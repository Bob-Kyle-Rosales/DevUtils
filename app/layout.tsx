import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevUtils",
  description: "A collection of useful development tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <div
          style={{
            display: "flex",
            height: "100vh",
            overflow: "hidden",
            background: "var(--color-background-primary)",
          }}
        >
          <Sidebar />
          <main
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
