import { EmailAlreadyRegisteredError } from "@/core/errors/email-already-registered";
import { StudentsRepository } from "../repositories/students-repository";
import { DocumentAlreadyRegisteredError } from "@/core/errors/document-already-registered";
import { HasherGenerator } from "../cryptography/hash-generator";
import { Student } from "../../enterprise/entities/student";
import { Role } from "@prisma/client";

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
  constructor(private studentsRepository: StudentsRepository, private hashGenerator: HasherGenerator) {}

  execute = async (data: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> => {
    const { document, email, first_name, last_name, phone_number, password } = data;

    const emailAlreadyRegistered = await this.studentsRepository.findByEmail(email);
    if (emailAlreadyRegistered) throw new EmailAlreadyRegisteredError()
    const documentAlreadyRegistered = await this.studentsRepository.findByDocument(document);
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

    await this.studentsRepository.create(student);

    return { student };
  }
}