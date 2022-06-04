import { CreateWalletDto } from "../../dtos";

export interface ICreateWallet {
  execute: (dto: CreateWalletDto) => Promise<number>;
}
