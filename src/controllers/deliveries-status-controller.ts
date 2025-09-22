// controller de status da entrega

import { Request, Response } from "express";
import { prisma } from "@/database/prisma"
import { z } from "zod";

class DeliveriesStatusController {
    async update(request: Request, response: Response) {
        //validação dos parâmetros
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const bodySchema = z.object({
            status: z.enum(['processing', 'shipped', 'delivered']),
        })

        const { id } = paramsSchema.parse(request.params); //pega o id dos parâmetros
        const { status } = bodySchema.parse(request.body); //pega o status do corpo da requisição

        await prisma.delivery.update({
            //atualiza o status da entrega
            data: {
                status,
            },
            where: {
                id,
            }
        })

        await prisma.deliveryLog.create({
            //cria um log de atualização de status
            data: {
                deliveryId: id,
                description: status
            }
        })
        
        return response.json(); //retorna uma resposta vazia
    }
}

export { DeliveriesStatusController }