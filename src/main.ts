import { env } from './infra/env';
import { FastifyHttpServer } from './infra/http/http-server/fastify-http-server';

async function main() {
  const httpServer = new FastifyHttpServer()
  httpServer.listen(env.PORT)
}

main()