import { CreateInvestmentDto } from "../../../../shared/dtos";

export interface ICreateInvestment {
  create: (dto: CreateInvestmentDto) => Promise<number>;
}
