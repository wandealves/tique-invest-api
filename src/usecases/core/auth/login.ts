import { inject, injectable } from "tsyringe";
import _ from "lodash";

import { ILogin } from "../../interfaces";
import { IUserRepository } from "../../interfaces/repositories";
import { AuthDto, AuthResponseDto } from "../../dtos";
import { JwtAdapter } from "../../../infra";
import { LoginValidation } from "../../validations";
import { HandleError } from "../../../main/errors";
import { strings } from "../../../shared";
import { BcryptAdapter } from "../../../infra";
import { Either, left, right } from "../../../shared";

@injectable()
export class Login implements ILogin {
  private readonly _userRepository: IUserRepository;

  constructor(
    @inject("IUserRepository")
    userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  async execute(dto: AuthDto): Promise<Either<HandleError, AuthResponseDto>> {
    const validation = await new LoginValidation().execute(dto);

    if (validation.hasError)
      return left(
        new HandleError(validation.name, validation.messages, validation.status)
      );

    const user = await this._userRepository.find({
      email: {
        equals: dto.login
      }
    });

    if (!user)
      return left(new HandleError("Login", [strings["MSS07"].message], 400));

    const comparePassword = await new BcryptAdapter().comparePassword(
      dto.password,
      user.password
    );
    if (!comparePassword)
      return left(new HandleError("Login", [strings["MSS08"].message], 400));

    const token = await new JwtAdapter().jwt({
      id: user.id,
      email: user.email
    });

    return right({
      email: user.email,
      token
    });
  }
}
