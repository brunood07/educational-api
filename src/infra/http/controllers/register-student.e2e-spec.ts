import request from "supertest"
import { test, expect, describe } from "vitest"
import { app } from "../../../../tests/setup-fastify-e2e"

describe('register student (E2E)', () => {
  test('[POST] /students', async () => {
    const response = await request(app.server).post("/students").send({
      document: "11111111111",
      email: "teste@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    })

    expect(response.status).toBe(201)
  })
})