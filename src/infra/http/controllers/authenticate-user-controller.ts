import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUserUseCase } from "./factories/make-authenticate-user-use-case";
import { InvalidCredentialsError } from "@/core/errors/invalid-credentials";

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export class AuthenticateUserController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    const data = authenticateUserBodySchema.parse(req.body)

    try {
      const authenticateUser = makeAuthenticateUserUseCase()
      const payload = await authenticateUser.execute(data);
      const token = await reply.jwtSign(payload.accessToken.options, payload.accessToken.payload)
      const refreshToken = await reply.jwtSign(payload.refreshToken.options, payload.refreshToken.payload)

      return reply.status(200).setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      }).send(token)
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        reply.status(400).send(err.message)
      }
    }
  }
}