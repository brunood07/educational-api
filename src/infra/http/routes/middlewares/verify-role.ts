import { FastifyReply, FastifyRequest } from 'fastify'
import { Role } from "@prisma/client";

export function verifyRole(roleToVerify: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(403).send({ message: 'Unauthorized' })
    }
  }
}