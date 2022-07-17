import { inject, injectable } from "tsyringe";
import _ from "lodash";

import { IAllWallet } from "../../interfaces";
import { IWalletRepository } from "../../interfaces/repositories";
import { WalletShowResponseDto } from "../../dtos";
import { makeAllWalletResponse } from "../../../main/factories";
import { HandleError } from "../../../main/errors";
import { Either, left, right } from "../../../shared";

@injectable()
export class AllWallet implements IAllWallet {
  private readonly walletRepository: IWalletRepository;

  constructor(
    @inject("IWalletRepository")
    walletRepository: IWalletRepository
  ) {
    this.walletRepository = walletRepository;
  }

  async execute(): Promise<
    Either<HandleError, WalletShowResponseDto[] | null>
  > {
    const wallets = await this.walletRepository.all();

    if (wallets && _.size(wallets) > 0)
      return right(makeAllWalletResponse(wallets));

    return right(null);
  }
}
