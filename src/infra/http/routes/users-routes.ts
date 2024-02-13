import { FastifyInstance } from "fastify";
import { RegisterInstructorController } from "../controllers/register-instructor-controller";
import { RegisterStudentController } from "../controllers/register-student-controller";
import { GetProfileByIdController } from "../controllers/get-profile-by-id-controller";
import { verifyJWT } from "./middlewares/verify-jwt";
import { EditProfileController } from "../controllers/edit-profile-controller";

export async function usersRoutes(app: FastifyInstance) {
  const registerInstructor = new RegisterInstructorController();
  const registerStudent = new RegisterStudentController();
  const getProfile = new GetProfileByIdController();
  const editProfile = new EditProfileController();

  app.post('/instructors', {
    schema: {
      description: 'CREATE INSTRUCTOR',
      tags: ['Users'],
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
      tags: ['Users'],
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
  app.get('/me', {
    onRequest: [verifyJWT],
    schema: {
      description: 'Get Profile',
      tags: ['Users'],
      summary: 'Get user profile',
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            document: { type: 'string' },
            phone_number: { type: 'string' },
            password: { type: 'string' },
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
  }, getProfile.handle);
  app.put('/edit', {
    onRequest: [verifyJWT],
    schema: {
      description: 'Edit Profile',
      tags: ['Users'],
      summary: 'Edit user profile',
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            phone_number: { type: 'string' },
          }
        },
        400: {
          description: 'User not found',
          type: 'string',
        }
      },
    }
  }, editProfile.handle)
}