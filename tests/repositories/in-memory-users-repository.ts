import { UsersRepository } from "@/domain/educational/application/repositories/users-repository";
import { Instructor } from "@/domain/educational/enterprise/entities/instructor";
import { Student } from "@/domain/educational/enterprise/entities/student";
import { User } from "@/domain/educational/enterprise/entities/value-objects/user";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: Student[] = [];

  async create(data: Student | Instructor): Promise<void> {
    this.items.push(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email);

    if (!user) {
      return null;
    }

    return User.create({
      id: randomUUID(),
      created_at: new Date(),
      document: user.document,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      role: user.role,
      password: user.password,
      updated_at: new Date()
    });
  }

  async findByDocument(document: string): Promise<User | null> {
    const user = this.items.find(item => item.document === document);

    if (!user) {
      return null;
    }

    return User.create({
      id: randomUUID(),
      created_at: new Date(),
      document: user.document,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      role: user.role,
      password: user.password,
      updated_at: new Date()
    });
  }
}