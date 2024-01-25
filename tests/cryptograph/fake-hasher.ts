import { HashComparer } from "@/domain/educational/application/cryptography/hash-comparer"
import { HasherGenerator } from "@/domain/educational/application/cryptography/hash-generator"

export class FakeHasher implements HasherGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}