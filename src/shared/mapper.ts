import { CreateInvestmentDto } from "./dtos";
import { Investment, Country, User } from "../domain/models";
import { TypeAsset } from "../domain/models/enums/type-asset";

export const createInvestmentDtoToInvestmentModel = (
  dto: CreateInvestmentDto
) => {
  return new Investment(
    dto.id,
    0,
    0,
    stringToTypeAsset(dto.type.toString()),
    new Country(dto.countryId, ""),
    new User(dto.userId, "", "", "", "")
  );
};

export const stringToTypeAsset = (value: string): TypeAsset => {
  const key = value as keyof typeof TypeAsset;
  return TypeAsset[key];
};
