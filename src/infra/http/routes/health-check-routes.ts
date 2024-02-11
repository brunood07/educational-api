import { FastifyInstance } from "fastify";
import { HealthCheckController } from "../controllers/health-check/health-check-controller";

export async function healthCheckRoutes(app: FastifyInstance) {
  const healthCheck = new HealthCheckController();

  app.get('/health-check', healthCheck.handle);
}