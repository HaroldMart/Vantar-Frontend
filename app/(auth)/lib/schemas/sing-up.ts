import { z } from "zod";

export const singUpSchema = z.object({
    name: z.string()
        .max(30, 'EL nombre es demasiado largo, maximo 30 caractères'),
    email: z.string()
        .email('e-mail invalido')
        .max(60, 'e-mail demasiado largo'),
    password: z.string()
        .max(130, 'La contraseña es demasiado larga')
        .min(6, 'La contraseña requiere minimo de 8 caracteres')
})