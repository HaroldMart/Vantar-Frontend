"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

import { Button, Input, Toaster } from "@shared/_components";
import { resetPassword } from "@auth/lib/auth-actions";
import { ResetPassword } from "@auth/lib/interfaces";
import { resetPasswordSchema } from "@auth/lib/schemas";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const token: string = params.get('token') ?? '';

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    
  }, []);

  const onSubmit = handleSubmit(async (credentials) => {
    const { password, confirmPassword } = credentials;

    if (password != confirmPassword) toast('Las contraseñas no coinciden');

    setIsLoading(true);
    const res = await resetPassword({ password, token });
    toast(res);
  });

  return (
    <section className="flex h-screen items-start bg-white" id="login">
      <Toaster />
      <div className="flex flex-col justify-center items-center gap-4 flex-1 h-full px-[10%] md:px-[30%] py-82">
        <div className="flex flex-col justify-center items-center gap-4 p-10 w-full">
          <Image src="/images/logo.png" width={48} height={48} alt="Logo" />
          <div className="flex flex-col justify-center items-center gap-3 w-full text-center">
            <h2 className="text-3xl font-semibold text-gray-900">
              Recuperación
            </h2>
            <p className="text-lg text-gray-500">
              A continuación establece una nueva contraseña de la cual te acuerdes.
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
          <Input
            disabled={isLoading}
            id="password"
            type="password"
            placeholder="Ingresar nueva contraseña"
            aria-label="Password"
            error={errors.password?.message}
            {...register("password", {
              required: true,
            })}
          />
          <Input
            disabled={isLoading}
            id="2password"
            placeholder="Confirmar contraseña"
            aria-label="2Password"
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", { required: true })}
          />
          <Button label="Recuperar" isLoading={isLoading} />
        </form>
        <div className="flex flex-col justify-center items-center gap-2 w-full"></div>
      </div>
    </section>
  );
}
