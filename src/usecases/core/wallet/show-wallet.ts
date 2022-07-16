import { inject, injectable } from "tsyringe";
import _ from "lodash";

import { IShowWallet } from "../../interfaces";
import { IWalletRepository } from "../../interfaces/repositories";
import { WalletShowResponseDto } from "../../dtos";
import { makeWalletShowToResponseDto } from "../../../main/factories";
import { HandleError } from "../../../main/errors";
import { Either, left, right } from "../../../shared";

@injectable()
export class ShowWallet implements IShowWallet {
  private readonly walletRepository: IWalletRepository;

  constructor(
    @inject("IWalletRepository")
    walletRepository: IWalletRepository
  ) {
    this.walletRepository = walletRepository;
  }

  async execute(
    id: number
  ): Promise<Either<HandleError, WalletShowResponseDto | null>> {
    const wallet = await this.walletRepository.findOne(id);

    if (wallet) return right(makeWalletShowToResponseDto(wallet));

    return right(null);
  }
}
