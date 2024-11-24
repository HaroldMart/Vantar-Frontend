"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

import { login } from "@auth/lib/auth-actions";
import { LoginCredentials } from "@auth/lib/interfaces";
import { Button, Input, Toaster } from "@shared/_components";
import { loginSchema } from "@auth/lib/schemas";
import { Banner } from "@auth/_components";

export const metadta: Metadata = { title: 'Inciar sesion' };

export default function Page() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = handleSubmit(async (credentials) => {
    setLoading(true);
    const res = await login(credentials);
    if (res.success) router.push('/');
    setLoading(false);
    if (res.message) toast(`${res.message[0]}`);
  });

  return (
    <section className="flex h-full items-start bg-white" id="login">
      <Toaster />
      <div className="flex flex-col justify-center items-center gap-4 flex-1 h-full p-8 lg:px-32">
        <div className="flex flex-col justify-center items-center gap-4 p-10 w-full">
          <Image src="/images/logo.png" width={48} height={48} alt="Logo" />
          <div className="flex flex-col justify-center items-center gap-3 w-full text-center">
            <h2 className="text-3xl font-semibold text-gray-900">
              Iniciar sesión
            </h2>
            <p className="text-lg text-gray-500">
              Bienvenido, ingresa tus credenciales.
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
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
          <Button label="Iniciar sesión" isLoading={isLoading} />
        </form>
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <Link
            href="/recover"
            className="text-sm font-semibold text-purple-600 hover:text-purple-700"
          >
            ¿Contraseña olvidada?
          </Link>
          <div className="flex gap-2">
            <p className="text-sm text-gray-500">¿No tienes una cuenta?</p>
            <Link
              href="/register"
              className="text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              Registrate
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:block flex-1">
        <Banner />
      </div>
    </section>
  );
}
