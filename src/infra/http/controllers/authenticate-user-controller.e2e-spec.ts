import request from "supertest"
import { test, expect, describe, beforeAll } from "vitest"
import { app } from "../../../../tests/setup-fastify-e2e"

describe('authenticate user (E2E)', () => {
  beforeAll(async () => {
    await request(app.server).post("/instructors").send({
      document: "11111111112",
      email: "instructor@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    }) 
  })
  
  test('[POST] /auth', async () => {
    const response = await request(app.server).post("/auth").send({
      email: "instructor@email.com",
      password: "Teste123",
    })     

    expect(response.status).toBe(200)
  })

  test('[POST] /auth with invalid email', async () => {
    const response = await request(app.server).post("/auth").send({
      email: "instructo2@email.com",
      password: "Teste123",
    }) 

    expect(response.status).toBe(400)
  })

  test('[POST] /auth with invalid password', async () => {
    const response = await request(app.server).post("/auth").send({
      email: "instructor@email.com",
      password: "Taeste1234",
    }) 

    expect(response.status).toBe(400)
  })
})