import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('e-mail invalido'),
    password: z.string()
})
