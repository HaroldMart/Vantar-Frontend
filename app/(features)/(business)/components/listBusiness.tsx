"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BusinessService } from "../lib/service";
import { Business } from "../lib/model";

const business_service = new BusinessService();

export default function ListBusiness() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener la lista de negocios
  const fetchBusinesses = async () => {
    try {
      const data = await business_service.getAllBusinesses();
      if (typeof data === "string") {
        setError(data);
      } else {
        setBusinesses(data);
      }
    } catch {
      setError("Error al obtener los negocios.");
    }
  };

  // Llama a fetchBusinesses cuando el componente se monta
  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <div className="flex flex-col flex-1 gap-3 justify-center items-center h-screen bg-gray-100">
      {error && <p className="text-red-500">{error}</p>}
      {businesses.length === 0 ? (
        <p>No hay negocios disponibles.</p>
      ) : (
        <ul>
          {businesses.map((business) => (
            <li key={business.id}>
              <Link href={`/${business.id}`}>{business.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
