'use client'

import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

import { ProductsTable } from "./components/ProductsTable";

export default function Product() {
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
                                            Products
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