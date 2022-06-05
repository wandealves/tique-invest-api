import _ from "lodash";

import { HandlePurchasedAsset } from "../purchased-asset/handle-purchased-asset";
import { ICreateWallet } from "../interfaces";
import {
  IWalletRepository,
  IAssetRepository
} from "../interfaces/repositories";
import { CreateWalletDto, CreateWalletResponseDto } from "../dtos";
import { Wallet, Fees } from "../../domain/models";
import { makePurchasedAssets, makeFees } from "../../main/factories";
import { CreateWalletError } from "../errors";
import { Either, left, right } from "../../shared";
import { stringToCurrencyCode } from "../../shared/utils";

export class CreateWallet implements ICreateWallet {
  private readonly walletRepository: IWalletRepository;
  private readonly assetRepository: IAssetRepository;

  constructor(
    walletRepository: IWalletRepository,
    assetRepository: IAssetRepository
  ) {
    this.walletRepository = walletRepository;
    this.assetRepository = assetRepository;
  }

  async execute(
    dto: CreateWalletDto
  ): Promise<Either<CreateWalletError, CreateWalletResponseDto>> {
    const createPurchasedAssets = _.get(dto, "createPurchasedAssets", []);

    if (_.size(createPurchasedAssets) === 0)
      return left(new CreateWalletError("Nenhum ativo encontrado"));

    const fees: Fees[] = makeFees(dto.fees);
    const newPurchasedAssets = makePurchasedAssets(dto.createPurchasedAssets);

    const wallet = new Wallet(
      0,
      dto.name,
      stringToCurrencyCode(dto.currencyCode),
      dto.userId
    );

    const total = wallet.calculateTotal(newPurchasedAssets);
    const totalFees = wallet.calculateTotalFees(fees);
    const totalAmount = wallet.calculateTotalAmount(newPurchasedAssets);

    wallet.total = total;
    wallet.totalFees = totalFees;

    const handlePurchasedAsset = new HandlePurchasedAsset(this.assetRepository);
    const purchasedAssets = await handlePurchasedAsset.execute({
      walletId: 0,
      totalAssetsPurchased: total,
      totalAmount: totalAmount,
      totalFees: totalFees,
      dtos: createPurchasedAssets
    });

    if (purchasedAssets.isLeft())
      return left(new CreateWalletError(purchasedAssets.value.message));

    const result = await this.walletRepository.create(wallet);

    return right({
      id: 0,
      name: "",
      currencyCode: "",
      userId: 0
    });
  }
}
