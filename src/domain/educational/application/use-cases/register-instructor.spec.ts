import { beforeEach, describe, expect, it } from "vitest";
import { FakeHasher } from "../../../../../tests/cryptograph/fake-hasher";
import { EmailAlreadyRegisteredError } from "@/core/errors/email-already-registered";
import { DocumentAlreadyRegisteredError } from "@/core/errors/document-already-registered";
import { RegisterInstructorUseCase } from "./register-instructor";
import { InMemoryUsersRepository } from "../../../../../tests/repositories/in-memory-users-repository";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: RegisterInstructorUseCase;

describe("Register instructor", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterInstructorUseCase(inMemoryUsersRepository, fakeHasher);
  })

  it("should be able to register instructor", async () => {
    const result = await sut.execute({
      document: "11111111111",
      email: "teste@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    })

    expect(result.instructor.document).toBe("11111111111");
  })

  it("should hash student password", async () => {
    const result = await sut.execute({
      document: "11111111111",
      email: "teste@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    })

    const hashedPassword = await fakeHasher.hash('Teste123')

    expect(inMemoryUsersRepository.items[0].password).toBe(hashedPassword);
  });

  it("should not be able to create instructor with an already registered email", async () => {
    await sut.execute({
      document: "11111111111",
      email: "teste@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    })

    expect(sut.execute({
      document: "11111111111",
      email: "teste@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    })).rejects.toEqual(new EmailAlreadyRegisteredError());
  })

  it("should not be able to create instructor with an already registered document", async () => {
    await sut.execute({
      document: "11111111111",
      email: "teste@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    })

    expect(sut.execute({
      document: "11111111111",
      email: "teste2@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    })).rejects.toEqual(new DocumentAlreadyRegisteredError());
  })
})