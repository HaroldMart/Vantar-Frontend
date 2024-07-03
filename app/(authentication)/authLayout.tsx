import React from 'react';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div role="main" className="main">
                    {children}
                </div>
            </body>
        </html>
    );
}
