import { inject, injectable } from "tsyringe";
import _ from "lodash";

import { ICreateUser } from "../interfaces";
import { IUserRepository } from "../interfaces/repositories";
import { CreateUserDto, CreateUserResponseDto } from "../dtos";
import { makeFromDtoToUser } from "../../main/factories";
import { CreateWalletError } from "../errors";
import { Either, left, right } from "../../shared";

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
  ): Promise<Either<CreateWalletError, CreateUserResponseDto>> {
    if (!dto)
      return left(new CreateWalletError("Dados do usuário são obrigatórios."));

    const userId = await this._userRepository.create(makeFromDtoToUser(dto));

    return right({
      id: userId
    });
  }
}
