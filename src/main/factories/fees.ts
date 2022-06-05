import _ from "lodash";

import { Fees } from "../../domain/models";
import { CreateFeesDto } from "../../usecases/dtos";

export const makeFees = (dtos: CreateFeesDto[]): Fees[] => {
  return _.map(dtos, dto => new Fees(dto.name, dto.tax));
};
