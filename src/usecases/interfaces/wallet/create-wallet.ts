import { CreateWalletDto, CreateWalletResponseDto } from "../../dtos";
import { HandleError } from "../../../main/errors";
import { Either } from "../../../shared";

export interface ICreateWallet {
  execute: (
    dto: CreateWalletDto
  ) => Promise<Either<HandleError, CreateWalletResponseDto>>;
}
