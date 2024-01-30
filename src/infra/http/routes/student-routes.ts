import { FastifyInstance } from "fastify";
import { RegisterStudentController } from "../controllers/register-student-controller";

export async function studentRoutes(app: FastifyInstance) {
  const registerStudent = new RegisterStudentController();

  app.post('/students', {
    schema: {
      description: 'CREATE STUDENT',
      tags: ['Students'],
      summary: 'create student endpoint',
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
  }, registerStudent.handle);
}