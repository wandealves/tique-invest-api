import { CreateUserDto, CreateUserResponseDto } from "../../dtos";
import { CreateWalletError } from "../../errors";
import { Either, left } from "../../../shared";

export interface ICreateUser {
  execute: (
    dto: CreateUserDto
  ) => Promise<Either<CreateWalletError, CreateUserResponseDto>>;
}
