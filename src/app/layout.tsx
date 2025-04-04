import type { Metadata } from "next";

import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Fayrox",
  description: "The official website for Fayrox Legal.",
};

import { PostHogProvider } from './providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <PostHogProvider>
        <div style={{maxWidth: "1000px", display: "flex", flexDirection: "column", margin: "auto"}}>
          <Header />
          {children}
        </div>
        <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}

