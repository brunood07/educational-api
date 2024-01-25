import { ValueObject } from "@/core/entities/value-object";

export interface StudentWithoutPasswordProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  document: string;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
}

export class StudentWithoutPassword extends ValueObject<StudentWithoutPasswordProps> {
  get id() {
    return this.props.id;
  }

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

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  static create(props: StudentWithoutPasswordProps) {
    return new StudentWithoutPassword(props);
  }
}