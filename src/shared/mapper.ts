import _ from "lodash";

import { PurchasedAsset } from "../domain/models";
import { TypeAsset } from "../domain/models/enums/type-asset";
import { CreatePurchasedAssetDto } from "../shared/dtos";

export const createPurchasedAssets = (
  dtos: CreatePurchasedAssetDto[]
): PurchasedAsset[] => {
  return _.map(
    dtos,
    dto => new PurchasedAsset(0, dto.price, dto.quantity, dto.date, dto.id, 0)
  );
};

export const stringToTypeAsset = (value: string): TypeAsset => {
  const key = value as keyof typeof TypeAsset;
  return TypeAsset[key];
};
