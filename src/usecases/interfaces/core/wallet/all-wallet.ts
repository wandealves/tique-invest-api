import { WalletShowResponseDto } from "../../../dtos";
import { HandleError } from "../../../../main/errors";
import { Either } from "../../../../shared";

export interface IAllWallet {
  execute: () => Promise<Either<HandleError, WalletShowResponseDto[] | null>>;
}
