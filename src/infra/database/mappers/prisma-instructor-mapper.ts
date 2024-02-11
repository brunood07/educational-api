import { Prisma } from '@prisma/client'
import { Instructor } from '@/domain/educational/enterprise/entities/instructor'

export class PrismaInstructorMapper {
  static toPrisma(instructor: Instructor): Prisma.UserUncheckedCreateInput {
    return {
      first_name: instructor.first_name,
      last_name: instructor.last_name,
      document: instructor.document,
      email: instructor.email,
      phone_number: instructor.phone_number,
      role: instructor.role,
      password: instructor.password,
    }
  }
}