import { env } from './infra/env';
import { FastifyHttpServer } from './infra/http/http-server/fastify-http-server';
import { studentRoutes } from './infra/http/routes/student-routes';

async function main() {
  const httpServer = new FastifyHttpServer()
  httpServer.register(studentRoutes)
  httpServer.listen(env.PORT)
}

main()