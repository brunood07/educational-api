import request from "supertest"
import { test, expect, describe } from "vitest"
import { app } from "../../../../tests/setup-fastify-e2e"

describe('register instructor (E2E)', () => {
  test('[POST] /instructors', async () => {
    const response = await request(app.server).post("/instructors").send({
      document: "11111111112",
      email: "instructor@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    })

    expect(response.status).toBe(201)
  })
})