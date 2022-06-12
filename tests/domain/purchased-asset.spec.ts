import _ from "lodash";

import { PurchasedAsset } from "../../src/domain/models/purchased-asset";
import { Fees } from "../../src/domain/models/fees";
import { TransactionType, CurrencyCode } from "../../src/domain/models/enums";

interface SutTypes {
  purchasedsAssets: PurchasedAsset[];
  feeList: Fees[];
}

const makeSut = (): SutTypes => {
  const purchasedsAssets: PurchasedAsset[] = [
    new PurchasedAsset(
      0,
      114.55,
      3,
      "broker_valid",
      new Date(2021, 1, 5),
      TransactionType.COMPRA,
      CurrencyCode.BRL
    ),
    new PurchasedAsset(
      0,
      178.96,
      5,
      "broker_valid",
      new Date(2021, 1, 5),
      TransactionType.COMPRA,
      CurrencyCode.BRL
    ),
    new PurchasedAsset(
      0,
      10.45,
      4,
      "broker_valid",
      new Date(2021, 1, 5),
      TransactionType.COMPRA,
      CurrencyCode.BRL
    ),

    new PurchasedAsset(
      0,
      117.69,
      2,
      "broker_valid",
      new Date(2021, 1, 5),
      TransactionType.COMPRA,
      CurrencyCode.BRL
    )
  ];

  const feeList = [new Fees("name_valid", 0.04), new Fees("name_valid", 0.41)];

  return {
    purchasedsAssets,
    feeList
  };
};

describe("PurchasedAsset Domain", () => {
  test("Deve calcular total do ativo comprado", () => {
    const { purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];
    purchasedAsset.total = purchasedAsset.calculateTotal();

    expect(purchasedAsset.total).toEqual(343.65);
  });
  test("Deve calcular total com taxas", () => {
    const { feeList, purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];

    const totalOfAllAssets = _.reduce(
      purchasedsAssets,
      function (sum, item) {
        return sum + item.calculateTotal();
      },
      0
    );

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    purchasedAsset.totalWithFees = purchasedAsset.calculateTotalWithFees(
      totalOfAllAssets,
      totalFees
    );

    expect(purchasedAsset.totalWithFees).toEqual(343.75);
  });

  test("Deve calcular total de taxas", () => {
    const { feeList, purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];
    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    expect(totalFees).toEqual(0.45);
  });
  test("Deve calcular total de taxas com a lista de taxas vazia", () => {
    const { purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];
    const totalFees = purchasedAsset.calculateTotalFees([]);

    expect(totalFees).toEqual(0);
  });

  test("Deve calcular rateio", () => {
    const { feeList, purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];

    const totalOfAllAssets = _.reduce(
      purchasedsAssets,
      function (sum, item) {
        return sum + item.calculateTotal();
      },
      0
    );
    purchasedAsset.total = purchasedAsset.calculateTotal();

    purchasedAsset.percentageApportionmentFees =
      purchasedAsset.calculateApportionmentPercentage(
        totalOfAllAssets,
        purchasedAsset.total
      );

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    purchasedAsset.fees = purchasedAsset.calculateRateWithApportionment(
      purchasedAsset.percentageApportionmentFees,
      totalFees
    );

    expect(purchasedAsset.fees).toEqual(0.1);
  });
  test("Deve calcular rateio sem total de taxas", () => {
    const { feeList, purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];

    const totalOfAllAssets = _.reduce(
      purchasedsAssets,
      function (sum, item) {
        return sum + item.calculateTotal();
      },
      0
    );
    purchasedAsset.total = purchasedAsset.calculateTotal();

    purchasedAsset.percentageApportionmentFees =
      purchasedAsset.calculateApportionmentPercentage(
        totalOfAllAssets,
        purchasedAsset.total
      );

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    purchasedAsset.fees = purchasedAsset.calculateRateWithApportionment(
      purchasedAsset.percentageApportionmentFees,
      0
    );

    expect(purchasedAsset.fees).toEqual(0);
  });

  test("Deve calcular porcentagem", () => {
    const { purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];

    const totalOfAllAssets = _.reduce(
      purchasedsAssets,
      function (sum, item) {
        return sum + item.calculateTotal();
      },
      0
    );
    purchasedAsset.total = purchasedAsset.calculateTotal();

    purchasedAsset.percentageApportionmentFees =
      purchasedAsset.calculateApportionmentPercentage(
        totalOfAllAssets,
        purchasedAsset.total
      );

    expect(purchasedAsset.percentageApportionmentFees).toEqual(22.67);
  });
  test("Deve calcular porcentagem sem total de ativos", () => {
    const { purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];

    purchasedAsset.total = purchasedAsset.calculateTotal();

    purchasedAsset.percentageApportionmentFees =
      purchasedAsset.calculateApportionmentPercentage(0, purchasedAsset.total);

    expect(purchasedAsset.percentageApportionmentFees).toEqual(0);
  });

  test("Deve calcular preço médio", () => {
    const { feeList, purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];

    const totalOfAllAssets = _.reduce(
      purchasedsAssets,
      function (sum, item) {
        return sum + item.calculateTotal();
      },
      0
    );

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    purchasedAsset.totalWithFees = purchasedAsset.calculateTotalWithFees(
      totalOfAllAssets,
      totalFees
    );

    purchasedAsset.averagePrice = purchasedAsset.calculateAveragePrice(
      purchasedAsset.totalWithFees,
      purchasedAsset.quantity
    );

    expect(purchasedAsset.averagePrice).toEqual(114.58);
  });

  test("Deve calcular preço médio com quantidade zerada", () => {
    const { feeList, purchasedsAssets } = makeSut();

    const purchasedAsset = purchasedsAssets[0];

    const totalOfAllAssets = _.reduce(
      purchasedsAssets,
      function (sum, item) {
        return sum + item.calculateTotal();
      },
      0
    );

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    purchasedAsset.totalWithFees = purchasedAsset.calculateTotalWithFees(
      totalOfAllAssets,
      totalFees
    );

    purchasedAsset.averagePrice = purchasedAsset.calculateAveragePrice(
      purchasedAsset.totalWithFees,
      0
    );

    expect(purchasedAsset.averagePrice).toEqual(0);
  });
});
