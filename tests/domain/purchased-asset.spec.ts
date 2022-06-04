import _ from "lodash";

import { PurchasedAsset } from "../../src/domain/models/purchased-asset";
import { Fees } from "../../src/domain/models/fees";
import { TransactionType, CurrencyCode } from "../../src/domain/models/enums";

interface SutTypes {
  purchasedsAsset: PurchasedAsset[];
  feeList: Fees[];
}

const makeSut = (): SutTypes => {
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

  const feesOne = new Fees("name_valid", 0.05);
  const feestwo = new Fees("name_valid", 0.26);

  const feeList = [feesOne, feestwo];

  return {
    purchasedsAsset,
    feeList
  };
};

describe("PurchasedAsset Domain", () => {
  test("Deve calcular total do ativo comprado", () => {
    const purchasedAsset = new PurchasedAsset(
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
    const total = purchasedAsset.calculateTotal();

    expect(total).toEqual(995.1);
  });
  test("Deve calcular total com taxas de um ativo", () => {
    const { feeList } = makeSut();

    const totalAssetsPurchased = 1065.39;

    const purchasedAsset = new PurchasedAsset(
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

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    const totalWithFees = purchasedAsset.calculateTotalWithFees(
      totalAssetsPurchased,
      totalFees
    );

    expect(totalWithFees).toEqual(995.39);
  });
  test("Deve calcular total com taxas sem lista de taxas informado", () => {
    const purchasedAsset = new PurchasedAsset(
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

    const totalFees = purchasedAsset.calculateTotalFees([]);

    expect(totalFees).toEqual(0);
  });
  test("Deve calcular a taxa do ativo com rateio com total de taxas válida", () => {
    const { feeList } = makeSut();

    const purchasedAsset = new PurchasedAsset(
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

    const apportionmentPercentage =
      purchasedAsset.calculateApportionmentPercentage(1065.39, 995.1);

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    const fee = purchasedAsset.calculateRateWithApportionment(
      apportionmentPercentage,
      totalFees
    );

    expect(fee).toEqual(0.29);
  });
  test("Deve calcular a taxa do ativo com rateio com total de taxa zerada", () => {
    const purchasedAsset = new PurchasedAsset(
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

    const apportionmentPercentage =
      purchasedAsset.calculateApportionmentPercentage(1065.39, 995.1);

    const fee = purchasedAsset.calculateRateWithApportionment(
      apportionmentPercentage,
      0
    );

    expect(fee).toEqual(0);
  });
  test("Deve calcular a porcetagem de rateio de um ativo com total de ativos compradas válida", () => {
    const purchasedAsset = new PurchasedAsset(
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

    const apportionmentPercentage =
      purchasedAsset.calculateApportionmentPercentage(1065.39, 995.1);

    expect(apportionmentPercentage).toEqual(93.4);
  });
  test("Deve calcular a porcetagem de rateio de um ativo com total de ativos compradas zerada", () => {
    const purchasedAsset = new PurchasedAsset(
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

    const apportionmentPercentage =
      purchasedAsset.calculateApportionmentPercentage(0, 1755.0);

    expect(apportionmentPercentage).toEqual(0);
  });
  test("Deve calcular o total de taxas com taxas informadas", () => {
    const { feeList } = makeSut();

    const purchasedAsset = new PurchasedAsset(
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

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    expect(totalFees).toEqual(0.31);
  });
  test("Deve calcular o total de taxas sem taxas informada", () => {
    const purchasedAsset = new PurchasedAsset(
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

    const totalFees = purchasedAsset.calculateTotalFees([]);

    expect(totalFees).toEqual(0);
  });
  test("Deve calcular preço médio", () => {
    const purchasedAsset = new PurchasedAsset(
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

    const total = purchasedAsset.calculateAveragePrice(200, 10);

    expect(total).toEqual(20);
  });
});
