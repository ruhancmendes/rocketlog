// controller dos logs de envios

import { Request, Response } from 'express'

class DeliveryLogsController {
    async create(request: Request, response: Response) {
        return response.json({ message: "OK!"})
    }
}

export { DeliveryLogsController }