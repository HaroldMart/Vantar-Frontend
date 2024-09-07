'use client'

import { Inter } from "next/font/google";
import { ReactNode, useState } from "react";
import { BiPlus, BiTask } from "react-icons/bi";

const inter = Inter({ subsets: ["latin"] });

export default function InventoryPage() {
  const [search, setSearch] = useState("");

  // Datos ficticios para inventarios y productos
  const inventories = [
    { name: "Apple MacBook Pro 17\"", color: "Silver", category: "Laptop", accessories: "Yes", available: "Yes", price: "$2999", weight: "3.0 lb." },
    { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", accessories: "No", available: "Yes", price: "$1999", weight: "1.0 lb." },
    { name: "Magic Mouse 2", color: "Black", category: "Accessories", accessories: "Yes", available: "No", price: "$99", weight: "0.2 lb." },
    { name: "Apple Watch", color: "Black", category: "Watches", accessories: "Yes", available: "No", price: "$199", weight: "0.12 lb." },
    { name: "Apple iMac", color: "Silver", category: "PC", accessories: "Yes", available: "Yes", price: "$2999", weight: "7.0 lb." },
    { name: "Apple AirPods", color: "White", category: "Accessories", accessories: "No", available: "Yes", price: "$399", weight: "38 g" },
    { name: "Dell XPS 13", color: "Black", category: "Laptop", accessories: "Yes", available: "Yes", price: "$1299", weight: "2.7 lb." },
    { name: "Samsung Galaxy Tab S7", color: "Gray", category: "Tablet", accessories: "No", available: "Yes", price: "$649", weight: "1.1 lb." },
    { name: "Logitech MX Master 3", color: "Gray", category: "Accessories", accessories: "No", available: "Yes", price: "$99", weight: "0.3 lb." },
    { name: "HP Spectre x360", color: "Silver", category: "Laptop", accessories: "Yes", available: "No", price: "$1599", weight: "2.9 lb." },
    { name: "Sony WH-1000XM4", color: "Black", category: "Headphones", accessories: "No", available: "Yes", price: "$349", weight: "0.56 lb." },
    { name: "Google Pixelbook Go", color: "Black", category: "Laptop", accessories: "Yes", available: "Yes", price: "$899", weight: "2.3 lb." },
    { name: "Bose QuietComfort 35 II", color: "Silver", category: "Headphones", accessories: "Yes", available: "Yes", price: "$299", weight: "0.68 lb." },
    { name: "Razer Blade 15", color: "Black", category: "Gaming Laptop", accessories: "Yes", available: "No", price: "$2399", weight: "4.5 lb." },
    { name: "Asus ROG Strix G15", color: "Gray", category: "Gaming Laptop", accessories: "Yes", available: "Yes", price: "$1799", weight: "5.2 lb." },
    { name: "Nikon Z6 II", color: "Black", category: "Camera", accessories: "Yes", available: "No", price: "$1999", weight: "1.4 lb." },
    { name: "Canon EOS R5", color: "Black", category: "Camera", accessories: "Yes", available: "Yes", price: "$3899", weight: "1.5 lb." },
    { name: "DJI Mavic Air 2", color: "Gray", category: "Drone", accessories: "Yes", available: "Yes", price: "$799", weight: "0.57 lb." },
    { name: "GoPro Hero 9", color: "Black", category: "Camera", accessories: "Yes", available: "Yes", price: "$399", weight: "0.28 lb." }
  ];


  const tableBody = document.querySelector("tbody");

  // Función para filtrar por búsqueda
  const filteredInventories = inventories.filter((inventory) =>
    inventory.name.toLowerCase().includes(search.toLowerCase())
  );

  function item(value: { name: string; color: string; category: string; accessories: string; available: string; price: string; weight: string; }, index: number, array: { name: string; color: string; category: string; accessories: string; available: string; price: string; weight: string; }[]): ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={`${inter.className} w-full`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="flex gap-2 items-center text-4xl font-medium text-gray-700 mb-6"><BiTask size={32} /> Inventarios</h1>

        {/* Barra de búsqueda */}
        <div className="mb-6 flex justify-between">
          <input
            type="text"
            placeholder="Buscar inventarios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded border border-gray-300 w-1/3"
          />
          <button className="flex gap-1 items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            <BiPlus />
            Añadir Inventario
          </button>
        </div>

        {/* Tabla de Inventarios */}
        {/* <table className="w-full bg-white shadow-md rounded-lg">
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
        </table> */}

        {/* Detalle de productos dentro del inventario */}
        {/* {filteredInventories.map((inventory) => (
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
        ))} */}



        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Accessories
                </th>
                <th scope="col" className="px-6 py-3">
                  Available
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Weight
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {inventories.map((item) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    {item.color}
                  </td>
                  <td className="px-6 py-4">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    {item.accessories}
                  </td>
                  <td className="px-6 py-4">
                    {item.available}
                  </td>
                  <td className="px-6 py-4">
                    {item.price}
                  </td>
                  <td className="px-6 py-4">
                    {item.weight}
                  </td>
                  <td className="flex items-center px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                    <a href="#" className="font-medium text-red-600 hover:underline ml-3">Remove</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}
