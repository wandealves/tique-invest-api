import _ from "lodash";

import { PurchasedAsset } from "./purchased-asset";
import { Asset } from "./asset";
import { Investment } from "./investment";
import { Country } from "./country";
import { Fees } from "./fees";
import { User } from "./user";
import { TypeAsset } from "./enums/type-asset";

interface SutTypes {
  asset: Asset;
  country: Country;
  user: User;
  investment: Investment;
  purchasedAsset: PurchasedAsset;
  purchasedsAsset: PurchasedAsset[];
  feeList: Fees[];
}

const makeSut = (): SutTypes => {
  const asset = new Asset(
    1,
    "name_asset_valid",
    "code_asset_valid",
    "icon_valid"
  );
  const country = new Country(1, "Brasil");
  const user = new User(
    1,
    "user_valid",
    "email_valid",
    "cpf_valid",
    "avatar_valid"
  );
  const investment = new Investment(1, 2000, 25, TypeAsset.ACAO, 1, 1);

  const purchasedAsset = new PurchasedAsset(1, 200, 10, new Date());

  const purchasedAssetOne = new PurchasedAsset(1, 6.39, 2, new Date());

  const purchasedAssetTwo = new PurchasedAsset(2, 6.39, 9, new Date());

  const purchasedAssetThree = new PurchasedAsset(2, 33.17, 30, new Date());

  const purchasedsAsset: PurchasedAsset[] = [
    purchasedAssetOne,
    purchasedAssetTwo,
    purchasedAssetThree
  ];

  const feesOne = new Fees(1, "name_valid", 0.05, 1);
  const feestwo = new Fees(1, "name_valid", 0.26, 1);

  const feeList = [feesOne, feestwo];

  return {
    asset,
    country,
    user,
    investment,
    purchasedAsset,
    purchasedsAsset,
    feeList
  };
};

describe("PurchasedAsset Domain", () => {
  test("Deve calcular total do ativo comprado", () => {
    const { purchasedAsset } = makeSut();
    const total = purchasedAsset.calculateTotal();

    expect(total).toEqual(2000);
  });
  test("Deve calcular total com taxas", () => {
    const { purchasedAsset, purchasedsAsset, feeList } = makeSut();

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    const values = purchasedAsset.calculatePurchaseValueWithFees(
      purchasedsAsset,
      totalFees
    );

    const totalPurchaseValue = _.reduce(
      values,
      function (sum, item) {
        return sum + item.getTotalWithFees();
      },
      0
    );

    expect(totalPurchaseValue).toEqual(1065.7);
  });
  test("Deve calcular a taxa do ativo com rateio com total de taxas válida", () => {
    const { purchasedAsset } = makeSut();

    const feesOne = new Fees(1, "name_valid", 0.24, 1);
    const feestwo = new Fees(1, "name_valid", 2.18, 1);

    const feeList = [feesOne, feestwo];

    const apportionmentPercentage =
      purchasedAsset.calculateApportionmentPercentage(7952.23, 1755.0);
    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    const fee = purchasedAsset.calculateFee(apportionmentPercentage, totalFees);

    expect(fee).toEqual(0.53);
  });
  test("Deve calcular a taxa do ativo com rateio com total de taxa zerada", () => {
    const { purchasedAsset } = makeSut();

    const apportionmentPercentage =
      purchasedAsset.calculateApportionmentPercentage(7952.23, 1755.0);

    const fee = purchasedAsset.calculateFee(apportionmentPercentage, 0);

    expect(fee).toEqual(0);
  });
  test("Deve calcular a porcetagem de rateio de um ativo com total de ativos compradas válida", () => {
    const { purchasedAsset } = makeSut();

    const apportionmentPercentage =
      purchasedAsset.calculateApportionmentPercentage(7952.23, 1755.0);

    expect(apportionmentPercentage).toEqual(22.07);
  });
  test("Deve calcular a porcetagem de rateio de um ativo com total de ativos compradas zerada", () => {
    const { purchasedAsset } = makeSut();

    const apportionmentPercentage =
      purchasedAsset.calculateApportionmentPercentage(0, 1755.0);

    expect(apportionmentPercentage).toEqual(0);
  });
  test("Deve calcular o total de taxas com taxas informadas", () => {
    const { purchasedAsset } = makeSut();

    const feesOne = new Fees(1, "name_valid", 0.24, 1);
    const feestwo = new Fees(1, "name_valid", 2.18, 1);

    const feeList = [feesOne, feestwo];

    const totalFees = purchasedAsset.calculateTotalFees(feeList);

    expect(totalFees).toEqual(2.42);
  });
  test("Deve calcular o total de taxas sem taxas informada", () => {
    const { purchasedAsset } = makeSut();

    const totalFees = purchasedAsset.calculateTotalFees([]);

    expect(totalFees).toEqual(0);
  });
});
