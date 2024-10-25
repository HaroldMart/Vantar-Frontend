"use client";


import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { products } from "@/POSIBLE ELIMINAR/DATABASE";
import Link from "next/link";
import { BiChevronRight, BiHome, BiHomeAlt, BiSolidHome } from "react-icons/bi";


const productsList = products;

const InventoryDetail = ({ params }) => {
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

    const handleAddProduct = async () => {
        // Verificar si el producto ya está en el inventario
        const existingProduct = products.find((product) => product.id === newProductId);
        if (existingProduct) {
            alert("Este producto ya está en el inventario.");
            return;
        }

        // Obtener el producto de la lista general de productos
        const productToAdd = allProducts.find((product) => product.id === newProductId);

        if (productToAdd) {
            const updatedInventory = {
                ...inventory,
                products: [...products, productToAdd],
            };

            // Actualizar inventario en db.json
            try {
                await axios.put(`http://localhost:5000/inventories/${id}`, updatedInventory);
                setProducts([...products, productToAdd]);
                setNewProductId("");
            } catch (error) {
                console.error("Error al añadir producto al inventario", error);
            }
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
        // const value = e.target.value;

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
                                        <span className="text-sm font-medium text-gray-500"> {/* dark:text-gray-400 dark:hover:text-white */}
                                            {inventory?.name}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="flex gap-2 items-center text-4xl font-medium text-gray-700 mb-6">
                            {inventory?.name}
                        </h1>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <ul>
                            {filteredProducts.map((product, index) => (
                                <li key={index} onClick={() => handleAddProduct(product)}>
                                    {product.name} - {product.price}
                                </li>
                            ))}
                        </ul>

                        <h2>Productos en el inventario:</h2>
                        <ul>
                            {(searchTerm ? filteredProducts : products).map((product) => (
                                <li key={product.id}>
                                    {product.name} - ${product.price}
                                    <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>

                        <h2>Añadir nuevo producto</h2>
                        <select
                            title="Seleccioanar Producto"
                            value={newProductId}
                            onChange={(e) => setNewProductId(e.target.value)}
                        >
                            <option value="">Selecciona un producto</option>
                            {allProducts.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - ${product.price}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleAddProduct}>Añadir producto</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InventoryDetail;
