import { FastifyInstance } from "fastify";
import { RegisterInstructorController } from "../controllers/register-instructor-controller";
import { RegisterStudentController } from "../controllers/register-student-controller";
import { GetProfileByIdController } from "../controllers/get-profile-by-id-controller";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  const registerInstructor = new RegisterInstructorController();
  const registerStudent = new RegisterStudentController();
  const getProfile = new GetProfileByIdController();

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
  app.get('/me', { onRequest: [verifyJWT] }, getProfile.handle);
}