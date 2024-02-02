import FastifyCors from '@fastify/cors';
import FastifySwagger from '@fastify/swagger'
import FastifySwaggerUI from '@fastify/swagger-ui';
import { env } from './infra/env';
import { FastifyHttpServer } from './infra/http/http-server/fastify-http-server';
import { healthCheckRoutes } from './infra/http/routes/health-check-routes';
import { studentRoutes } from './infra/http/routes/student-routes';
import { instructorRoutes } from './infra/http/routes/instructor-routes';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { authRoutes } from './infra/http/routes/auth-routes';

async function main() {
  const httpServer = new FastifyHttpServer()
  
  // CORS CONFIGURATION
  httpServer.register(FastifyCors, {
    origin: env.CORS,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })

  // SWAGGER CONFIGURATION
  httpServer.register(FastifySwagger, {
    routePrefix: '/swagger-ui',
    swagger: {
      info: {
        title: "Educational API",
        description: "Documentation for educational api",
        version: "0.1.0"
      }
    }
  })

  httpServer.register(FastifySwaggerUI, {
    theme: {
      title: 'Educational API'
    },
    routePrefix: '/swagger-ui'
  })

  // JWT CONFIGURATION
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

  // ROUTERS
  httpServer.register(fastifyCookie)
  httpServer.register(studentRoutes)
  httpServer.register(instructorRoutes)
  httpServer.register(authRoutes)
  httpServer.register(healthCheckRoutes)

  httpServer.listen(env.PORT)
}

main()