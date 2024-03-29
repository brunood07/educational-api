import { InvalidCredentialsError } from "@/core/errors/invalid-credentials"
import { UsersRepository } from "../repositories/users-repository"
import { HashComparer } from "../cryptography/hash-comparer"
import { FastifyJwtSignOptions, SignPayloadType } from "@fastify/jwt"
import { env } from "@/infra/env"

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface TokenPayload {
  options: SignPayloadType
  payload: FastifyJwtSignOptions
}

interface AuthenticateUserUseCaseResponse {
  accessToken: TokenPayload
  refreshToken: TokenPayload
}

export class AuthenticateUserUseCase {
  constructor( 
      private usersRepository: UsersRepository,
      private hashComparer: HashComparer
    ) {}

  execute = async (data: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> => {
    const { email, password } = data

    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new InvalidCredentialsError()
    if (!user.password) throw new InvalidCredentialsError()
    const passwordMatch = this.hashComparer.compare(password, user.password)
    if (!passwordMatch) throw new InvalidCredentialsError()

    return {
      accessToken: {
        options: {
          role: user.role
        },
        payload: {
          sign: {
            sub: user.id,
            expiresIn: env.JWT_TOKEN_EXPIRES_IN,
            
          }
        }
      },
      refreshToken: {
        options: {
          role: user.role
        },
        payload: {
          sign: {
            sub: user.id,
            expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN,
          }
        }
      }
    }
  }
}