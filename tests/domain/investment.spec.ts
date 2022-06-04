import _ from "lodash";

import { PurchasedAsset } from "../../src/domain/models/purchased-asset";
import { Investment } from "../../src/domain/models/investment";
import { TypeAsset } from "../../src/domain/models/enums/type-asset";
import { TransactionType, CurrencyCode } from "../../src/domain/models/enums";

interface SutTypes {
  investment: Investment;
  purchasedsAsset: PurchasedAsset[];
}

const makeSut = (): SutTypes => {
  const investment = new Investment(1, TypeAsset.ACAO, 1, 1);

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
    investment,
    purchasedsAsset
  };
};

describe("Investment Domain", () => {
  test("Deve calcula total sem taxas", () => {
    const { investment, purchasedsAsset } = makeSut();

    const total = investment.calculateTotalWithoutFees(purchasedsAsset);

    expect(total).toEqual(1065.39);
  });
  test("Deve calcula total sem taxas sem ativos", () => {
    const { investment } = makeSut();

    const total = investment.calculateTotalWithoutFees([]);

    expect(total).toEqual(0);
  });
  test("Deve calcula total com taxas", () => {
    const { investment, purchasedsAsset } = makeSut();

    const total = investment.calculateTotalWithFees(purchasedsAsset, 0.31);

    expect(total).toEqual(1065.7);
  });
  test("Deve calcula total com taxas sem ativos", () => {
    const { investment } = makeSut();

    const total = investment.calculateTotalWithFees([], 0.31);

    expect(total).toEqual(0);
  });
});
