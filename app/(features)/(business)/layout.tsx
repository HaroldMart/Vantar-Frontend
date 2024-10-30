"use client";

import useAuthContext, { AuthContextProvider } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isLoggedIn } = useAuthContext();
    const router = useRouter();

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/auth/login"); // Redirige a la página de inicio de sesión
        }
    }, [isLoggedIn, router]);

    // Renderizar solo si el usuario está autenticado
    if (!isLoggedIn) {
        return null; // Alternativamente, puedes mostrar un spinner o mensaje de carga aquí
    }

    return (
        <AuthContextProvider>
            <div className="w-full">
                {children}
            </div>
        </AuthContextProvider>
    );
}
