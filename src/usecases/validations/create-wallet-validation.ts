import _ from "lodash";

import { IUserRepository } from "../interfaces";
import { CreateWalletDto } from "../dtos";
import { IBaseValidation, ValidationProps, strings } from "../../shared";

export class CreateWalletValidation
  implements IBaseValidation<CreateWalletDto>
{
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async execute(dto: CreateWalletDto): Promise<ValidationProps> {
    const messages = [];

    if (!dto)
      return {
        name: "CreateWallet",
        messages: [strings.MSS05.message],
        status: 400,
        hasError: true
      };

    if (!dto.name) messages.push(strings.MSS03);
    if (!dto.currencyCode) messages.push(strings.MSS15);
    if (!dto.user) messages.push(strings.MSS16);
    if (!dto.user.id) messages.push(strings.MSS16);

    const assetsDto = _.get(dto, "assets", []);
    if (_.size(assetsDto) === 0) messages.push(strings.MSS13);

    const exists = await this._userRepository.exists({
      id: { equals: dto.user.id }
    });

    if (!exists) messages.push(strings.MSS07.message);

    const hasError = _.size(messages) > 0 ? true : false;

    return {
      name: "CreateWallet",
      messages,
      status: hasError ? 400 : 200,
      hasError
    };
  }
}
