import { HashComparer } from '@/domain/educational/application/cryptography/hash-comparer'
import { HasherGenerator } from '@/domain/educational/application/cryptography/hash-generator'
import { hash, compare } from 'bcryptjs'

export class BcryptHasher implements HashComparer, HasherGenerator {
  private HASH_SALT_LENGTH = 8

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}