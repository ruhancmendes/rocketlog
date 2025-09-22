//controller de entregas
import { Request, Response } from "express";
import { prisma } from "@/database/prisma"
import { z } from "zod";

class DeliveriesController {
    async create(request: Request, response: Response) {
        //criar uma entrega
        const bodySchema = z.object({
          user_id: z.string().uuid(), //id do usuário que será enviado
          description: z.string(), //descrição da entrega   
        })

        const { user_id, description } = bodySchema.parse(request.body); //validar o corpo da requisição

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description,
            }
        })//criar a entrega no banco de dados

        return response.status(201).json();
    }
}

export { DeliveriesController };