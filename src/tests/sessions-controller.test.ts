// teste automatizado para autenticação
import request from 'supertest'
import { app } from '@/app'
import { prisma } from "@/database/prisma"

describe("SessionsController", () => {
    let user_id: string // Variável para armazenar o ID do usuário criado

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } }) // Limpa o usuário criado após os testes
        })

    it("should authenticate and get a access token", async () => {
        const userResponse = await request(app).post("/users").send({
            name: "Auth Test User",
            email: "auth_test_user@example.com",
            password: "password123",
        })

        user_id = userResponse.body.id 

        const sessionResponse = await request(app).post("/sessions").send({
            email: "auth_test_user@example.com",
            password: "password123",
        })

        expect(sessionResponse.status).toBe(200)
        expect(sessionResponse.body.token).toEqual(expect.any(String))
    })
})