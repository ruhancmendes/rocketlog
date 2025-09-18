// Cria uma classe para identificar um erro lançado por nós mesmos.

class AppError {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}

export { AppError };