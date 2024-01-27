import { FastifyInstance } from "fastify";
import { RegisterStudentController } from "../controllers/register-student-controller";
import { HealthCheckController } from "../controllers/health-check/health-check-controller";

export async function healthCheckRoutes(app: FastifyInstance) {
  const healthCheck = new HealthCheckController();

  app.get('/health-check', healthCheck.handle);
}