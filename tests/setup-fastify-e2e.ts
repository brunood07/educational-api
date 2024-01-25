import { FastifyHttpServer } from "@/infra/http/http-server/fastify-http-server";
import { studentRoutes } from "@/infra/http/routes/student-routes";
import { FastifyInstance } from "fastify";

let app: FastifyInstance;

export function setupFastify() {
  const httpServer = new FastifyHttpServer();
  app = httpServer.app;
  app.register(studentRoutes);
}

export { app };