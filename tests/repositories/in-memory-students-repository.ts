import { StudentsRepository } from "@/domain/educational/application/repositories/students-repository";
import { Student } from "@/domain/educational/enterprise/entities/student";
import { StudentWithoutPassword } from "@/domain/educational/enterprise/entities/value-objects/student-without-password";
import { randomUUID } from "node:crypto";

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = [];

  async create(data: Student): Promise<void> {
    this.items.push(data);
  }

  async findByEmail(email: string): Promise<StudentWithoutPassword | null> {
    const student = this.items.find(item => item.email === email);

    if (!student) {
      return null;
    }

    return StudentWithoutPassword.create({
      id: randomUUID(),
      created_at: new Date(),
      document: student.document,
      email: student.email,
      first_name: student.first_name,
      last_name: student.last_name,
      phone_number: student.phone_number,
      updated_at: new Date()
    });
  }

  async findByDocument(document: string): Promise<StudentWithoutPassword | null> {
    const student = this.items.find(item => item.document === document);

    if (!student) {
      return null;
    }

    return StudentWithoutPassword.create({
      id: randomUUID(),
      created_at: new Date(),
      document: student.document,
      email: student.email,
      first_name: student.first_name,
      last_name: student.last_name,
      phone_number: student.phone_number,
      updated_at: new Date()
    });
  }
}