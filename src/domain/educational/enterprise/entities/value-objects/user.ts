import { ValueObject } from "@/core/entities/value-object";
import { Role } from "@prisma/client";

export interface UserProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  document: string;
  phone_number: string;
  role: Role;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

export class User extends ValueObject<UserProps> {
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

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  set first_name(value: string) {
    this.props.first_name = value;
  }

  set last_name(value: string) {
    this.props.last_name = value;
  }

  set phone_number(value: string) {
    this.props.phone_number = value;
  }

  clear_password() {
    delete this.props.password
  }

  static create(props: UserProps) {
    return new User(props);
  }
}