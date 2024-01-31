import { FastifyInstance } from "fastify";
import { RegisterInstructorController } from "../controllers/register-instructor-controller";

export async function instructorRoutes(app: FastifyInstance) {
  const registerInstructor = new RegisterInstructorController();

  app.post('/instructors', {
    schema: {
      description: 'CREATE INSTRUCTOR',
      tags: ['Instructors'],
      summary: 'create instructor endpoint',
      body: {
        type: 'object',
        properties: {
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          email: { type: 'string' },
          document: { type: 'string' },
          phone_number: { type: 'string' },
          password: { type: 'string' },
        }
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'string'
        },
        400: {
          description: 'User already exists exception',
          type: 'string',
        }
      },
    }
  }, registerInstructor.handle);
}