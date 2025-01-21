import type { Metadata } from "next";
import "./globals.css";
import FloatingTools from "../components/tools/FloatingTools";
import { ThemeProvider } from "./contexts/ThemeProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Music app",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <FloatingTools />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        <Script strategy="afterInteractive" src="https://sdk.scdn.co/spotify-player.js" async />
      </body>
    </html>
  );
}
