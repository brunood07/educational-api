import { UserNotFoundError } from "@/core/errors/user-not-found";
import { User } from "../../enterprise/entities/value-objects/user";
import { UsersRepository } from "../repositories/users-repository";

interface GetProfileByIdUseCaseRequest {
  id: string
}

interface GetProfileByIdUseCaseResponse {
  user: User
}

export class GetProfileByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (data: GetProfileByIdUseCaseRequest): Promise<GetProfileByIdUseCaseResponse> => {
    const { id } = data

    const user = await this.usersRepository.findById(id)
    if (!user) throw new UserNotFoundError()

    user.clear_password()

    return { user };
  }
}