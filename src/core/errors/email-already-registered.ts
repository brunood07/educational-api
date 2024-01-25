import { UseCaseError } from '@/core/errors/use-case-error'

export class EmailAlreadyRegisteredError extends Error implements UseCaseError {
  constructor() {
    super('Email already registered')
  }
}