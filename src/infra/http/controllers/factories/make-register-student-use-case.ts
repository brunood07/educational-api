import { RegisterStudentUseCase } from "@/domain/educational/application/use-cases/register-student";
import { BcryptHasher } from "@/infra/cryptograph/bcrypt-hasher";
import { PrismaStudentsRepository } from "@/infra/database/repositories/prisma/prisma-students-repository";

export function makeRegisterStudentUseCase() {
  const prismaStudentsRepository = new PrismaStudentsRepository();
  const hashGenerator = new BcryptHasher();
  const registerStudentUseCase = new RegisterStudentUseCase(prismaStudentsRepository, hashGenerator);

  return registerStudentUseCase;
}