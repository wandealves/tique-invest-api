import { CreateInvestmentDto } from "./dtos";
import { Investment as InvestmentModel } from "../domain/models";
import { TypeAsset } from "../domain/models/enums/type-asset";

export const createInvestmentDtoToInvestmentModel = (dto: CreateInvestmentDto) => {
  return new InvestmentModel(
    dto.id,
    stringToTypeAsset(dto.type.toString()),
    dto.countryId,
    dto.userId
  );
};


export const stringToTypeAsset = (value: string): TypeAsset => {
  const key = value as keyof typeof TypeAsset;
  return TypeAsset[key];
};
