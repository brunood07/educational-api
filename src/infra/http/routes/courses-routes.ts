import { FastifyInstance } from "fastify";
import { CreateCourseController } from "../controllers/create-course-controller";
import { verifyJWT } from "./middlewares/verify-jwt";
import { verifyRole } from "./middlewares/verify-role";
import { Role } from "@prisma/client";

export async function coursesRoutes(app: FastifyInstance) {
  const createCourse = new CreateCourseController();

  app.post('/courses', {
    onRequest: [verifyJWT, verifyRole(Role.INSTRUCTOR)],
    schema: {
      description: 'Create course',
      tags: ['Courses'],
      summary: 'Create course',
      body: {
        type: 'object',
        properties: {
          course_name: { type: 'string' },
          description: { type: 'string' },
          instructor_id: { type: 'string' },
        }
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            course_name: { type: 'string' },
            description: { type: 'string' },
            instructor_id: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
          }
        },
        400: {
          description: 'User not found',
          type: 'string',
        }
      },
    }
  }, createCourse.handle)
}