import "@/app/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./components/sidebar";
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
        {/* <Sidebar /> */}
        <div className="flex bg-gray-100 flex-1 h-screen overflow-y-auto">
          <div role="main" className="main flex flex-col w-full h-auto overflow-auto">
            {children}
            <div className="px-4 pb-4 font-inter">
              <p className="select-none text-gray-500">© Vantar 2022-2024. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
