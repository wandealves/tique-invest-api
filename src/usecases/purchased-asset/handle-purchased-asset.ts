import _ from "lodash";

import { IHandlePurchasedAsset, HandlePurchasedAssetData } from "../interfaces";
import { PurchasedAsset } from "../../domain/models";
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

    const assetIds = _.map(data.dtos, asset => asset.codeAsset);

    const assets = await this.assetRepository.filter({
      id: {
        in: [...assetIds]
      }
    });

    if (_.size(assets) === 0)
      return left(new handlePurchasedAssetError("Nenhum ativo encontrado"));

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

        const totalWithFees = purchasedAsset.calculateTotalWithFees(
          data.totalAssetsPurchased,
          data.totalFees
        );
        const percentageApportionmentFees =
          purchasedAsset.calculateApportionmentPercentage(
            data.totalAssetsPurchased,
            dto.price
          );

        const averagePrice = purchasedAsset.calculateAveragePrice(
          totalWithFees,
          data.totalAmount
        );

        purchasedAsset.assetId = assetFind.id;
        purchasedAsset.walletId = data.walletId;

        purchasedAsset.totalWithFees = totalWithFees;
        purchasedAsset.percentageApportionmentFees =
          percentageApportionmentFees;
        purchasedAsset.averagePrice = averagePrice;

        purchasedAssets.push(purchasedAsset);
      }
    }

    return right(purchasedAssets);
  }
}
