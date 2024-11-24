import { z } from "zod";

export const recoverSchema = z.object({
    email: z.string()
        .email('e-mail invalido')
        .max(60, 'e-mail demasiado largo'),
})