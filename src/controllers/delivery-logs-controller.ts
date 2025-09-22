// controller dos logs de envios

import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class DeliveryLogsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string(),
        })// validando o corpo da requisição

        const { delivery_id, description } = bodySchema.parse(request.body)

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id }
        }) // verificar se a entrega existe

        if(!delivery) {
            throw new AppError("Delivery not found.", 404)
        }// se n existir, retornar erro 404

        if(delivery.status === "processing"){
            throw new AppError("change status to shipped")
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description,
            }
        }) // criar o log de entrega

        return response.status(201).json()
    }
}

export { DeliveryLogsController }