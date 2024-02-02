import { FastifyHttpServer } from "@/infra/http/http-server/fastify-http-server";
import { authRoutes } from "@/infra/http/routes/auth-routes";
import { instructorRoutes } from "@/infra/http/routes/instructor-routes";
import { studentRoutes } from "@/infra/http/routes/student-routes";
import fastifyJwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import { env } from "process";

let app: FastifyInstance;

export function setupFastify() {
  const httpServer = new FastifyHttpServer();
  app = httpServer.app;
  httpServer.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: env.JWT_TOKEN_EXPIRES_IN,
    },
  })
  app.register(studentRoutes);
  app.register(instructorRoutes)
  app.register(authRoutes)
}

export { app };