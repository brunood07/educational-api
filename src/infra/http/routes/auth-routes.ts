import { FastifyInstance } from "fastify";
import { AuthenticateUserController } from "../controllers/authenticate-user-controller";

export async function authRoutes(app: FastifyInstance) {
  const authenticateUser = new AuthenticateUserController();

  app.post('/auth', authenticateUser.handle)
}