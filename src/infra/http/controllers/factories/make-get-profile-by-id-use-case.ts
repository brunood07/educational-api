import { GetProfileByIdUseCase } from "@/domain/educational/application/use-cases/get-profile-by-id";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma/prisma-users-repository";

export function makeGetProfileByIdUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getProfileById = new GetProfileByIdUseCase(prismaUsersRepository);

  return getProfileById;
}