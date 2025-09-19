// controller para lidar com a autenticação do usuário / sessão ( login )

import { Request, Response } from "express";
import { prisma } from "@/database/prisma"
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt"

class SessionsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })// validação dos dados recebidos na requisição

        const { email, password } = bodySchema.parse(request.body) // extrai os dados validados do corpo da requisição

        const user = await prisma.user.findFirst({
            where: { email }
        }) // busca o usuário no banco de dados pelo email
        
        if(!user) {
            throw new AppError("E-mail ou senha incorretos", 401)
        } // se o usuário não for encontrado, lança um erro de autenticação

        const passwordMatched = await compare(password, user.password) // compara a senha fornecida com a senha armazenada no banco de dados

        if(!passwordMatched) {
            throw new AppError("E-mail ou senha incorretos", 401)
        } // se as senhas não corresponderem, lança um erro de autenticação

        return response.json({ message: "ok!"})
    }
}

export { SessionsController };