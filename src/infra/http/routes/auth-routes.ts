import { FastifyInstance } from "fastify";
import { AuthenticateUserController } from "../controllers/authenticate-user-controller";
import { RefreshAuthenticationController } from "../controllers/refresh-authentication-controller";

export async function authRoutes(app: FastifyInstance) {
  const authenticateUser = new AuthenticateUserController();
  const refreshAuthentication = new RefreshAuthenticationController();

  app.post('/sessions', {
    schema: {
      description: 'SESSION',
      tags: ['SESSION'],
      summary: 'create token endpoint',
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        }
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'string'
        },
        400: {
          description: 'Invalid credentials exception',
          type: 'string',
        }
      },
    }
  }, authenticateUser.handle)
  app.patch('/sessions/refresh', {
    schema: {
      description: 'REFRESH SESSION',
      tags: ['SESSION'],
      summary: 'refresh token endpoint',
      response: {
        200: {
          description: 'Successful response',
          type: 'string'
        },
      },
    }
  }, refreshAuthentication.handle)
}