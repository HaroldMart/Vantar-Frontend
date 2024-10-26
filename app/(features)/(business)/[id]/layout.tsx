
import type { Metadata } from "next";
import Sidebar from "../components/sidebar";

export const metadata: Metadata = {
    title: "Vantar",
    description: "The best web application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex bg-gray-100 w-full">
            {/* <Sidebar /> */}
            <div role="main" className="main flex flex-col w-full h-[100vh] overflow-hidden">
                {children}
                <div className="flex px-4 py-4">
                    <p className="select-none text-gray-500">
                        © Vantar 2022-2024. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
