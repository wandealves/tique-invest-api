import _ from "lodash";
import {
  Wallet as WalletPrisma,
  PurchasedAsset as PurchasedAssetPrisma
} from "@prisma/client";

import { Wallet, PurchasedAsset } from "../../../domain/models";
import {
  currencyCodePrismaToCurrencyCode,
  transactionTypePrismaToTransactionType
} from "../../../shared/utils";

export const makeWallet = (
  walletPrisma: WalletPrisma,
  purchasedAssetsPrisma: PurchasedAssetPrisma[]
): Wallet => {
  const walletReturn = new Wallet(
    walletPrisma.id,
    walletPrisma.name,
    currencyCodePrismaToCurrencyCode(walletPrisma.currencyCode),
    walletPrisma.userId
  );

  walletReturn.purchasedAssets = _.map(
    purchasedAssetsPrisma,
    purchasedAsset =>
      new PurchasedAsset(
        purchasedAsset.id,
        _.toNumber(purchasedAsset.price),
        purchasedAsset.quantity,
        purchasedAsset.assetCode ?? "",
        purchasedAsset.brokerName,
        purchasedAsset.date,
        transactionTypePrismaToTransactionType(purchasedAsset.transactionType),
        currencyCodePrismaToCurrencyCode(purchasedAsset.currencyCode)
      )
  );

  return walletReturn;
};
