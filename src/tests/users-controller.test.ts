//Arquivo de teste

import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"
import exp from "constants"

describe("UsersController", () => {
    let user_id: string // Variável para armazenar o ID do usuário criado

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } }) // Limpa o usuário criado após os testes
    })

    it("should create a new user successfully", async () => {
        const response = await request(app).post("/users").send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123",
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("Test User")

        user_id = response.body.id // Armazena o ID do usuário criado
    })

    it("should throw an error when creating a user with an existing email", async () => {
        const response = await request(app).post("/users").send({
            name: "Duplicate User",
            email: "testuser@example.com",
            password: "password123",
        })// Mesma email do teste anterior

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Este e-mail já está em uso.")
    })
})