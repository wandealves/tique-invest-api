import _ from "lodash";

import { PurchasedAsset, Fees, Wallet } from "../../src/domain/models";
import { CurrencyCode, TransactionType } from "../../src/domain/models/enums";
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

describe("Dominio -> Ativos Comprados", () => {
  test("Deve calcular total do ativo", () => {
    const { assets } = makeSut();
    const asset = assets[0];

    const total = asset.calculateTotal();

    expect(total).toEqual(343.65);
  });

  test("Deve cálcular a porcetagem em relação ao total geral de todos ativos", () => {
    const { assets, wallet } = makeSut();

    const totalAssets = wallet.calculateTotalAssets(assets);

    const asset = assets[0];
    const total = asset.calculateTotal();
    const apportionmentPercentage = asset.calculateApportionmentPercentage(
      totalAssets,
      total
    );

    expect(apportionmentPercentage).toEqual(0.2267);
  });

  test("Deve calcular o valor do rateio", () => {
    const { assets, wallet, feeList } = makeSut();

    const totalAssets = wallet.calculateTotalAssets(assets);
    const totalFees = wallet.calculateTotalFees(feeList);

    const asset = assets[0];
    const total = asset.calculateTotal();
    const apportionmentPercentage = asset.calculateApportionmentPercentage(
      totalAssets,
      total
    );
    const apportionmentValue = asset.calculateApportionmentValue(
      totalFees,
      apportionmentPercentage
    );

    expect(apportionmentValue).toEqual(0.1);
  });

  test("Deve calcular preço médio", () => {
    const { assets } = makeSut();

    const asset = assets[0];
    const total = asset.calculateTotal();

    const averagePrice = asset.calculateAveragePrice(asset.quantity, total);

    expect(averagePrice).toEqual(114.55);
  });

  test("Deve calcular total com taxas", () => {
    const { assets, wallet, feeList } = makeSut();

    const asset = assets[0];
    const total = asset.calculateTotal();
    const totalAssets = wallet.calculateTotalAssets(assets);
    const totalFees = wallet.calculateTotalFees(feeList);

    const apportionmentPercentage = asset.calculateApportionmentPercentage(
      totalAssets,
      total
    );
    const apportionmentValue = asset.calculateApportionmentValue(
      totalFees,
      apportionmentPercentage
    );

    const averagePrice = asset.calculateTotalWithFees(
      total,
      apportionmentValue,
      TransactionType.COMPRA
    );

    expect(averagePrice).toEqual(343.75);
  });
});
