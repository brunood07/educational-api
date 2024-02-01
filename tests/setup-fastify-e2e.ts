import { FastifyHttpServer } from "@/infra/http/http-server/fastify-http-server";
import { authRoutes } from "@/infra/http/routes/auth-routes";
import { instructorRoutes } from "@/infra/http/routes/instructor-routes";
import { studentRoutes } from "@/infra/http/routes/student-routes";
import { FastifyInstance } from "fastify";

let app: FastifyInstance;

export function setupFastify() {
  const httpServer = new FastifyHttpServer();
  app = httpServer.app;
  app.register(studentRoutes);
  app.register(instructorRoutes)
  app.register(authRoutes)
}

export { app };