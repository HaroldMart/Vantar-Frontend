import { useEffect, useState } from "react";
import { BusinessService } from "../lib/service";
import { Business } from "../lib/model";
import Link from "next/link";

const businessService = new BusinessService();

export default function BusinessList() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newBusinessName, setNewBusinessName] = useState<string>("");
    const [editBusiness, setEditBusiness] = useState<Business | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const fetchBusinesses = async () => {
        try {
            const data = await businessService.getAllBusinesses();
            setBusinesses(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ha ocurrido un error desconocido");
            }
            console.error("Error obteniendo negocios:", error);
        }
    };

    const createBusiness = async () => {
        if (!newBusinessName) return;
        try {
            const newBusiness = await businessService.createBusiness({
                name: newBusinessName,
                id: "0000"
            });
            setBusinesses([...businesses, newBusiness]);
            setNewBusinessName("");
            setSuccessMessage("Negocio creado exitosamente.");
        } catch (error) {
            console.error("Error al crear negocio:", error);
        }
    };

    const updateBusiness = async () => {
        if (!editBusiness) return;
        try {
            await businessService.updateBusiness(editBusiness.id, editBusiness);
            setBusinesses(
                businesses.map((b) => (b.id === editBusiness.id ? editBusiness : b))
            );
            setEditBusiness(null);
            setSuccessMessage("Negocio actualizado exitosamente.");
        } catch (error) {
            console.error("Error al actualizar negocio:", error);
        }
    };

    const deleteBusiness = async (id: string) => {
        try {
            await businessService.deleteBusiness(id);
            setBusinesses(businesses.filter((business) => business.id !== id));
            setSuccessMessage("Negocio eliminado exitosamente.");
        } catch (error) {
            console.error("Error al eliminar negocio:", error);
        }
    };

    useEffect(() => {
        fetchBusinesses();
    }, []);

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen bg-gray-100">
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            {/* Formulario para crear un negocio */}
            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    value={newBusinessName}
                    onChange={(e) => setNewBusinessName(e.target.value)}
                    placeholder="Nombre del nuevo negocio"
                    className="border rounded px-2 py-1"
                />
                <button onClick={createBusiness} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Crear
                </button>
            </div>

            {/* Lista de negocios */}
            <ul className="w-full max-w-md">
                {businesses.map((business) => (
                    <li key={business.id} className="flex justify-between items-center mb-2">
                        <Link href={`/${business.id}`} className="text-blue-600 hover:underline">
                            {business.name}
                        </Link>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditBusiness(business)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => deleteBusiness(business.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Formulario para editar un negocio */}
            {editBusiness && (
                <div className="flex flex-col gap-2 items-center mt-4">
                    <input
                        type="text"
                        value={editBusiness.name}
                        onChange={(e) =>
                            setEditBusiness({ ...editBusiness, name: e.target.value })
                        }
                        className="border rounded px-2 py-1"
                    />
                    <button onClick={updateBusiness} className="bg-green-500 text-white px-4 py-2 rounded">
                        Actualizar
                    </button>
                    <button
                        onClick={() => setEditBusiness(null)}
                        className="text-gray-600 underline"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}
