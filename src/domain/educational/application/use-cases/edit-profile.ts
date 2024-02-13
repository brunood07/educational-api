import { UserNotFoundError } from "@/core/errors/user-not-found";
import { User } from "../../enterprise/entities/value-objects/user";
import { UsersRepository } from "../repositories/users-repository";

export interface EditProfileUseCaseRequest {
  id: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

interface EditProfileUseCaseResponse {
  user: User
}

export class EditProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  execute = async (data: EditProfileUseCaseRequest): Promise<EditProfileUseCaseResponse> => {
    const { id } = data;
    const user = await this.usersRepository.findById(id);

    if (!user) throw new UserNotFoundError();

    const updateUser = await this.usersRepository.update(data);

    const updatedUser = User.create(updateUser);
    updatedUser.clear_password();

    return { user: updatedUser };
  }
}