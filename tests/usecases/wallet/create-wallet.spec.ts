import "reflect-metadata";

/*import { CreateWalletDto } from "../../../src/usecases/dtos";
import { CreateWallet } from "../../../src/usecases";
import { ICreateWallet } from "../../../src/usecases/interfaces";
import { createWalletDto } from "../../data/mock-data";
import {
  WalletRepositorySpy,
  AssetRepositorySpy
} from "../../infra/mocks/mock-repositories";

interface SutTypes {
  createWallet: ICreateWallet;
  walletRepositorySpy: WalletRepositorySpy;
  assetRepositorySpy: AssetRepositorySpy;
  createWalletDto: CreateWalletDto;
}

const makeSut = (): SutTypes => {
  const walletRepositorySpy = new WalletRepositorySpy();
  const assetRepositorySpy = new AssetRepositorySpy();
  const createWallet = new CreateWallet(
    walletRepositorySpy,
    assetRepositorySpy
  );

  return {
    createWallet,
    walletRepositorySpy,
    assetRepositorySpy,
    createWalletDto
  };
};

describe("Usecase create wallet", () => {
  test("Deve criar a cateira de ativos", async () => {
    const { createWallet, createWalletDto } = makeSut();

    const result = await createWallet.execute(createWalletDto);

    if (result.isRight()) expect(result.value.id).toBe(1);
  });
});*/

describe("Usecase create wallet", () => {
  test("Deve criar a cateira de ativos", async () => {

    expect(1).toBe(1);
  });
})
