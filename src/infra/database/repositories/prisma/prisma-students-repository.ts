import { StudentsRepository } from "@/domain/educational/application/repositories/students-repository";
import { Student } from "@/domain/educational/enterprise/entities/student";
import { StudentWithoutPassword } from "@/domain/educational/enterprise/entities/value-objects/student-without-password";
import { prisma } from "@/infra/database/prisma";
import { PrismaStudentMapper } from "../../mappers/prisma-student-mapper";

export class PrismaStudentsRepository implements StudentsRepository {
  async create(data: Student): Promise<void> {
    const userData = PrismaStudentMapper.toPrisma(data);
    await prisma.user.create({
      data: userData
    })
  }

  async findByEmail(email: string): Promise<StudentWithoutPassword | null> {
    const student = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!student) return null

    return StudentWithoutPassword.create({
      id: student.id,
      created_at: student.created_at,
      document: student.document,
      email: student.email,
      first_name: student.first_name,
      last_name: student.last_name,
      phone_number: student.phone_number,
      updated_at: student.updated_at
    });
  }

  async findByDocument(document: string): Promise<StudentWithoutPassword | null> {
    const student = await prisma.user.findUnique({
      where: {
        document
      }
    })

    if (!student) return null

    return StudentWithoutPassword.create({
      id: student.id,
      created_at: student.created_at,
      document: student.document,
      email: student.email,
      first_name: student.first_name,
      last_name: student.last_name,
      phone_number: student.phone_number,
      updated_at: student.updated_at
    });
  }
}