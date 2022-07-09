import bcrypt from "bcrypt";

import { BcryptAdapter } from "../../../src/infra/criptography/bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve("hash"));
  },
  async compare(): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Criptografia", () => {
  test("Deve chamar o método de criptografia correta", async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");

    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });
  test("Deve retornar o hash correto", async () => {
    const sut = makeSut();
    const hash = await sut.encrypt("any_value");

    expect(hash).toBe("hash");
  });
  test("Deve retornar erro ao criptografar com error", async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(() => Promise.reject(new Error()));
    const promise = sut.encrypt("any_value");

    await expect(promise).rejects.toThrow();
  });
  test("Deve comparar senha e retornar verdadeiro", async () => {
    const sut = makeSut();
    const comparePassword = await sut.comparePassword(
      "any_password",
      "any_hash"
    );

    expect(comparePassword).toBe(true);
  });
});
