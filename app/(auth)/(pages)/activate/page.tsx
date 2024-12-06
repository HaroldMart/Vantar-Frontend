"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Toaster } from "@shared/_components";
import { activateAccount } from "@auth/lib/auth-actions";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const params = useSearchParams();
  const token: string = params.get("token") ?? "";

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    if (!token) toast("Token no encontrado.");
    const res = await activateAccount(token);

    if (res.success) setIsValid(true);

    setIsLoading(false);
  };

  const validate = () => {
    if (isValid)
      return (
        <p className="text-lg text-gray-500">¡Cuenta activada exitosamente!</p>
      );
    if (!isValid)
      return (
        <p className="text-lg text-gray-500">
          Error al activar tu cuenta, token invalido.
        </p>
      );
  };

  return (
    <section
      className="flex h-screen items-start bg-white px-6 py-12"
      id="login"
    >
      <Toaster />
      <div className="flex flex-col justify-center items-center gap-4 flex-1 h-full px-[10%] md:px-[30%] py-82">
        <div className="flex flex-col justify-center items-center gap-4 p-10 w-full">
          <Image src="/images/logo.png" width={48} height={48} alt="Logo" />
          <div className="flex flex-col justify-center items-center gap-3 w-full text-center">
            <h2 className="text-3xl font-semibold text-gray-900">Activación</h2>
            {isLoading ? (
              <div className="flex flex-col gap-2 justify-center items-center">
                <Loader2 className="animate-spin" />
                <p className="text-lg text-gray-500">Verificando datos</p>
              </div>
            ) : (
              validate()
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
