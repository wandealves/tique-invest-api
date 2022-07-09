import { AuthDto, AuthResponseDto } from "../../dtos";
import { CreateWalletError } from "../../errors";
import { Either } from "../../../shared";

export interface ILogin {
  execute: (dto: AuthDto) => Promise<Either<CreateWalletError, AuthResponseDto>>;
}
