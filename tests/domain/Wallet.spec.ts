import _ from "lodash";

import { PurchasedAsset, Fees, Wallet } from "../../src/domain/models";
import { CurrencyCode } from "../../src/domain/models/enums";

import { assets } from "../data/mock-data";

interface SutTypes {
  assets: PurchasedAsset[];
  feeList: Fees[];
  wallet: Wallet;
}

const makeSut = (): SutTypes => {
  const wallet = new Wallet(0, "wallet_valid", CurrencyCode.BRL, 1);
  const feeList = [new Fees("name_valid", 0.04), new Fees("name_valid", 0.41)];

  return {
    assets,
    feeList,
    wallet
  };
};

describe("Dominio -> Cateiras", () => {
  test("Deve calcular o total de ativos comprados", () => {
    const { assets, wallet } = makeSut();

    const total = wallet.calculateTotalAssets(assets);

    expect(total).toEqual(1515.63);
  });

  test("Deve retornar o quantidades, total dos ativos agrupados por código", () => {
    const { assets, wallet } = makeSut();

    const total = wallet.totalsByGroups(assets);

    const result = {
      items: [
        { code: "ATV01", quantity: 3, total: 343.65 },
        { code: "ATV02", quantity: 5, total: 894.8 },
        { code: "ATV03", quantity: 4, total: 41.8 },
        { code: "ATV04", quantity: 2, total: 235.38 }
      ],
      props: {
        items: [
          { code: "ATV01", quantity: 3, total: 343.65 },
          { code: "ATV02", quantity: 5, total: 894.8 },
          { code: "ATV03", quantity: 4, total: 41.8 },
          { code: "ATV04", quantity: 2, total: 235.38 }
        ],
        quantity: 14,
        total: 1515.63
      },
      quantity: 14,
      total: 1515.63
    };

    expect(total).toEqual(result);
  });

  test("Deve calcular o quantidades dos ativos", () => {
    const { assets, wallet } = makeSut();

    const quantitie = wallet.calculateTotalQuantities(assets);

    expect(quantitie).toEqual(14);
  });

  test("Deve calcular o quantidades dos ativos", () => {
    const { wallet, feeList } = makeSut();

    const fees = wallet.calculateTotalFees(feeList);

    expect(fees).toEqual(0.45);
  });

  test("Deve unificar linhas do mesmo ativo", () => {
    const { wallet, assets } = makeSut();

    const results = wallet.unifyAssets(assets);

    expect(results).toEqual(assets);
  });

  test("Deve calcular rateio, porcetageme totais", () => {
    const { wallet, assets, feeList } = makeSut();

    const totalAllAssets = wallet.calculateTotalAssets(assets);
    const totalFees = wallet.calculateTotalFees(feeList);

    const calculatePurchasedAsset = wallet.calculatePurchasedAsset(
      assets,
      totalAllAssets,
      totalFees
    );

    const resulst = [
      {
        _apportionmentPercentage: 0.2267,
        _apportionmentValue: 0.1,
        _assetCode: "ATV01",
        _assetId: 0,
        _brokerName: "broker_valid",
        _currencyCode: 0,
        _date:  new Date("2021-02-05T03:00:00.000Z"),
        _id: 0,
        _month: 2,
        _price: 114.55,
        _quantity: 3,
        _total: 343.65,
        _totalFees: 0.45,
        _totalWithFees: 343.75,
        _transactionType: 0,
        _walletId: 0,
        _year: 2021
      },
      {
        _apportionmentPercentage: 0.5904,
        _apportionmentValue: 0.27,
        _assetCode: "ATV02",
        _assetId: 0,
        _brokerName: "broker_valid",
        _currencyCode: 0,
        _date:  new Date("2021-02-05T03:00:00.000Z"),
        _id: 0,
        _month: 2,
        _price: 178.96,
        _quantity: 5,
        _total: 894.8,
        _totalFees: 0.45,
        _totalWithFees: 895.0699999999999,
        _transactionType: 0,
        _walletId: 0,
        _year: 2021
      },
      {
        _apportionmentPercentage: 0.0276,
        _apportionmentValue: 0.01,
        _assetCode: "ATV03",
        _assetId: 0,
        _brokerName: "broker_valid",
        _currencyCode: 0,
        _date:  new Date("2021-02-05T03:00:00.000Z"),
        _id: 0,
        _month: 2,
        _price: 10.45,
        _quantity: 4,
        _total: 41.8,
        _totalFees: 0.45,
        _totalWithFees: 41.809999999999995,
        _transactionType: 0,
        _walletId: 0,
        _year: 2021
      },
      {
        _apportionmentPercentage: 0.1553,
        _apportionmentValue: 0.07,
        _assetCode: "ATV04",
        _assetId: 0,
        _brokerName: "broker_valid",
        _currencyCode: 0,
        _date: new Date("2021-02-05T03:00:00.000Z"),
        _id: 0,
        _month: 2,
        _price: 117.69,
        _quantity: 2,
        _total: 235.38,
        _totalFees: 0.45,
        _totalWithFees: 235.45,
        _transactionType: 0,
        _walletId: 0,
        _year: 2021
      }
    ];

    expect(calculatePurchasedAsset).toEqual(resulst);
  });
});
