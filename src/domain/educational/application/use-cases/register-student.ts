import { EmailAlreadyRegisteredError } from "@/core/errors/email-already-registered";
import { DocumentAlreadyRegisteredError } from "@/core/errors/document-already-registered";
import { HasherGenerator } from "../cryptography/hash-generator";
import { Student } from "../../enterprise/entities/student";
import { Role } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";

interface RegisterStudentUseCaseRequest {
  first_name: string;
  last_name: string;
  email: string;
  document: string;
  phone_number: string;
  password: string;
}

interface RegisterStudentUseCaseResponse {
  student: Student;
}

export class RegisterStudentUseCase {
  constructor(private usersRepository: UsersRepository, private hashGenerator: HasherGenerator) {}

  execute = async (data: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> => {
    const { document, email, first_name, last_name, phone_number, password } = data;

    const emailAlreadyRegistered = await this.usersRepository.findByEmail(email);
    if (emailAlreadyRegistered) throw new EmailAlreadyRegisteredError()
    const documentAlreadyRegistered = await this.usersRepository.findByDocument(document);
    if (documentAlreadyRegistered) throw new DocumentAlreadyRegisteredError();

    const passwordHash = await this.hashGenerator.hash(password);

    const student = Student.create({
      document,
      email,
      first_name,
      last_name,
      password: passwordHash,
      phone_number,
      role: Role.STUDENT
    });

    await this.usersRepository.create(student);

    return { student };
  }
}