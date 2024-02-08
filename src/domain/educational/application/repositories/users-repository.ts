import { Instructor } from "../../enterprise/entities/instructor";
import { Student } from "../../enterprise/entities/student";
import { User } from "../../enterprise/entities/value-objects/user";

export abstract class UsersRepository {
  abstract create(data: Student | Instructor): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByDocument(document: string): Promise<User | null>;
}