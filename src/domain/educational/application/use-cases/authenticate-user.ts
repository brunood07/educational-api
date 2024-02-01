import { InvalidCredentialsError } from "@/core/errors/invalid-credentials"
import { UsersRepository } from "../repositories/users-repository"
import { HashComparer } from "../cryptography/hash-comparer"
import { Encrypter } from "../cryptography/encrypter"

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {}

export class AuthenticateUserUseCase {
  constructor( 
      private usersRepository: UsersRepository,
      private hashComparer: HashComparer,
      private encrypter: Encrypter
    ) {}

  execute = async (data: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> => {
    const { email, password } = data

    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new InvalidCredentialsError()
    const passwordMatch = this.hashComparer.compare(password, user.password)
    if (!passwordMatch) throw new InvalidCredentialsError()

    const accessToken = await this.encrypter.encrypt({
      sub: `${user.email}-${user.role}`
    })

    return {}
  }
}