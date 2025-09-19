//controller de entregas
import { Request, Response } from "express";

class DeliveriesController {
    create(request: Request, response: Response) {
        //criar uma entrega
        return response.json({ message: "Entrega criada" });
    }
}

export { DeliveriesController };