import { Instructor } from "../../enterprise/entities/instructor";
import { InstructorWithoutPassword } from "../../enterprise/entities/value-objects/instructor-without-password";

export abstract class InstructorsRepository {
  abstract create(data: Instructor): Promise<void>;
  abstract findByEmail(email: string): Promise<InstructorWithoutPassword | null>;
  abstract findByDocument(document: string): Promise<InstructorWithoutPassword | null>;
}