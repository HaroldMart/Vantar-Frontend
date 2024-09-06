'use client'

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verifica que esté en el cliente
    if (typeof window !== "undefined") {
      // Supongamos que esta función verifica si el usuario está autenticado.
      const isAuthenticated = () => {
        // Aquí debes agregar la lógica real de autenticación.
        // Por ejemplo, podrías verificar un token en localStorage o usar un contexto global.
        return false; // Cambia a `true` si el usuario está autenticado.
      };

      // Si no está autenticado, redirige al login
      if (!isAuthenticated()) {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-[#795BF9]">Este es el Home</h1>
    </div>
  );
}
