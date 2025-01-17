import "@/app/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/contexts/authContext";

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
                <AuthContextProvider>
                    <div className="flex bg-gray-100 w-full">
                        <div
                            role="main"
                            className="main flex flex-col w-full h-[100vh] overflow-hidden"
                        >
                            {children}
                            <div className="flex px-4 py-4">
                                <p className="select-none text-gray-500">
                                    © Vantar 2022-2024. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </AuthContextProvider>
                {/* <AuthContextProvider>
                    {children}
                </AuthContextProvider> */}
            </body>
        </html>
    );
}
