import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateCourseUseCase } from "./factories/make-create-course-use-case";
import { z } from "zod";
import { InvalidParametersError } from "@/core/errors/invalid-parameters";

const courseSchema = z.object({
  instructor_id: z.string(),
  course_name: z.string(),
  description: z.string(),
})

export class CreateCourseController {
  handle = (req: FastifyRequest, reply: FastifyReply) => {
    const data = courseSchema.parse(req.body);

    try {
      const sut = makeCreateCourseUseCase();
      const course = sut.execute(data);

      return reply.status(201).send(course);
    } catch (err) {
      if (err instanceof InvalidParametersError) return reply.status(400).send(err.message);
      return reply.status(400).send();
    }
  }
}