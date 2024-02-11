import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterStudentUseCase } from "./factories/make-register-student-use-case";
import { EmailAlreadyRegisteredError } from "@/core/errors/email-already-registered";
import { DocumentAlreadyRegisteredError } from "@/core/errors/document-already-registered";

const registerStudentBodySchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  document: z.string(),
  phone_number: z.string(),
  password: z.string()
})

export class RegisterStudentController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    const data = registerStudentBodySchema.parse(req.body);

    try {
      const registerStudent = makeRegisterStudentUseCase();
      await registerStudent.execute(data);

      return reply.status(201).send();
    } catch (err) {
      console.log(err)
      if (err instanceof EmailAlreadyRegisteredError || err instanceof DocumentAlreadyRegisteredError) {
        reply.status(400).send(err.message)
      }

      reply.status(400).send()
    }
  }
}