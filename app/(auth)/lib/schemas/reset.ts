import { z } from "zod";

export const resetPasswordSchema = z.object({
    password: z.string()
        .max(130, 'La contraseña es demasiado larga')
        .min(6, 'La contraseña requiere minimo de 8 caracteres'),
    confirmPassword: z.string()
        .max(130, 'La contraseña es demasiado larga')
        .min(6, 'La contraseña requiere minimo de 8 caracteres')
})