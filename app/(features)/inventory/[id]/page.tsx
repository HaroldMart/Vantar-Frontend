"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { BiChevronRight, BiSolidHome } from "react-icons/bi";
import { ProductService } from "../../products/lib/service";

// hay que arreglar esta pagina

// const productsList = new ProductService.getAllProducts();

const InventoryDetail = ({ params }: { params: Record<string, string | string[]> }) => {
    const [inventory, setInventory] = useState(null);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [newProductId, setNewProductId] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { id } = params;

    useEffect(() => {
        // Obtener inventario por ID y productos
        const fetchInventory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/inventories/${id}`);
                setInventory(response.data);
                setProducts(response.data.products || []);
            } catch (error) {
                console.error("Error al obtener inventario", error);
            }
        };

        const fetchAllProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/products");
                setAllProducts(response.data);
            } catch (error) {
                console.error("Error al obtener productos", error);
            }
        };

        fetchInventory();
        fetchAllProducts();
    }, [id]);

    const handleAddProduct = async (product : any) => {
        // Verificar si el producto ya está en el inventario
        const existingProduct = products.find((p) => p.id === product.id);
        if (existingProduct) {
            alert("Este producto ya está en el inventario.");
            return;
        }

        const updatedInventory = {
            ...inventory,
            products: [...products, product],
        };

        // Actualizar inventario en db.json
        try {
            await axios.put(`http://localhost:5000/inventories/${id}`, updatedInventory);
            setProducts([...products, product]);
            setNewProductId("");
            setSearchTerm("");
            setFilteredProducts([]);
        } catch (error) {
            console.error("Error al añadir producto al inventario", error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        const updatedInventory = { ...inventory, products: updatedProducts };

        // Actualizar el inventario en db.json
        try {
            await axios.put(`http://localhost:5000/inventories/${id}`, updatedInventory);
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error al eliminar producto del inventario", error);
        }
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(value)
        );
        setFilteredProducts(filtered);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        if (value && id) {
            // Filtra los productos, excluyendo los ya en el inventario
            setFilteredProducts(
                allProducts.filter(
                    (product) =>
                        product.name.toLowerCase().includes(value) &&
                        !products.some((p) => p.id === product.id)
                )
            );
        } else {
            setFilteredProducts([]);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 pt-8 h-full text-gray-700">
                <div className="h-full">
                    <nav className="flex px-5 py-3 mb-6 text-gray-700 border border-gray-200 rounded-lg bg-gray-50" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <Link href={"/"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105">
                                    <BiSolidHome size={18} className="mr-1" />
                                    Inicio
                                </Link>
                            </li>
                            <BiChevronRight />
                            <li>
                                <Link href={"/inventory"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105">
                                    Inventario
                                </Link>
                            </li>
                            <BiChevronRight />
                            <li>
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-500">{inventory?.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <h1 className="text-3xl font-bold mb-4 text-gray-800">{inventory?.name}</h1>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {filteredProducts.length > 0 && (
                            <ul className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
                                {filteredProducts.map((product) => (
                                    <li
                                        key={product.id}
                                        onClick={() => handleAddProduct(product)}
                                        className="px-4 py-2 cursor-pointer hover:bg-blue-100 flex justify-between items-center"
                                    >
                                        <span>{product.name}</span>
                                        <span className="text-gray-500">${product.price}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <h2 className="text-xl font-semibold mb-2">Productos en el inventario:</h2>
                    <ul className="space-y-2">
                        {products.map((product) => (
                            <li key={product.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <span>{product.name}</span>
                                <span className="text-gray-500">${product.price}</span>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="px-3 py-1 text-red-600 border border-red-300 rounded-md hover:bg-red-100 transition"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default InventoryDetail;
