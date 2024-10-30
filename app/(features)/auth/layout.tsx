export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            Modulo de autenticación
            {children}
        </div>
    )
}