import _ from "lodash";

import { IUserRepository } from "../interfaces";
import { CreateUserDto } from "../dtos";
import { IBaseValidation, ValidationProps, strings } from "../../shared";

export class CreateUserValidation implements IBaseValidation<CreateUserDto> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async execute(dto: CreateUserDto): Promise<ValidationProps> {
    const messages = [];

    if (!dto)
      return {
        name: "CreateUser",
        messages: [strings["MSS05"].message],
        status: 400,
        hasError: true
      };

    if (!dto.cpf) messages.push(strings["MSS01"].message);
    if (!dto.email) messages.push(strings["MSS02"].message);
    if (!dto.name) messages.push(strings["MSS03"].message);
    if (!dto.password) messages.push(strings["MSS04"].message);

    const exists = await this._userRepository.exists({
      OR: [{ email: { equals: dto.email } }, { cpf: { equals: dto.cpf } }]
    });

    if (exists) messages.push(strings["MSS06"].message);

    const hasError = _.size(messages) > 0 ? true : false;

    return {
      name: "CreateUser",
      messages,
      status: hasError ? 400 : 200,
      hasError
    };
  }
}
