'use client'

import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import { BiChevronDown, BiChevronLeft, BiChevronRight, BiEdit, BiFilter, BiPlus, BiSearch, BiSolidBox, BiTrash } from "react-icons/bi";
import axios from 'axios';

// importing the CRUD functions
import { productService } from "./lib/service"
import { GenericService } from "../shared/generic_service";
import { Product } from "./lib/core";

async function CRUD() {
    const mi_producto: Product = { // this is my product to create
        id: "4",
        name: "Aceite",
        price: 40.0
    }
    const generic_service = new GenericService<Product>;
    const product_service = new productService(generic_service); // this is the one i will use

    const response = await product_service.create(mi_producto)

    console.log(response)
}

const ProductsTable: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "" });
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterAccessories, setFilterAccessories] = useState("All");
    const [filterAvailable, setFilterAvailable] = useState("All");

    // Estados para los select
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isAvailableOpen, setIsAvailableOpen] = useState(false);
    const [isAccessoriesOpen, setIsAccessoriesOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = products.filter((item) => {
        return (
            item.name.toLowerCase().includes(search.toLowerCase())
            // (filterCategory === "All" || item.category === filterCategory) &&
            // (filterAvailable === "All" || item.available === filterAvailable) &&
            // (filterAccessories === "All" || item.accessories === filterAccessories)
        );
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterCategory, filterAccessories, filterAvailable]);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Elementos actuales a mostrar
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);


    // Función para obtener los productos desde la API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error obteniendo productos:", error);
        }
    };

    // Actualiza el estado del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Función para añadir un nuevo producto
    const addProduct = async (e: React.FormEvent) => {
        e.preventDefault();  // Evita el refresco de la página
        try {
            const response = await axios.post('http://localhost:5000/products', {
                name: newProduct.name,
                price: parseFloat(newProduct.price),  // Convertir el precio a número
            });
            setProducts([...products, response.data]); // Actualizamos la lista de productos
            setNewProduct({ name: "", price: "" }); // Limpiamos el formulario
        } catch (error) {
            console.error("Error añadiendo producto:", error);
        }
    };

    // Función para eliminar un producto
    const deleteProduct = async () => {
        if (!productToDelete) return; // Asegurarse de que hay un producto para eliminar
        try {
            await axios.delete(`http://localhost:5000/products/${productToDelete.id}`);
            setProducts(products.filter(product => product.id !== productToDelete.id)); // Filtrar el producto eliminado
            setShowDeletePopup(false);
        } catch (error) {
            console.error("Error eliminando producto:", error);
        }
    };

    // Función para abrir el popup de edición
    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setShowEditPopup(true);
    };

    // Función para abrir el popup de eliminación
    const handleDelete = (product: Product) => {
        setProductToDelete(product); // Establecer el producto a eliminar
        setShowDeletePopup(true);
    };

    // Función para actualizar el producto editado
    const updateProduct = async () => {
        if (!currentProduct) return;  // Comprobar si currentProduct es nulo
        try {
            await axios.put(`http://localhost:5000/products/${currentProduct.id}`, currentProduct);
            setProducts(products.map(product =>
                product.id === currentProduct.id ? currentProduct : product
            ));
            setShowEditPopup(false);
        } catch (error) {
            console.error("Error actualizando producto:", error);
        }
    };

    // Manejar cambios en los inputs de edición
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!currentProduct) return;  // Comprobar si currentProduct es nulo
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value } as Product); // Casting a Product
    };

    // Llamamos a la función para obtener los productos cuando el componente se monta
    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <>
            {/* Formulario para añadir nuevos productos */}
            <form onSubmit={addProduct}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Product</button>
            </form>

            <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex gap-2 w-full">
                    {/* Input de búsqueda visible por defecto */}
                    <div className="flex items-center gap-2">
                        <form className="max-w-lg mx-auto">
                            <div className="flex w-[450px]">
                                {/* Filtro por categoría */}
                                <div className="relative w-full max-w-36">
                                    <label htmlFor="category" className="sr-only">Filtrar por Categoría</label>
                                    <select
                                        id="category"
                                        value={filterCategory}
                                        disabled
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        onFocus={() => setIsCategoryOpen(true)}
                                        onBlur={() => setIsCategoryOpen(false)}
                                        className="bg-gray-50 border border-gray-300 rounded-l-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none pr-10"
                                    >
                                        <option value="All">All categories</option>
                                        <option value="NoneNA">Nothing</option>
                                    </select>

                                    {/* Ícono personalizado para Categoría */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <BiChevronDown
                                            size={20}
                                            className={`transition-transform duration-300 ${isCategoryOpen ? "rotate-90" : ""}`}
                                        />
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="search"
                                        id="search-products-dropdown"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search Products..."
                                        required
                                    />
                                    <button type="submit" disabled className="absolute h-full top-0 end-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        <BiSearch size={18} />
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>


                        {/* Botón para mostrar u ocultar los filtros */}
                        <button
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}  // Cambia el estado para mostrar/ocultar los filtros
                            className=" py-2.5 px-2.5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                        >
                            <BiFilter
                                size={20}
                                className={`transition-transform duration-300`}
                            />
                            {/* {isFiltersOpen ? "Ocultar Filtros" : "Mostrar Filtros"} */}
                        </button>
                    </div>

                    {/* Filtros ocultos/desplegables */}
                    {isFiltersOpen && (
                        <div className="flex gap-2 w-full">
                            {/* Filtro por disponibilidad */}
                            <div className="relative w-full max-w-40">
                                <label htmlFor="available" className="sr-only">Filtrar por Disponibilidad</label>
                                <select
                                    id="available"
                                    value={filterAvailable}
                                    disabled
                                    onChange={(e) => setFilterAvailable(e.target.value)}
                                    onFocus={() => setIsAvailableOpen(true)}
                                    onBlur={() => setIsAvailableOpen(false)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none pr-10"
                                >
                                    <option value="All">Disponibilidad</option>
                                    <option value="Yes">Disponible</option>
                                    <option value="No">No disponible</option>
                                </select>

                                {/* Ícono personalizado para Disponibilidad */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <BiChevronDown
                                        size={20}
                                        className={`transition-transform duration-300 ${isAvailableOpen ? "rotate-90" : ""}`}
                                    />
                                </div>
                            </div>

                            <div className="relative w-full max-w-40">
                                <label htmlFor="accessories" className="sr-only">Filtrar por Accesorios</label>
                                <select
                                    id="accessories"
                                    value={filterAccessories}
                                    disabled
                                    onChange={(e) => setFilterAccessories(e.target.value)}
                                    onFocus={() => setIsAccessoriesOpen(true)}
                                    onBlur={() => setIsAccessoriesOpen(false)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none pr-10"
                                >
                                    <option value="All">Accesorios</option>
                                    <option value="Yes">Con accesorios</option>
                                    <option value="No">Sin accesorios</option>
                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <BiChevronDown
                                        size={20}
                                        className={`transition-transform duration-300 ${isAccessoriesOpen ? "rotate-90" : ""}`}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center w-full gap-7 relative shadow-md sm:rounded-lg max-h-[430px] overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((product) => (
                                <tr key={product.id}>
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input id={`checkbox-${product.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor={`checkbox-${product.id}`} className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.id}</td>
                                    <td className="px-6 py-4">{product.name}</td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-6 py-4 flex space-x-4">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <BiEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <BiTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <button
                                onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="">Previous</span>
                                {/* <BiChevronLeft size={24} /> */}
                            </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight transition-all duration-100 border-gray-300 ${currentPage === index + 1
                                        ? "text-white bg-blue-600 border hover:bg-blue-700 hover:text-white"
                                        : "text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="">Next</span>
                                {/* <BiChevronRight size={24} /> */}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>



            {/* Popup para Editar Producto */}
            {showEditPopup && currentProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800">Edit Product</h3>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={currentProduct.name}
                                    onChange={handleEditChange}
                                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter product name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
                                    Product Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={currentProduct.price}
                                    onChange={handleEditChange}
                                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter product price"
                                />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={updateProduct}
                                    className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowEditPopup(false)}
                                    className="bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}

            {/* Popup para Confirmar Eliminación */}
            {showDeletePopup && productToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="mb-4 text-lg font-medium">Confirm Delete</h3>
                        <p>Are you sure you want to delete the product: <strong>{productToDelete.name}</strong>?</p>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                onClick={deleteProduct}
                            >
                                Delete
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={() => setShowDeletePopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default function Layout() {
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterAccessories, setFilterAccessories] = useState("All");
    const [filterAvailable, setFilterAvailable] = useState("All");

    const products = [
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

    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = products.filter((item) => {
        return (
            item.name.toLowerCase().includes(search.toLowerCase()) &&
            (filterCategory === "All" || item.category === filterCategory) &&
            (filterAvailable === "All" || item.available === filterAvailable) &&
            (filterAccessories === "All" || item.accessories === filterAccessories)
        );
    });

    // useEffect que resetea la página al cambiar los filtros
    useEffect(() => {
        setCurrentPage(1);  // Resetea a la primera página
    }, [search, filterCategory, filterAccessories, filterAvailable]);

    const itemsPerPage = 6; // Número de elementos por página
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // Calcula el número total de páginas
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Calcula el índice de los elementos actuales a mostrar
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Filtra y pagina los inventarios
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // CRUD()
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
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2"> {/* dark:text-gray-400 dark:hover:text-white */}
                                            Projects
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="flex gap-2 items-center text-4xl font-medium text-gray-700 mb-6">
                            Productos
                        </h1>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <ProductsTable />
                    </div>
                </div>
            </div>
        </>
    )
}