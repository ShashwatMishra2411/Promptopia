import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={null}>
        <div className="main flex">
          <div className="gradient"></div>
        </div>
        <main className="app flex">
          <Nav />
          {children}
        </main>
        </Provider>
      </body>
    </html>
  );
}
