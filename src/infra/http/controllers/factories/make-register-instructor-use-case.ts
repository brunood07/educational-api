import { RegisterInstructorUseCase } from "@/domain/educational/application/use-cases/register-instructor";
import { BcryptHasher } from "@/infra/cryptograph/bcrypt-hasher";
import { PrismaInstructorsRepository } from "@/infra/database/repositories/prisma/prisma-instructors-repository";

export function makeRegisterInstructorUseCase() {
  const prismaInstructorsRepository = new PrismaInstructorsRepository();
  const hashGenerator = new BcryptHasher();
  const registerInstructorUseCase = new RegisterInstructorUseCase(prismaInstructorsRepository, hashGenerator);

  return registerInstructorUseCase;
}