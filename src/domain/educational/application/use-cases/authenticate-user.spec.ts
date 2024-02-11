import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../tests/repositories/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { FakeHasher } from "../../../../../tests/cryptograph/fake-hasher";
import { makeUser } from "../../../../../tests/factories/make-user";
import { InvalidCredentialsError } from "@/core/errors/invalid-credentials";

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher;
let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository, fakeHasher);
  })

  it('should be able to authenticate a user', async () => {
    const student = makeUser()
    inMemoryUsersRepository.items.push(student)

    const token = await sut.execute({
      email: 'john@doe.com',
      password: 'teste123'
    })

    expect(token.accessToken.payload.sign?.sub).toEqual(expect.any(String))
  })

  it('should not be able ot authenticate a user with invalid email', async () => {
    const student = makeUser()
    inMemoryUsersRepository.items.push(student)

    expect(sut.execute({
      email: 'johns@doe.com',
      password: 'teste123'
    })).rejects.toEqual(new InvalidCredentialsError())
  })

  it('should not be able ot authenticate a user with invalid password', async () => {
    const student = makeUser()
    inMemoryUsersRepository.items.push(student)

    expect(sut.execute({
      email: 'johns@doe.com',
      password: 'teste1234'
    })).rejects.toEqual(new InvalidCredentialsError())
  })
})