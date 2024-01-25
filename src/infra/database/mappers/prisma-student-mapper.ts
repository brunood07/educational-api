import { Prisma } from '@prisma/client'
import { Student } from '@/domain/educational/enterprise/entities/student'

export class PrismaStudentMapper {
  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      first_name: student.first_name,
      last_name: student.last_name,
      document: student.document,
      email: student.email,
      phone_number: student.phone_number,
      role: student.role,
      password: student.password,
    }
  }
}