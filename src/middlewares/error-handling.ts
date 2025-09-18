// middleware para lidar com erros da aplicação.

import { NextFunction, Request, Response } from 'express';
import { AppError } from "@/utils/AppError";

export function errorHandling(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
){
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            message: error.message
        });
    }

    return response.status(500).json({
        message: error.message
    });
}

