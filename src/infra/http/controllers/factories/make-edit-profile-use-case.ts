import { EditProfileUseCase } from "@/domain/educational/application/use-cases/edit-profile";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma/prisma-users-repository";

export function makeEditProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getProfileById = new EditProfileUseCase(prismaUsersRepository);

  return getProfileById;
}