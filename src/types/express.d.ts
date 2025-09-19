// tipagem para o express
declare namespace Express {
    export interface Request {
        user?: {
            id: string;
            role: string;
        }
    }
}