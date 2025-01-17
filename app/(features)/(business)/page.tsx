'use client'

import { BiSolidHome } from "react-icons/bi";
import ListBusiness from "./components/business-list";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center bg-gray-100">
        <h1 className="mt-20">
          Seleccion de negocio
        </h1>
        <Link href={"/auth/logout"}>Cerrar Sesion</Link>
        <div>
          <p>Cual negocio quieres gestionar?</p>
          <ListBusiness />
        </div>
      </div>
    </>
  );
}
