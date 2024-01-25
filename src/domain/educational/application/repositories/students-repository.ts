import { Student } from "../../enterprise/entities/student";
import { StudentWithoutPassword } from "../../enterprise/entities/value-objects/student-without-password";

export abstract class StudentsRepository {
  abstract create(data: Student): Promise<void>;
  abstract findByEmail(email: string): Promise<StudentWithoutPassword | null>;
  abstract findByDocument(document: string): Promise<StudentWithoutPassword | null>;
}