import { AuthDto, AuthResponseDto } from "../../dtos";
import { HandleError } from "../../../main/errors";
import { Either } from "../../../shared";

export interface ILogin {
  execute: (dto: AuthDto) => Promise<Either<HandleError, AuthResponseDto>>;
}
