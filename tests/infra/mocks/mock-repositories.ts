import { Asset, Wallet, PurchasedAsset } from "../../../src/domain/models";
import { TypeAsset } from "../../../src/domain/models/enums";
import {
  IWalletRepository,
  IAssetRepository
} from "../../usecases/interfaces/repositories";

export class WalletRepositorySpy implements IWalletRepository {
  create(entity: Wallet, purchasedAssets: PurchasedAsset[]): Promise<number> {
    return Promise.resolve(1);
  }
  update(id: number, entity: Wallet): Promise<number> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  all(): Promise<Wallet[] | null> {
    throw new Error("Method not implemented.");
  }
  filter(query: any): Promise<Wallet[] | null> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<Wallet | null> {
    throw new Error("Method not implemented.");
  }
  find(query: any): Promise<Wallet | null> {
    throw new Error("Method not implemented.");
  }
}

export class AssetRepositorySpy implements IAssetRepository {
  create(entity: Asset): Promise<number> {
    throw new Error("Method not implemented.");
  }
  update(id: number, entity: Asset): Promise<number> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  all(): Promise<Asset[] | null> {
    throw new Error("Method not implemented.");
  }
  filter(query: any): Promise<Asset[] | null> {
    return Promise.resolve([
      new Asset(1, "AALR3", "AALR3", "", TypeAsset.ACAO),
      new Asset(2, "ABEV3", "ABEV3", "", TypeAsset.ACAO),
      new Asset(3, "AGRO3", "AGRO3", "", TypeAsset.ACAO),
      new Asset(4, "ALUP11", "ALUP11", "", TypeAsset.ACAO)
    ]);
  }
  findOne(id: number): Promise<Asset | null> {
    throw new Error("Method not implemented.");
  }
  findCode(code: string): Promise<Asset | null> {
    throw new Error("Method not implemented.");
  }
  find(query: any): Promise<Asset | null> {
    throw new Error("Method not implemented.");
  }
}
