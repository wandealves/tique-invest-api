import { Wallet, PurchasedAsset } from "../../../domain/models";

export interface IWalletRepository {
  create(entity: Wallet, assets: PurchasedAsset[]): Promise<number>;
  update(id: number, entity: Wallet): Promise<number>;
  delete(id: number): Promise<void>;

  all: () => Promise<Wallet[] | null>;
  filter: (query: any) => Promise<Wallet[] | null>;
  findOne: (id: number) => Promise<Wallet | null>;
  find: (query: any) => Promise<Wallet | null>;
}
