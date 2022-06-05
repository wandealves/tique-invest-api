import { CreateWalletDto, CreateWalletResponseDto } from "../../dtos";
import { CreateWalletError } from "../../errors";
import { Either, left } from "../../../shared";

export interface ICreateWallet {
  execute: (
    dto: CreateWalletDto
  ) => Promise<Either<CreateWalletError, CreateWalletResponseDto>>;
}
