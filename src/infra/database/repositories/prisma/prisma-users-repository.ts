import { UsersRepository } from "@/domain/educational/application/repositories/users-repository";
import { Student } from "@/domain/educational/enterprise/entities/student";
import { User } from "@/domain/educational/enterprise/entities/value-objects/user";
import { prisma } from "@/infra/database/prisma";
import { PrismaStudentMapper } from "../../mappers/prisma-student-mapper";
import { Instructor } from "@/domain/educational/enterprise/entities/instructor";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Student | Instructor): Promise<void> {
    const userData = PrismaStudentMapper.toPrisma(data);
    await prisma.user.create({
      data: userData
    })
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) return null

    return User.create({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      document: user.document,
      phone_number: user.phone_number,
      password: user.password,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) return null

    return User.create({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      document: user.document,
      phone_number: user.phone_number,
      password: user.password,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  }

  async findByDocument(document: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        document
      }
    })

    if (!user) return null

    return User.create({
      id: user.id,
      created_at: user.created_at,
      document: user.document,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      role: user.role,
      password: user.password,
      updated_at: user.updated_at
    });
  }
}