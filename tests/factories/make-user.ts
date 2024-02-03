import { Student, StudentProps } from '@/domain/educational/enterprise/entities/student'
import { User } from '@/domain/educational/enterprise/entities/value-objects/user'
import { PrismaStudentMapper } from '@/infra/database/mappers/prisma-student-mapper'
import { prisma } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

export function makeStudent() {
  const student = Student.create(
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: 'john@doe.com',
      document: faker.person.middleName(),
      password: 'teste123',
      phone_number: faker.person.gender(),
      role: 'STUDENT'
    }
  )

  return student
}

export function makeUser() {
  const user = User.create({
    id: randomUUID(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: 'john@doe.com',
    document: faker.person.middleName(),
    password: 'teste123',
    phone_number: faker.person.gender(),
    role: 'STUDENT',
    created_at: new Date(),
    updated_at: new Date()
  })

  return user
}

export class UserFactory {

  async makePrismaStudent(): Promise<Student> {
    const student = makeStudent()
    await prisma.user.create({
      data: PrismaStudentMapper.toPrisma(student),
    })

    return student
  }
}