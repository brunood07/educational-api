import { prisma } from "@/infra/database/prisma";
import { InstructorsRepository } from "@/domain/educational/application/repositories/instructors-repository";
import { Instructor } from "@/domain/educational/enterprise/entities/instructor";
import { InstructorWithoutPassword } from "@/domain/educational/enterprise/entities/value-objects/instructor-without-password";
import { PrismaInstructorMapper } from "../../mappers/prisma-instructor-mapper";

export class PrismaInstructorsRepository implements InstructorsRepository {
  async create(data: Instructor): Promise<void> {
    const userData = PrismaInstructorMapper.toPrisma(data);
    await prisma.user.create({
      data: userData
    })
  }

  async findByEmail(email: string): Promise<InstructorWithoutPassword | null> {
    const instructor = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!instructor) return null

    return InstructorWithoutPassword.create({
      id: instructor.id,
      created_at: instructor.created_at,
      document: instructor.document,
      email: instructor.email,
      first_name: instructor.first_name,
      last_name: instructor.last_name,
      phone_number: instructor.phone_number,
      updated_at: instructor.updated_at
    });
  }

  async findByDocument(document: string): Promise<InstructorWithoutPassword | null> {
    const instructor = await prisma.user.findUnique({
      where: {
        document
      }
    })

    if (!instructor) return null

    return InstructorWithoutPassword.create({
      id: instructor.id,
      created_at: instructor.created_at,
      document: instructor.document,
      email: instructor.email,
      first_name: instructor.first_name,
      last_name: instructor.last_name,
      phone_number: instructor.phone_number,
      updated_at: instructor.updated_at
    });
  }
}