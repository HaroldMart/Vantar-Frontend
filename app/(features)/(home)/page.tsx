"use client";

import { BiSolidHome } from "react-icons/bi";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col flex-1 gap-3 justify-center items-center h-screen bg-gray-100">
        <div className="flex justify-center items-center p-6 bg-blue-100 rounded-full">
          <BiSolidHome size={36} className="fill-blue-700" />
        </div>
        <h1 className="text-4xl font-semibold text-[#795BF9]">
          Pagina de inicio
        </h1>
        <Link href={"products"}>Ir a productos</Link>
        <Link href={"inventory"}>Ir a inventarios</Link>
      </div>
    </>
  );
}
