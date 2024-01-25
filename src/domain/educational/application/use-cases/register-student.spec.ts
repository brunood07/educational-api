import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryStudentsRepository } from "../../../../../tests/repositories/in-memory-students-repository";
import { FakeHasher } from "../../../../../tests/cryptograph/fake-hasher";
import { RegisterStudentUseCase } from "./register-student";
import { EmailAlreadyRegisteredError } from "@/core/errors/email-already-registered";
import { DocumentAlreadyRegisteredError } from "@/core/errors/document-already-registered";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let sut: RegisterStudentUseCase;

describe("Register Student", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher);
  })

  it("should be able to register students", async () => {
    const result = await sut.execute({
      document: "11111111111",
      email: "teste@email.com",
      first_name: "John",
      last_name: "Doe",
      password: "Teste123",
      phone_number: "11999999999"
    })

    expect(result.student.document).toBe("11111111111");
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

    expect(inMemoryStudentsRepository.items[0].password).toBe(hashedPassword);
  });

  it("should not be able to create student with an already registered email", async () => {
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

  it("should not be able to create student with an already registered document", async () => {
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