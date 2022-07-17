import { inject, injectable } from "tsyringe";
import _ from "lodash";

import { ICreateUser } from "../../interfaces";
import { IUserRepository } from "../../interfaces/repositories";
import { CreateUserDto, CreateUserResponseDto } from "../../dtos";
import { makeCreateUser } from "../../../main/factories";
import { HandleError } from "../../../main/errors";
import { CreateUserValidation } from "../../validations";
import { Either, left, right } from "../../../shared";

@injectable()
export class CreateUser implements ICreateUser {
  private readonly _userRepository: IUserRepository;

  constructor(
    @inject("IUserRepository")
    userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  async execute(
    dto: CreateUserDto
  ): Promise<Either<HandleError, CreateUserResponseDto>> {
    const validation = await new CreateUserValidation(
      this._userRepository
    ).execute(dto);
    if (validation.hasError)
      return left(
        new HandleError(validation.name, validation.messages, validation.status)
      );

    const userId = await this._userRepository.create(makeCreateUser(dto));

    return right({
      id: userId
    });
  }
}
