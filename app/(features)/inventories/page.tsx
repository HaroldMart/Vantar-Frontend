// app/inventory/page.tsx
"use client"; // Esto es necesario para Client Components

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { BiChevronRight } from "react-icons/bi";

interface Inventory {
    id: string;
    name: string;
    products: any[];
}

export default function InventoryPage() {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [currentMonth, setCurrentMonth] = useState<string>('');
    const [newInventoryName, setNewInventoryName] = useState<string>('');
    const [editInventory, setEditInventory] = useState<Inventory | null>(null);
    const [deleteInventoryId, setDeleteInventoryId] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const API_URL = 'http://localhost:5000/inventories';

    // Función para obtener inventarios desde la API
    const fetchInventories = async () => {
        try {
            const response = await axios.get(API_URL);
            setInventories(response.data);
        } catch (error) {
            console.error("Error al obtener los inventarios", error);
        }
    };

    // useEffect para cargar los inventarios al cargar la página
    useEffect(() => {
        fetchInventories();

        const date = new Date();
        const monthName = date.toLocaleString('default', { month: 'long' });
        setCurrentMonth(monthName);
    }, []);

    // Crear un nuevo inventario
    const createInventory = async () => {
        try {
            const existingInventoriesForMonth = inventories.filter(inv =>
                inv.name.startsWith(`Inventario ${currentMonth}`)
            );
            const inventoryNumber = existingInventoriesForMonth.length + 1;

            const generateRandomId = () => {
                return Math.random().toString(36).substr(2, 9); // Genera un string alfanumérico de 9 caracteres
            };

            // Luego úsalo en tu código:
            const newInventory: Inventory = {
                id: generateRandomId(), // Genera un id único aleatorio
                name: `Inventario ${currentMonth}${inventoryNumber > 1 ? ` ${inventoryNumber}` : ''}`,
                products: [],
            };

            const response = await axios.post(API_URL, newInventory);
            setInventories([...inventories, response.data]);
        } catch (error) {
            console.error("Error al crear el inventario", error);
        }
    };

    // Actualizar el nombre de un inventario
    const updateInventory = async () => {
        if (!editInventory) return;

        try {
            const updatedInventory = { ...editInventory, name: newInventoryName };
            const response = await axios.put(`${API_URL}/${editInventory.id}`, updatedInventory);

            setInventories(inventories.map(inv => (inv.id === editInventory.id ? response.data : inv)));
            setEditInventory(null);
            setNewInventoryName('');
        } catch (error) {
            console.error("Error al actualizar el inventario", error);
        }
    };

    // Eliminar un inventario
    const deleteInventory = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setInventories(inventories.filter(inv => inv.id !== id));
            setDeleteInventoryId(null);
            setSuccessMessage('Inventario eliminado exitosamente.');
        } catch (error) {
            console.error("Error al eliminar el inventario", error);
        }
    };

    // Mostrar mensaje de confirmación y ocultarlo después de unos segundos
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <>
            <div className="container mx-auto px-4 pt-8 h-full">
                <div className="h-full">
                    <div className="">
                        <nav className="flex px-5 py-3 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50" aria-label="Breadcrumb"> {/* dark:bg-gray-800 dark:border-gray-700 */}
                            {/* Breadcrumb Content */}
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <Link href={"/"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105"> {/* dark:text-gray-400 dark:hover:text-white */}
                                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <BiChevronRight />
                                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2"> {/* dark:text-gray-400 dark:hover:text-white */}
                                            Gestión de Inventarios
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="flex gap-2 items-center text-4xl font-medium text-gray-700 mb-6">
                            Gestión de Inventarios
                        </h1>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="container mx-auto px-4 pt-8">
                            <button
                                onClick={createInventory}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Crear Inventario
                            </button>

                            {/* Mostrar inventarios existentes */}
                            <h2 className="text-xl font-semibold mt-6">Inventarios Existentes</h2>
                            <ul className="list-disc pl-5">
                                {inventories.length > 0 ? (
                                    inventories.map((inv) => (
                                        <li key={inv.id} className="mt-2 flex justify-between items-center">
                                            <Link href={`/inventory/${inv.id}`}>
                                                {inv.name}
                                            </Link>

                                            {/* Botones de editar y eliminar */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditInventory(inv)}
                                                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => setDeleteInventoryId(inv.id)}
                                                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>No hay inventarios disponibles.</p>
                                )}
                            </ul>

                            {/* Dialog para editar inventario */}
                            {editInventory && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded shadow-lg">
                                        <h3 className="text-xl font-bold mb-4">Editar Inventario</h3>
                                        <input
                                            type="text"
                                            value={newInventoryName}
                                            onChange={(e) => setNewInventoryName(e.target.value)}
                                            placeholder="Nuevo nombre"
                                            className="w-full p-2 border rounded mb-4"
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={updateInventory}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={() => setEditInventory(null)}
                                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Dialog para confirmar eliminación */}
                            {deleteInventoryId && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded shadow-lg">
                                        <h3 className="text-xl font-bold mb-4">¿Estás seguro de que deseas eliminar este inventario?</h3>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => deleteInventory(deleteInventoryId)}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Eliminar
                                            </button>
                                            <button
                                                onClick={() => setDeleteInventoryId(null)}
                                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Popup de confirmación de eliminación */}
                            {successMessage && (
                                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                                    {successMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
