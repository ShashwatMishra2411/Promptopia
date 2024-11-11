
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Provider> */}
        <div className="main flex">
          <div className="gradient"></div>
        </div>
        <main className="app flex">
          <Nav />
          {children}
        </main>
        {/* </Provider> */}
      </body>
    </html>
  );
}
