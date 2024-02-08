import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidParametersError extends Error implements UseCaseError {
  constructor() {
    super('Invalid parameters')
  }
}