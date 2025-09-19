// controller para lidar com a autenticação do usuário / sessão ( login )

import { Request, Response } from "express";

class SessionsController {
    create(request: Request, response: Response) {
        return response.json({ message: "ok!"})
    }
}

export { SessionsController };