import { WalletShowResponseDto } from "../../dtos";
import { HandleError } from "../../../main/errors";
import { Either } from "../../../shared";

export interface IShowWallet {
  execute: (id: number) => Promise<Either<HandleError, WalletShowResponseDto | null>>;
}
