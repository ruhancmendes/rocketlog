// middleware para garantir que o usuário está autenticado antes de acessar certas rotas

import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface tokenPayload {
    role: string;
    sub: string
} // sub é o id do usuário 

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization; // Bearer token

        if (!authHeader) {
            throw new AppError("Token JWT está faltando!", 401);
        } 

        const[, token] = authHeader.split(" "); // separa o Bearer do token

        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as tokenPayload; // verifica se o token é válido

        request.user = {
            id: user_id,
            role
        } // adiciona o id do usuário na requisição

        return next();
    } catch (error) {
        throw new AppError("Token inválido!", 401);
    }
} 