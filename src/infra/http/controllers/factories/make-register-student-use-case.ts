import { RegisterStudentUseCase } from "@/domain/educational/application/use-cases/register-student";
import { BcryptHasher } from "@/infra/cryptograph/bcrypt-hasher";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma/prisma-users-repository";

export function makeRegisterStudentUseCase() {
  const prismaStudentsRepository = new PrismaUsersRepository();
  const hashGenerator = new BcryptHasher();
  const registerStudentUseCase = new RegisterStudentUseCase(prismaStudentsRepository, hashGenerator);

  return registerStudentUseCase;
}