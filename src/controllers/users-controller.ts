// controller de usuários

import { Request, Response } from 'express'

class UsersController {
    create(request: Request, response: Response){
        return response.status(201).json({ message: "ok!"});
    }
}

export { UsersController }