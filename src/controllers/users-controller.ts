// controller de usuários

import { Request, Response } from 'express'
import { z } from 'zod'
import { hash } from "bcrypt"
import { prisma } from "@/database/prisma"
import { AppError } from '@/utils/AppError'

class UsersController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6),
        })

        const { name, email, password } = bodySchema.parse(request.body)

        const userWithSAmeEmail = await prisma.user.findFirst({ where: { email } }) // verifica se já existe um usuário com o mesmo email

        if(userWithSAmeEmail){
            throw new AppError("Este e-mail já está em uso.")
        }

        const hashedPassword = await hash(password, 8) // criptografa a senha

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        }) // cria o usuário no banco de dados

        const { password: _, ...userWithoutPassword } = user // remove a senha do usuário para não retornar na resposta

        return response.status(201).json(userWithoutPassword) // retorna o usuário criado;
    }
}

export { UsersController }