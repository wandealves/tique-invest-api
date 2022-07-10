import bcrypt from "bcrypt";

import { IEncrypter } from "../../usecases/interfaces/encrypter";

export class BcryptAdapter implements IEncrypter {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hashSync(value, this.salt);
  }

  async comparePassword(
    plaintextPassword: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compareSync(plaintextPassword, hash);
  }
}
