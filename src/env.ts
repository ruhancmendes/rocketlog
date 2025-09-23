//valida variáveis de ambiente

import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(1),
    PORT: z.coerce.number().default(3333),
}) // define o esquema de validação para as variáveis de ambiente

export const env = envSchema.parse(process.env) // valida as variáveis de ambiente e exporta o resultado

