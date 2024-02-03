import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProfileByIdUseCase } from "./factories/make-get-profile-by-id-use-case";

export class GetProfileByIdController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    const getProfile = makeGetProfileByIdUseCase()
    const profile = await getProfile.execute({ id: req.user.sub })

    return reply.status(200).send(profile);
  }
}