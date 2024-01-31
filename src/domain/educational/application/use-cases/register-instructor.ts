import { EmailAlreadyRegisteredError } from "@/core/errors/email-already-registered";
import { DocumentAlreadyRegisteredError } from "@/core/errors/document-already-registered";
import { HasherGenerator } from "../cryptography/hash-generator";
import { Role } from "@prisma/client";
import { InstructorsRepository } from "../repositories/instructors-repository";
import { Instructor } from "../../enterprise/entities/instructor";

interface RegisterInstructorUseCaseRequest {
  first_name: string;
  last_name: string;
  email: string;
  document: string;
  phone_number: string;
  password: string;
}

interface RegisterInstructorUseCaseResponse {
  instructor: Instructor;
}

export class RegisterInstructorUseCase {
  constructor(private instructorsRepository: InstructorsRepository, private hashGenerator: HasherGenerator) {}

  execute = async (data: RegisterInstructorUseCaseRequest): Promise<RegisterInstructorUseCaseResponse> => {
    const { document, email, first_name, last_name, phone_number, password } = data;

    const emailAlreadyRegistered = await this.instructorsRepository.findByEmail(email);
    if (emailAlreadyRegistered) throw new EmailAlreadyRegisteredError()
    const documentAlreadyRegistered = await this.instructorsRepository.findByDocument(document);
    if (documentAlreadyRegistered) throw new DocumentAlreadyRegisteredError();

    const passwordHash = await this.hashGenerator.hash(password);

    const instructor = Instructor.create({
      document,
      email,
      first_name,
      last_name,
      password: passwordHash,
      phone_number,
      role: Role.INSTRUCTOR
    });

    await this.instructorsRepository.create(instructor);

    return { instructor };
  }
}