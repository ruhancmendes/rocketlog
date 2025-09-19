// verifica autorização do usuário para acessar ou modificar um recurso específico

import { Request, Response, NextFunction } from 'express';
import { AppError } from "@/utils/AppError"

function verifyUserAuthorization(role:string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.user) {
            throw new AppError("Usuário não autenticado", 401)
        } // Verifica se o usuário está autenticado  
        
        if (!role.includes(request.user.role)) {
            throw new AppError("Usuário não autorizado", 403)
        } // Verifica se o usuário tem a função necessária para acessar o recurso

        return next() // Se tudo estiver ok, passa para o próximo middleware ou rota
    }
}

export { verifyUserAuthorization }