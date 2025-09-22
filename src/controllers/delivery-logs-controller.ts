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

        if(delivery.status === "delivered"){
            throw new AppError("Delivery already delivered")// se o status for "delivered", o pedido não pode mais receber logs
        }

        if(delivery.status === "processing"){
            throw new AppError("change status to shipped")// se o status for "processing", retornar erro
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description,
            }
        }) // criar o log de entrega

        return response.status(201).json()
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),
        }) // validando os parâmetros da requisição

        const { delivery_id } = paramsSchema.parse(request.params) // extraindo o id da entrega dos parâmetros

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: { 
                user: true,
                logs: { select: { description: true }},
            },// incluindo os logs relacionados
        }) // verificar se a entrega existe

        if(request.user?.role === "customer" && request.user.id !== delivery?.userId){
            throw new AppError("The customer can only see their own deliveries", 401)
        }// se o usuário for cliente, verificar se ele é dono da entrega

        return response.json(delivery)
    }
}

export { DeliveryLogsController }