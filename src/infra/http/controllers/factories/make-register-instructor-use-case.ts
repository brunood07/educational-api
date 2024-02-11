import { RegisterInstructorUseCase } from "@/domain/educational/application/use-cases/register-instructor";
import { BcryptHasher } from "@/infra/cryptograph/bcrypt-hasher";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma/prisma-users-repository";

export function makeRegisterInstructorUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const hashGenerator = new BcryptHasher();
  const registerInstructorUseCase = new RegisterInstructorUseCase(prismaUsersRepository, hashGenerator);

  return registerInstructorUseCase;
}