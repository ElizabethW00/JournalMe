import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Journal Me",
  description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en">
        <body
          className={`${inter.className} bg-white w-full flex justify-center items-center min-h-screen`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
