import { FastifyReply, FastifyRequest } from 'fastify'

export class RefreshAuthenticationController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    await req.jwtVerify({ onlyCookie: true })
    
    const { role } = req.user

    const token = await reply.jwtSign(
      { role },
      {
        sign: {
          sub: req.user.sub,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { role },
      {
        sign: {
          sub: req.user.sub,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send(token)
  }
}