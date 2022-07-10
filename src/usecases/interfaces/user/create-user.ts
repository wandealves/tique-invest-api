import { CreateUserDto, CreateUserResponseDto } from "../../dtos";
import { BaseError } from "../../../main/errors";
import { Either, left } from "../../../shared";

export interface ICreateUser {
  execute: (
    dto: CreateUserDto
  ) => Promise<Either<BaseError, CreateUserResponseDto>>;
}
