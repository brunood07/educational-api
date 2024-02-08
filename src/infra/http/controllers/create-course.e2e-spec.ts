import request from "supertest"
import { test, expect, describe } from "vitest"
import { app } from "../../../../tests/setup-fastify-e2e"

describe('create course (E2E)', () => {
  test('[POST] /courses', async () => {
    const response = await request(app.server).post("/courses").send({
      course_name: 'course-test',
      description: 'description-test',
      instructor_id: 'instructor-1'
    })

    expect(response.status).toBe(201)
  })
})