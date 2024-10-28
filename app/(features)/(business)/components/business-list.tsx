import { useEffect, useState } from "react";
import { BusinessService } from "../lib/service";
import { Business } from "../lib/model";
import Link from "next/link";

const businessService = new BusinessService();

export default function BusinessList() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchBusinesses = async () => {
        try {
            const data = await businessService.getAllBusinesses();
            setBusinesses(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message); // Usa error.message si es una instancia de Error
            } else {
                setError("Ha ocurrido un error desconocido"); // Maneja otros tipos de errores
            }
            console.error("Error obteniendo negocios:", error);
        }
    };

    useEffect(() => {
        fetchBusinesses();
    }, []);

    return (
        <div className="flex flex-col flex-1 gap-3 justify-center items-center h-screen bg-gray-100">
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Muestra el mensaje de error */}
            <ul>
                {businesses.map((business) => (
                    <li key={business.id}>
                        <Link href={`/${business.id}`}>{business.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
