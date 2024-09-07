import "@/app/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "../components/sidebar";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vantar",
  description: "The best web application",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex flex-1 h-screen overflow-y-auto">
          <div role="main" className="main w-full overflow-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
