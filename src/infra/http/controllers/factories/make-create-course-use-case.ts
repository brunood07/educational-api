import { CreateCourseUseCase } from "@/domain/educational/application/use-cases/create-course";
import { PrismaCoursesRepository } from "@/infra/database/repositories/prisma/prisma-courses-repository";

export function makeCreateCourseUseCase() {
  const prismaCoursesRepository = new PrismaCoursesRepository();
  const createCourseUseCase = new CreateCourseUseCase(prismaCoursesRepository);

  return createCourseUseCase;
}