import { Entity } from "@/core/entities/entity";
import { Role } from "@prisma/client"

export interface InstructorProps {
  first_name: string;
  last_name: string;
  email: string;
  document: string;
  phone_number: string;
  role: Role;
  password: string;
}

export class Instructor extends Entity<InstructorProps> {
  get first_name() {
    return this.props.first_name;
  }

  get last_name() {
    return this.props.last_name;
  }

  get email() {
    return this.props.email;
  }

  get document() {
    return this.props.document;
  }

  get phone_number() {
    return this.props.phone_number;
  }

  get role() {
    return this.props.role;
  }

  get password() {
    return this.props.password;
  }

  static create(props: InstructorProps) {
    const instructor = new Instructor(
      {
        ...props,
        role: Role.INSTRUCTOR
      }
    );

    return instructor;
  }
}