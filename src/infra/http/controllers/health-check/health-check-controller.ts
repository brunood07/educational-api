import { FastifyRequest, FastifyReply } from "fastify"

export class HealthCheckController {

  handle = async (req: FastifyRequest, reply: FastifyReply) => {

    return reply.status(200).send("Working");
  }
}