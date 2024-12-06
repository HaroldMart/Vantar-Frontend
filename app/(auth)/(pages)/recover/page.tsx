'use client'

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import { Button, Input, Toaster } from "@shared/_components";
import { recoverSchema } from "@auth/lib/schemas";
import { forgotPassword } from "@auth/lib/auth-actions";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(recoverSchema),
  });
  const onSubmit = handleSubmit(async (credentials) => {
    setIsLoading(true);
    const res = await forgotPassword(credentials.email);
    setIsLoading(false);
    toast(res);
  });

  return (
    <section className="flex h-full items-start bg-white" id="login">
      <Toaster />
      <div className="flex flex-col justify-center items-center gap-4 flex-1 h-screen px-[10%] md:px-[30%] py-82">
        <div className="flex flex-col justify-center items-center gap-4 p-10 w-full">
          <Image src="/images/logo.png" width={48} height={48} alt="Logo" />
          <div className="flex flex-col justify-center items-center gap-3 w-full text-center">
            <h2 className="text-3xl font-semibold text-gray-900">
              Recuperación
            </h2>
            <p className="text-lg text-gray-500">
              Si te has olvidado de tu cuenta, escribe tu e-mail y te mandaremos un correo para que la recuperes.
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
          <Button label="Enviar" isLoading={isLoading} />
        </form>
        <div className="flex flex-col justify-center items-center gap-2 w-full">
        </div>
      </div>
    </section>
  )
}
