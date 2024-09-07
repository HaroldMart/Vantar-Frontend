'use client'

import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function InventoryPage() {
  const [search, setSearch] = useState("");

  // Datos ficticios para inventarios y productos
  const inventories = [
    {
      id: "inv1",
      name: "Inventario Principal",
      products: [
        { id: "prod1", name: "Producto A", price: 100, stock: 20, category: "Electrónica" },
        { id: "prod2", name: "Producto B", price: 200, stock: 15, category: "Muebles" },
      ],
    },
    {
      id: "inv2",
      name: "Inventario Secundario",
      products: [
        { id: "prod3", name: "Producto C", price: 150, stock: 30, category: "Herramientas" },
        { id: "prod4", name: "Producto D", price: 300, stock: 10, category: "Juguetes" },
      ],
    },
  ];

  // Función para filtrar por búsqueda
  const filteredInventories = inventories.filter((inventory) =>
    inventory.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${inter.className} bg-gray-100 min-h-screen w-full`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#795BF9] mb-6">Inventarios</h1>

        {/* Barra de búsqueda */}
        <div className="mb-6 flex justify-between">
          <input
            type="text"
            placeholder="Buscar inventarios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded border border-gray-300 w-1/3"
          />
          <button className="bg-[#00FF6E] text-white px-4 py-2 rounded hover:bg-green-500">
            Añadir Inventario
          </button>
        </div>

        {/* Tabla de Inventarios */}
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#795BF9] text-white">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Productos</th>
              <th className="p-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventories.map((inventory) => (
              <tr key={inventory.id} className="border-b">
                <td className="p-4">{inventory.id}</td>
                <td className="p-4">{inventory.name}</td>
                <td className="p-4">{inventory.products.length}</td>
                <td className="p-4">
                  <button className="text-blue-500 mr-2">Ver</button>
                  <button className="text-yellow-500 mr-2">Editar</button>
                  <button className="text-red-500">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Detalle de productos dentro del inventario */}
        {filteredInventories.map((inventory) => (
          <div key={inventory.id} className="mt-8">
            <h2 className="text-2xl font-semibold text-[#795BF9] mb-4">{inventory.name} - Productos</h2>

            <table className="w-full bg-white shadow-md rounded-lg mb-6">
              <thead>
                <tr className="bg-[#795BF9] text-white">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Nombre</th>
                  <th className="p-4 text-left">Precio</th>
                  <th className="p-4 text-left">Stock</th>
                  <th className="p-4 text-left">Categoría</th>
                  <th className="p-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventory.products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-4">{product.id}</td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">
                      <button className="text-blue-500 mr-2">Ver</button>
                      <button className="text-yellow-500 mr-2">Editar</button>
                      <button className="text-red-500">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="bg-[#00FF6E] text-white px-4 py-2 rounded hover:bg-green-500">
              Añadir Producto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
