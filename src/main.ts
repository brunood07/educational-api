import { FastifyReply, FastifyRequest } from 'fastify';
import FastifyCors from '@fastify/cors';
import FastifySwagger from '@fastify/swagger'
import FastifySwaggerUI from '@fastify/swagger-ui'
import { env } from './infra/env';
import { FastifyHttpServer } from './infra/http/http-server/fastify-http-server';
import { healthCheckRoutes } from './infra/http/routes/health-check-routes';
import { studentRoutes } from './infra/http/routes/student-routes';

async function main() {
  const httpServer = new FastifyHttpServer()
  httpServer.register(FastifyCors, {
    origin: env.CORS,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
  httpServer.register(FastifySwagger)
  httpServer.register(FastifySwaggerUI, {
    theme: {
      title: 'Educational API'
    },
    routePrefix: '/swagger-ui',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request: FastifyRequest, reply: FastifyReply, next: Function) { next() },
      preHandler: function (request: FastifyRequest, reply: FastifyReply, next: Function) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header: unknown) => header,
    transformSpecification: (swaggerObject: unknown, request: FastifyRequest, reply: FastifyReply) => { return swaggerObject },
    transformSpecificationClone: true
  })
  httpServer.register(studentRoutes)
  httpServer.register(healthCheckRoutes)
  httpServer.listen(env.PORT)
}

main()