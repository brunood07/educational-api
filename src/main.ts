import FastifyCors from '@fastify/cors';
import FastifySwagger from '@fastify/swagger'
import FastifySwaggerUI from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyRateLimit from '@fastify/rate-limit';
import { env } from './infra/env';
import { FastifyHttpServer } from './infra/http/http-server/fastify-http-server';
import { healthCheckRoutes } from './infra/http/routes/health-check-routes';
import { authRoutes } from './infra/http/routes/auth-routes';
import { usersRoutes } from './infra/http/routes/users-routes';
import { coursesRoutes } from './infra/http/routes/courses-routes';

async function main() {
  const httpServer = new FastifyHttpServer()

  // CORS CONFIGURATION
  httpServer.register(FastifyCors, {
    origin: env.CORS,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })

  // RATE LIMITER
  httpServer.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute'
  })

  // REDIS
  // httpServer.register(redis, {
  //   host: env.REDIS_HOST,
  //   password: env.REDIS_PASSWORD,
  //   port: env.REDIS_PORT,
  //   family: 4
  // })

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
  httpServer.register(usersRoutes)
  httpServer.register(authRoutes)
  httpServer.register(coursesRoutes)
  httpServer.register(healthCheckRoutes)

  if (env.NODE_ENV === 'production') {
    httpServer.listen(env.PORT, '0.0.0.0')
  } else {
    httpServer.listen(env.PORT, 'localhost')
  }
}

main()