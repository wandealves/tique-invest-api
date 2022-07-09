export interface IEncrypter {
  encrypt(value: string): Promise<string>;
  comparePassword(plaintextPassword: string, hash: string): Promise<boolean>;
}
