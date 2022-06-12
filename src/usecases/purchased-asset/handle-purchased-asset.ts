import _ from "lodash";

import { IHandlePurchasedAsset, HandlePurchasedAssetData } from "../interfaces";
import { PurchasedAsset, Asset } from "../../domain/models";
import { IAssetRepository } from "../interfaces/repositories";
import { handlePurchasedAssetError } from "../errors";
import { Either, left, right } from "../../shared";
import {
  stringToCurrencyCode,
  stringToTransactionType
} from "../../shared/utils";

export class HandlePurchasedAsset implements IHandlePurchasedAsset {
  private readonly assetRepository: IAssetRepository;

  constructor(assetRepository: IAssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(
    data: HandlePurchasedAssetData
  ): Promise<Either<handlePurchasedAssetError, PurchasedAsset[]>> {
    if (!data)
      return left(new handlePurchasedAssetError("Dados informado inválidos"));

    if (_.size(data.dtos) === 0)
      return left(new handlePurchasedAssetError("Informe ao menos um ativo"));

    const codes = _.map(data.dtos, asset => asset.codeAsset);

    const assets = await this.assetRepository.filter({
      code: {
        in: [...codes]
      }
    });

    if (_.size(assets) === 0)
      return left(new handlePurchasedAssetError("Nenhum ativo encontrado"));

    return right(this.handleNewPurchasedAsset(data, assets));
  }

  handleNewPurchasedAsset(
    data: HandlePurchasedAssetData,
    assets: Asset[] | null
  ) {
    const purchasedAssets: PurchasedAsset[] = [];

    for (const dto of data.dtos) {
      const assetFind = _.find(assets, asset => asset.code === dto.codeAsset);

      if (assetFind) {
        const purchasedAsset = new PurchasedAsset(
          0,
          dto.price,
          dto.quantity,
          dto.brokerName,
          dto.date,
          stringToTransactionType(dto.transactionType),
          stringToCurrencyCode(dto.currencyCode)
        );

        purchasedAsset.totalWithFees = purchasedAsset.calculateTotalWithFees(
          data.totalAssetsPurchased,
          data.totalFees
        );

        purchasedAsset.percentageApportionmentFees =
          purchasedAsset.calculateApportionmentPercentage(
            data.totalAssetsPurchased,
            purchasedAsset.total
          );

        purchasedAsset.fees = purchasedAsset.calculateRateWithApportionment(
          purchasedAsset.percentageApportionmentFees,
          data.totalFees
        );

        purchasedAsset.averagePrice = purchasedAsset.calculateAveragePrice(
          purchasedAsset.totalWithFees,
          purchasedAsset.quantity
        );

        purchasedAsset.assetId = assetFind.id;
        purchasedAsset.walletId = data.walletId;

        purchasedAssets.push(purchasedAsset);
      }
    }

    return purchasedAssets;
  }
}
