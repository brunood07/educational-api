import { InstructorsRepository } from "@/domain/educational/application/repositories/instructors-repository";
import { Instructor } from "@/domain/educational/enterprise/entities/instructor";
import { InstructorWithoutPassword } from "@/domain/educational/enterprise/entities/value-objects/instructor-without-password";
import { randomUUID } from "node:crypto";

export class InMemoryInstructorsRepository implements InstructorsRepository {
  public items: Instructor[] = [];

  async create(data: Instructor): Promise<void> {
    this.items.push(data);
  }

  async findByEmail(email: string): Promise<InstructorWithoutPassword | null> {
    const instructor = this.items.find(item => item.email === email);

    if (!instructor) {
      return null;
    }

    return InstructorWithoutPassword.create({
      id: randomUUID(),
      created_at: new Date(),
      document: instructor.document,
      email: instructor.email,
      first_name: instructor.first_name,
      last_name: instructor.last_name,
      phone_number: instructor.phone_number,
      updated_at: new Date()
    });
  }

  async findByDocument(document: string): Promise<InstructorWithoutPassword | null> {
    const instructor = this.items.find(item => item.document === document);

    if (!instructor) {
      return null;
    }

    return InstructorWithoutPassword.create({
      id: randomUUID(),
      created_at: new Date(),
      document: instructor.document,
      email: instructor.email,
      first_name: instructor.first_name,
      last_name: instructor.last_name,
      phone_number: instructor.phone_number,
      updated_at: new Date()
    });
  }
}