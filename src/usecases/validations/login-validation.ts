import _ from "lodash";

import { AuthDto } from "../dtos";
import { IBaseValidation, ValidationProps, strings } from "../../shared";

export class LoginValidation implements IBaseValidation<AuthDto> {
  constructor() {}

  async execute(dto: AuthDto): Promise<ValidationProps> {
    const messages = [];

    if (!dto)
      return {
        name: "CreateUser",
        messages: [strings["MSS05"].message],
        status: 400,
        hasError: true
      };

    if (!dto.login) messages.push(strings["MSS02"].message);
    if (!dto.password) messages.push(strings["MSS04"].message);

    const hasError = _.size(messages) > 0 ? true : false;

    return {
      name: "Login",
      messages,
      status: hasError ? 400 : 200,
      hasError
    };
  }
}
