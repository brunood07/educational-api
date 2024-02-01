import { Instructor } from "../../enterprise/entities/instructor";
import { Student } from "../../enterprise/entities/student";
import { UserWithoutPassword } from "../../enterprise/entities/value-objects/user-without-password";

export abstract class UsersRepository {
  abstract create(data: Student | Instructor): Promise<void>;
  abstract findByEmail(email: string): Promise<UserWithoutPassword | null>;
  abstract findByDocument(document: string): Promise<UserWithoutPassword | null>;
}