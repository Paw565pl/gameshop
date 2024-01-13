import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Providers from "./components/Providers";
import Navbar from "./components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameShop",
};

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-6xl xl:px-0`}
      >
        <Providers>
          <Navbar />
          <main className="my-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
