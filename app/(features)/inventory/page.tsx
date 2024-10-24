'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiChevronRight, BiTrash } from "react-icons/bi";

// Tipamos el objeto Producto
interface Product {
    name: string;
    price: number;
    quantity: number;
    cost: number;
}

interface Inventory {
    id: number;
    name: string;
    products: Product[];
  }

// Lista de productos predefinidos
const productsList: Product[] = [
    { name: "Leche", price: 90, quantity: 10, cost: 50 },
    { name: "Lestamilk", price: 50, quantity: 5, cost: 30 },
    { name: "Bizcocho", price: 100, quantity: 3, cost: 70 },
];


export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [inventory, setInventory] = useState<Product[]>([]);

    // Cargar productos desde localStorage cuando se monta el componente
    useEffect(() => {
        const storedInventory = localStorage.getItem('tempInventory');
        if (storedInventory) {
            setInventory(JSON.parse(storedInventory));
        }
    }, []);

    // Guardar productos temporalmente en localStorage
    useEffect(() => {
        if (inventory.length > 0) {
            localStorage.setItem('tempInventory', JSON.stringify(inventory));
        }
    }, [inventory]);

    // Función para añadir productos al inventario
    const addProduct = (product: Product) => {
        setInventory((prevInventory) => [...prevInventory, product]);
    };

    // Función para eliminar un producto del inventario temporal
    const removeProduct = (productIndex: number) => {
        setInventory((prevInventory) =>
            prevInventory.filter((_, index) => index !== productIndex)
        );
    };

    // Función para guardar los productos en la API y limpiar el localStorage
    const saveInventory = async () => {
        try {
            // Aquí llamas a la API para guardar el inventario
            await fetch('http://localhost:5000/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventory),
            });

            // Limpiar el localStorage después de guardar en la API
            localStorage.removeItem('tempInventory');
            alert('Inventario guardado con éxito.');
        } catch (error) {
            console.error('Error al guardar el inventario:', error);
            alert('Ocurrió un error al guardar el inventario.');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            setFilteredProducts(
                productsList.filter((product) =>
                    product.name.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setFilteredProducts([]);
        }
    };

    const handleAddProduct = (product: Product) => {
        setInventory([...inventory, { ...product, quantity: 1, cost: product.price }]);
        setSearchTerm("");
        setFilteredProducts([]);
    };

    const handleEditProduct = (
        index: number,
        field: keyof Product,
        value: string | number
    ) => {
        const newInventory = [...inventory];

        // Validar si el campo es numérico antes de asignar el valor
        if (field === 'price' || field === 'quantity' || field === 'cost') {
            newInventory[index][field] = +value; // Convertimos a número
        } else {
            newInventory[index][field] = value as string; // Si no es numérico, lo tratamos como string
        }

        setInventory(newInventory);
    };

    const handleDeleteProduct = (index: number) => {
        const newInventory = [...inventory];
        newInventory.splice(index, 1);
        setInventory(newInventory);
    };

    return (
        <>
            <div className="container mx-auto px-4 pt-8 h-full">
                <div className="h-full">
                    <nav className="flex px-5 py-3 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <Link href={"/"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105">
                                    <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <BiChevronRight />
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                                        Inventory
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="flex justify-around">
                    <h1 className="flex gap-2 items-center text-4xl font-medium text-gray-700 mb-6">
                        Inventarios
                    </h1>
                    <button onClick={saveInventory}>Guardar Inventario</button>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border rounded px-4 py-2"
                        />

                        {/* Muestra resultados filtrados */}
                        {filteredProducts.length > 0 && (
                            <ul className="border rounded w-full">
                                {filteredProducts.map((product, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleAddProduct(product)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {product.name} - {product.price}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Tabla del inventario */}
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="p-4">Nombre</th>
                                    <th scope="col" className="p-4">Cantidad</th>
                                    <th scope="col" className="p-4">Costo</th>
                                    <th scope="col" className="p-4">Precio</th>
                                    <th scope="col" className="p-4">Total</th>
                                    <th scope="col" className="p-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item, index) => (
                                    <tr key={index}>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <input
                                                type="number"
                                                value={item.quantity || 1}
                                                onChange={(e) => handleEditProduct(index, "quantity", +e.target.value)}
                                            />
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <input
                                                type="number"
                                                value={item.cost || 0}
                                                onChange={(e) => handleEditProduct(index, "cost", +e.target.value)}
                                            />
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.price}</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.price * (item.quantity || 1)}</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <button onClick={() => handleDeleteProduct(index)}>
                                                <BiTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    );
}
