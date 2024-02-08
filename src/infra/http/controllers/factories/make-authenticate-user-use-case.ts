import { AuthenticateUserUseCase } from "@/domain/educational/application/use-cases/authenticate-user";
import { BcryptHasher } from "@/infra/cryptograph/bcrypt-hasher";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma/prisma-users-repository";

export function makeAuthenticateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const hashGenerator = new BcryptHasher();
  const registerInstructorUseCase = new AuthenticateUserUseCase(prismaUsersRepository, hashGenerator);

  return registerInstructorUseCase;
}