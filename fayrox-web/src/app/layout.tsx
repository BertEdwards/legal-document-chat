import type { Metadata } from "next";

import { Roboto } from "next/font/google";

import "./globals.css";

import Header from "@/componenets/header";
import Footer from "@/componenets/footer";

export const metadata: Metadata = {
  title: "Fayrox",
  description: "The official website for Fayrox Legal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
