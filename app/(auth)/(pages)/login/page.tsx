"use client";

import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';

import { login } from "@auth/lib/auth-actions";
import { LoginCredentials } from "@auth/lib/interfaces";
import { Button, Input, Toaster } from "@shared/_components";
import { loginSchema } from "@auth/lib/schemas";
import { useState } from "react";

export default function Page() {
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const { handleSubmit, register, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema)
  });
  const onSubmit = handleSubmit(async (credentials) => {
    setLoading(true);
    const res = await login(credentials);
    setLoading(false);
    toast(`${res.message[0]}`);
  });

  return (
    <section className="flex h-full items-start bg-white" id="login">
      <Toaster/>
      <div className="flex flex-col justify-center items-center flex-1 h-full p-8">
        <div className="flex flex-col justify-center items-center gap-4 p-10 w-full">
          <Image src="/images/logo.png" width={48} height={48} alt="Logo" />
          <div className="flex flex-col justify-center items-center gap-3 w-full text-center">
            <h2 className="text-3xl font-semibold text-gray-900">Login</h2>
            <p className="text-lg text-gray-500">
              Bienvenido, ingresa tus credenciales.
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              disabled={isLoading}
              id="email"
              type="email"
              placeholder="Ingresa tu e-mail"
              aria-label="Email"
              error={errors.email?.message}
              {...register("email", {
                required: true,
              })}
            />
            <Input
              disabled={isLoading}
              id="password"
              placeholder="•••••••••••"
              aria-label="Password"
              type="password"
              error={errors.password?.message}
              {...register("password", { required: true })}
            />
          </div>
          <div className="flex justify-end w-full">
            <Link
              href="/recover"
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Recuperar cuenta
            </Link>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Button label="Iniciar sesión" isLoading={isLoading}/>
            {/* <Button fullWidth state={"Disable"}><BiLogoGoogle size={24} /> Sign in with Google</Button> */}
          </div>
        </form>
        <div className="flex justify-center items-center gap-2 w-full">
          <p className="text-sm text-gray-500">¿No tienes una cuenta?</p>
          <Link
            href="/register"
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            Registrarse
          </Link>
        </div>
      </div>
      <div
        className="flex h-screen items-start p-6 flex-1 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1616401776146-ae3453da7105?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="flex flex-col items-end bg-black bg-opacity-30 backdrop-blur-md rounded-2xl p-8 mt-auto w-full">
          <div className="flex flex-col gap-4 w-full text-white">
            <p className="text-2xl font-medium">
              “Untitled has saved us thousands of hours of work. We are able to
              spin up projects faster and take on more clients.”
            </p>
            <div className="flex flex-col gap-6 w-full">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xl font-semibold">Lula Meyers</h3>
                <Image
                  src="/images/stars-5.png"
                  width={100}
                  height={16}
                  alt="5 stars"
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">
                    Product Manager, Hourglass
                  </p>
                  <p className="text-base">Web Design Agency</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="flex items-center justify-center w-14 h-14 rounded-full border border-white bg-opacity-20 transition duration-150 hover:bg-white hover:bg-opacity-20"
                  >
                    <BiSolidChevronLeft size={24} className="text-white" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-14 h-14 rounded-full border border-white bg-opacity-20 transition duration-150 hover:bg-white hover:bg-opacity-20"
                  >
                    <BiSolidChevronRight size={24} className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
