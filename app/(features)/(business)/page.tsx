'use client'

import { BiSolidHome } from "react-icons/bi";
import ListBusiness from "./components/business-list";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col flex-1 gap-3 justify-center items-center h-screen bg-gray-100">
        <div className="flex justify-center items-center p-6 bg-blue-100 rounded-full">
          <BiSolidHome size={36} className="fill-blue-700" />
        </div>
        <h1 className="text-4xl font-semibold text-[#795BF9]">
          Seleccion de negocio
        </h1>
        <Link href={"/auth/logout"}>Cerrar Sesion</Link>
        <div className="flex flex-col items-center gap-4">
          <p>Cual negocio quieres gestionar?</p>
          <ListBusiness />
        </div>
      </div>
    </>
  );
}
