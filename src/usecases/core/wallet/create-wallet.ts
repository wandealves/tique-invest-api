import { inject, injectable } from "tsyringe";
import _ from "lodash";

import { CalculatePurchasedAssets } from "../calculate/calculate-purchased-assets";
import { ICreateWallet } from "../../interfaces";
import {
  IWalletRepository,
  IAssetRepository,
  IUserRepository
} from "../../interfaces/repositories";
import { CreateWalletDto, CreateWalletResponseDto } from "../../dtos";
import { Wallet, Fees } from "../../../domain/models";
import { makePurchasedAssets, makeFees } from "../../../main/factories";
import { HandleError } from "../../../main/errors";
import { Either, left, right } from "../../../shared";
import { strings } from "../../../shared/constants/strings";
import {
  stringToCurrencyCode,
  currencyCodeToString
} from "../../../shared/utils";
import { CreateWalletValidation } from "../../validations";

@injectable()
export class CreateWallet implements ICreateWallet {
  private readonly walletRepository: IWalletRepository;
  private readonly assetRepository: IAssetRepository;
  private readonly _userRepository: IUserRepository;

  constructor(
    @inject("IWalletRepository")
    walletRepository: IWalletRepository,
    @inject("IAssetRepository")
    assetRepository: IAssetRepository,
    @inject("IUserRepository")
    userRepository: IUserRepository
  ) {
    this.walletRepository = walletRepository;
    this.assetRepository = assetRepository;
    this._userRepository = userRepository;
  }

  async execute(
    dto: CreateWalletDto
  ): Promise<Either<HandleError, CreateWalletResponseDto>> {
    const validation = await new CreateWalletValidation(
      this._userRepository
    ).execute(dto);
    if (validation.hasError)
      return left(
        new HandleError(validation.name, validation.messages, validation.status)
      );

    const fees: Fees[] = makeFees(_.get(dto, "fees", []));
    const purchasedAssets = makePurchasedAssets(dto.assets);

    const wallet = new Wallet(
      0,
      dto.name,
      stringToCurrencyCode(dto.currencyCode),
      dto.user.id
    );

    wallet.totalFees = wallet.calculateTotalFees(fees);
    wallet.total = wallet.calculateTotalAssets(purchasedAssets);
    const unifyTickets = wallet.unifyAssets(purchasedAssets);

    const calculatePurchasedAssets = new CalculatePurchasedAssets(
      this.assetRepository
    );
    const calculatePurchasedAssetsResult =
      await calculatePurchasedAssets.execute(
        unifyTickets,
        wallet.total,
        wallet.totalFees
      );

    const result = await this.walletRepository.create(
      wallet,
      calculatePurchasedAssetsResult.isRight()
        ? calculatePurchasedAssetsResult.value
        : []
    );

    if (!result) new HandleError("CreateWallet", [strings.MSS14], 400);

    return right({
      id: result,
      name: wallet.name,
      currencyCode: currencyCodeToString(wallet.currencyCode),
      userId: wallet.userId
    });
  }
}
