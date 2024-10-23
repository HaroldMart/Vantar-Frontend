'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronLeft, BiChevronRight, BiEdit, BiFilter, BiPlus, BiSearch, BiSolidBox, BiTrash } from "react-icons/bi";

export default function Layout() {
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterAccessories, setFilterAccessories] = useState("All");
    const [filterAvailable, setFilterAvailable] = useState("All");

    // Estados separados para cada select
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isAvailableOpen, setIsAvailableOpen] = useState(false);
    const [isAccessoriesOpen, setIsAccessoriesOpen] = useState(false);

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);  // Estado para mostrar u ocultar los filtros

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

    // Estado para controlar la visibilidad del popup de edición
    const [showEditPopup, setShowEditPopup] = useState(false);

    // Estado para controlar la visibilidad del popup de confirmación de eliminación
    const [showDeletePopup, setShowDeletePopup] = useState(false);


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
                                                onChange={(e) => setFilterCategory(e.target.value)}
                                                onFocus={() => setIsCategoryOpen(true)}
                                                onBlur={() => setIsCategoryOpen(false)}
                                                className="bg-gray-50 border border-gray-300 rounded-l-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none pr-10"
                                            >
                                                <option value="All">All categories</option>
                                                <option value="Laptop">Laptop</option>
                                                <option value="Accessories">Accessories</option>
                                                <option value="Watches">Watches</option>
                                                <option value="PC">PC</option>
                                                <option value="Tablet">Tablet</option>
                                                <option value="Gaming Laptop">Gaming Laptop</option>
                                                <option value="Camera">Camera</option>
                                                <option value="Drone">Drone</option>
                                                <option value="Headphones">Headphones</option>
                                            </select>

                                            {/* Ícono personalizado para Categoría */}
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <BiChevronDown
                                                    size={20}
                                                    className={`transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
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
                                                className={`transition-transform duration-300 ${isAvailableOpen ? "rotate-180" : ""}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Filtro por accesorios */}
                                    <div className="relative w-full max-w-40">
                                        <label htmlFor="accessories" className="sr-only">Filtrar por Accesorios</label>
                                        <select
                                            id="accessories"
                                            value={filterAccessories}
                                            onChange={(e) => setFilterAccessories(e.target.value)}
                                            onFocus={() => setIsAccessoriesOpen(true)}
                                            onBlur={() => setIsAccessoriesOpen(false)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none pr-10"
                                        >
                                            <option value="All">Accesorios</option>
                                            <option value="Yes">Con accesorios</option>
                                            <option value="No">Sin accesorios</option>
                                        </select>

                                        {/* Ícono personalizado para Accesorios */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <BiChevronDown
                                                size={20}
                                                className={`transition-transform duration-300 ${isAccessoriesOpen ? "rotate-180" : ""}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contenedor con scroll solo para la tabla */}
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
                                        <th scope="col" className="px-6 py-3">Price</th>
                                        <th scope="col" className="px-6 py-3">Weight</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedProducts.map((item, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input id={`checkbox-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                                    <label htmlFor={`checkbox-${index}`} className="sr-only">checkbox</label>
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
                                            <td className="px-6 py-4 flex space-x-4"> {/* Columna de acciones */}
                                                <button
                                                    onClick={() => setShowEditPopup(true)} // Muestra popup de edición
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <BiEdit size={18} /> {/* Icono de edición */}
                                                </button>
                                                <button
                                                    onClick={() => setShowDeletePopup(true)} // Muestra popup de eliminar
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <BiTrash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Popup de edición */}
                            {showEditPopup && (
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <h3 className="mb-4 text-lg font-medium">Edit Product</h3>
                                        <input className="w-full p-2 mb-4 border rounded" placeholder="Product Name" />
                                        <input className="w-full p-2 mb-4 border rounded" placeholder="Color" />
                                        <input className="w-full p-2 mb-4 border rounded" placeholder="Category" />
                                        <input className="w-full p-2 mb-4 border rounded" placeholder="Accessories" />
                                        <input className="w-full p-2 mb-4 border rounded" placeholder="Available" />
                                        <input className="w-full p-2 mb-4 border rounded" placeholder="Price" />
                                        <input className="w-full p-2 mb-4 border rounded" placeholder="Weight" />
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                                onClick={() => setShowEditPopup(false)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                                onClick={() => setShowEditPopup(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Popup de confirmación de eliminación */}
                            {showDeletePopup && (
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <h3 className="mb-4 text-lg font-medium">Confirm Delete</h3>
                                        <p>Are you sure you want to delete this product?</p>
                                        <div className="flex justify-end space-x-2 mt-4">
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                                onClick={() => setShowDeletePopup(false)}
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
                </div>
            </div>
        </>
    )
}