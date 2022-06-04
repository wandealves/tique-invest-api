import _ from "lodash";

import { ICreateWallet } from "../interfaces";
import { IWalletRepository } from "../interfaces/repositories";
import { CreateWalletDto } from "../dtos";
import { PurchasedAsset } from "../../domain/models";
import {
  stringToCurrencyCode,
  stringToTransactionType
} from "../../shared/utils";

export class CreateWallet implements ICreateWallet {
  private readonly walletRepository: IWalletRepository;

  constructor(walletRepository: IWalletRepository) {
    this.walletRepository = walletRepository;
  }

  async execute(dto: CreateWalletDto): Promise<number> {
    const purchasedAssets = _.map(
      _.get(dto, "createPurchasedAssets", []),
      item =>
        new PurchasedAsset(
          item.price,
          item.quantity,
          item.brokerName,
          item.date,
          stringToTransactionType(item.transactionType),
          stringToCurrencyCode(item.currencyCode),
          1,
          1
        )
    );

    //const result = await this.walletRepository.create(country);
    return 1;
  }
}
