import type { Metadata } from "next";
import { Carter_One, Roboto_Slab } from "next/font/google";
import "./globals.css";

const carterOne = Carter_One({
  weight: "400",
  variable: "--font-carter-one",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PopChoice",
  description: "A simple movie recommender built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${carterOne.variable} ${robotoSlab.variable} antialiased bg-[#000C36] text-white`}>
        {children}
      </body>
    </html>
  );
}
