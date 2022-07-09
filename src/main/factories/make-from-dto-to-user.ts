import _ from "lodash";

import { User } from "../../domain/models";
import { CreateUserDto } from "../../usecases/dtos";

export const makeFromDtoToUser = (dto: CreateUserDto) => {
  return new User(
    0,
    _.get(dto, "name"),
    _.get(dto, "email"),
    _.get(dto, "cpf"),
    _.get(dto, "password"),
    _.get(dto, "avatarUrl")
  );
};
