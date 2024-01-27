import { env } from './infra/env';
import { FastifyHttpServer } from './infra/http/http-server/fastify-http-server';
import { healthCheckRoutes } from './infra/http/routes/health-check-routes';
import { studentRoutes } from './infra/http/routes/student-routes';

async function main() {
  const httpServer = new FastifyHttpServer()
  httpServer.register(studentRoutes)
  httpServer.register(healthCheckRoutes)
  httpServer.listen(env.PORT)
}

main()