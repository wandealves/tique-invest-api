import _ from "lodash";

import { PurchasedAsset } from "./purchased-asset";
import { Asset } from "./asset";
import { Investment } from "./investment";
import { Country } from "./country";
import { User } from "./user";
import { TypeAsset } from "./enums/type-asset";

interface SutTypes {
  asset: Asset;
  country: Country;
  user: User;
  investment: Investment;
  purchasedAsset: PurchasedAsset;
  purchasedsAsset: PurchasedAsset[];
  feeValues: number[];
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
  const investment = new Investment(1, 2000, TypeAsset.ACAO, country, user);

  const purchasedAsset = new PurchasedAsset(
    1,
    200,
    10,
    new Date(),
    asset,
    investment
  );

  const purchasedAssetOne = new PurchasedAsset(
    1,
    6.39,
    2,
    new Date(),
    asset,
    investment
  );

  const purchasedAssetTwo = new PurchasedAsset(
    2,
    6.39,
    9,
    new Date(),
    asset,
    investment
  );

  const purchasedAssetThree = new PurchasedAsset(
    2,
    33.17,
    30,
    new Date(),
    asset,
    investment
  );

  const purchasedsAsset: PurchasedAsset[] = [
    purchasedAssetOne,
    purchasedAssetTwo,
    purchasedAssetThree
  ];

  const feeValues = [0.05, 0.26];

  return {
    asset,
    country,
    user,
    investment,
    purchasedAsset,
    purchasedsAsset,
    feeValues
  };
};

describe("PurchasedAsset Domain", () => {
  test("Deve calcular total do ativo comprado", () => {
    const { purchasedAsset } = makeSut();
    const total = purchasedAsset.calculateTotal();

    expect(total).toEqual(2000);
  });
  test("Deve calcular total com taxas", () => {
    const { purchasedAsset, purchasedsAsset, feeValues } = makeSut();
    const values = purchasedAsset.calculatePurchaseValueWithFees(
      purchasedsAsset,
      feeValues
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
});
