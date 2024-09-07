import "@/app/global.css";
import Link from 'next/link'
import { BiArrowBack } from "react-icons/bi";

export default function NotFound() {
  return (
    <section className="flex flex-col h-screen justify-center items-center px-6 py-12 bg-gray-100">
      <div className="flex flex-col items-center gap-8 max-w-4xl w-full">
        <div className="flex flex-col items-center gap-6 text-center">
          <h6 className="text-[#6941C6] font-inter text-xl font-semibold">Error 404</h6>
          <h1 className="text-[#101828] font-inter text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            Página no encontrada
          </h1>
          <p className="text-[#475467] font-inter text-base md:text-lg lg:text-xl">
            Lo sentimos, la página que está buscando no existe. Aquí tiene algunos enlaces de ayuda:
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="/"
            className="flex justify-center items-center px-6 py-3 rounded-lg border border-[#D0D5DD] bg-white shadow-sm text-[#344054] font-inter text-base font-semibold hover:bg-[#F5F7F9] hover:border-[#B0B5B9] hover:shadow-md transition-all duration-300"
          >
            <BiArrowBack className="mr-2" /> Regresar
          </a>
          <a
            href="/"
            className="flex justify-center items-center px-6 py-3 rounded-lg border border-[#7F56D9] bg-[#7F56D9] shadow-sm text-white font-inter text-base font-semibold hover:bg-[#672e72] hover:border-[#6B2C77] hover:shadow-md transition-all duration-300"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </section>
  );
}
