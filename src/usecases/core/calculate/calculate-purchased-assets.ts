import _ from "lodash";

import { ICalculatePurchasedAssets } from "../../interfaces";
import { PurchasedAsset } from "../../../domain/models";
import { IAssetRepository } from "../../interfaces/repositories";
import { handlePurchasedAssetError } from "../../errors";
import { Either, left, right } from "../../../shared";

export class CalculatePurchasedAssets implements ICalculatePurchasedAssets {
  private readonly assetRepository: IAssetRepository;

  constructor(assetRepository: IAssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(
    purchasedAssets: PurchasedAsset[],
    totalAllAssets: number,
    totalFees: number
  ): Promise<Either<handlePurchasedAssetError, PurchasedAsset[]>> {
    if (_.size(purchasedAssets) === 0) return right([]);

    const codes = _.map(purchasedAssets, asset => asset.assetCode);
    const assets = await this.assetRepository.filter({
      code: {
        in: [...codes]
      }
    });

    const list = [];
    for (const asset of purchasedAssets) {
      const apportionmentPercentage = asset.calculateApportionmentPercentage(
        totalAllAssets,
        asset.total
      );

      const apportionmentValue = asset.calculateApportionmentValue(
        totalFees,
        apportionmentPercentage
      );

      const totalWithFees = asset.calculateTotalWithFees(
        asset.total,
        apportionmentValue,
        asset.transactionType
      );

      asset.apportionmentPercentage = apportionmentPercentage;
      asset.apportionmentValue = apportionmentValue;
      asset.totalFees = totalFees;
      asset.totalWithFees = totalWithFees;

      const assetFind = _.find(assets, item => item.code === asset.assetCode);

      if (assetFind) asset.assetId = assetFind.id;
      list.push(asset);
    }

    return right(list);
  }
}
