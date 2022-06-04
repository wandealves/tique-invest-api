import _ from "lodash";

import { PurchasedAsset } from "../../src/domain/models/purchased-asset";
import { Wallet } from "../../src/domain/models";
import { TransactionType, CurrencyCode } from "../../src/domain/models/enums";

interface SutTypes {
  wallet: Wallet;
  purchasedsAsset: PurchasedAsset[];
}

const makeSut = (): SutTypes => {
  const wallet = new Wallet(1, "wallet_valid", 1000, 20, CurrencyCode.BRL, 1);

  const purchasedAssetOne = new PurchasedAsset(
    1,
    6.39,
    2,
    "broker_valid",
    new Date(2021, 2, 4),
    TransactionType.COMPRA,
    CurrencyCode.BRL,
    1,
    1
  );
  const purchasedAssetTwo = new PurchasedAsset(
    1,
    6.39,
    9,
    "broker_valid",
    new Date(),
    TransactionType.COMPRA,
    CurrencyCode.BRL,
    1,
    1
  );
  const purchasedAssetThree = new PurchasedAsset(
    2,
    33.17,
    30,
    "broker_valid",
    new Date(),
    TransactionType.COMPRA,
    CurrencyCode.BRL,
    2,
    1
  );

  const purchasedsAsset: PurchasedAsset[] = [
    purchasedAssetOne,
    purchasedAssetTwo,
    purchasedAssetThree
  ];

  return {
    wallet,
    purchasedsAsset
  };
};

describe("Investment Domain", () => {
  test("Deve calcula total sem taxas", () => {
    const { wallet, purchasedsAsset } = makeSut();

    const total = wallet.calculateTotalWithoutFees(purchasedsAsset);

    expect(total).toEqual(1065.39);
  });
  test("Deve calcula total sem taxas sem ativos", () => {
    const { wallet } = makeSut();

    const total = wallet.calculateTotalWithoutFees([]);

    expect(total).toEqual(0);
  });
  test("Deve calcula total com taxas", () => {
    const { wallet, purchasedsAsset } = makeSut();

    const total = wallet.calculateTotalWithFees(purchasedsAsset, 0.31);

    expect(total).toEqual(1065.7);
  });
  test("Deve calcula total com taxas sem ativos", () => {
    const { wallet } = makeSut();

    const total = wallet.calculateTotalWithFees([], 0.31);

    expect(total).toEqual(0);
  });
});
