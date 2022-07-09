import { inject, injectable } from "tsyringe";
import _ from "lodash";

import { ILogin } from "../interfaces";
import {
  IWalletRepository,
  IAssetRepository
} from "../interfaces/repositories";
import { AuthDto, AuthResponseDto } from "../dtos";
import { CreateWalletError } from "../errors";
import { Either, left, right } from "../../shared";

@injectable()
export class Login implements ILogin {
  private readonly walletRepository: IWalletRepository;
  private readonly assetRepository: IAssetRepository;

  constructor(
    @inject("IWalletRepository")
    walletRepository: IWalletRepository,
    @inject("IAssetRepository")
    assetRepository: IAssetRepository
  ) {
    this.walletRepository = walletRepository;
    this.assetRepository = assetRepository;
  }

  async execute(
    dto: AuthDto
  ): Promise<Either<CreateWalletError, AuthResponseDto>> {
    const assetsDto = _.get(dto, "assets", []);

    if (_.size(assetsDto) === 0)
      return left(new CreateWalletError("Nenhum ativo encontrado"));

    return right({
      token: ""
    });
  }
}
