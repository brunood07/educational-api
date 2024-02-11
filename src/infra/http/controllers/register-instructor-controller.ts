import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { EmailAlreadyRegisteredError } from "@/core/errors/email-already-registered";
import { DocumentAlreadyRegisteredError } from "@/core/errors/document-already-registered";
import { makeRegisterInstructorUseCase } from "./factories/make-register-instructor-use-case";

const registerInstructorBodySchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  document: z.string(),
  phone_number: z.string(),
  password: z.string()
})

export class RegisterInstructorController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    const data = registerInstructorBodySchema.parse(req.body);

    try {
      const registerInstructor = makeRegisterInstructorUseCase();
      await registerInstructor.execute(data);

      return reply.status(201).send();
    } catch (err) {
      if (err instanceof EmailAlreadyRegisteredError || err instanceof DocumentAlreadyRegisteredError) {
        reply.status(400).send(err.message)
      }

      reply.status(400).send()
    }
  }
}