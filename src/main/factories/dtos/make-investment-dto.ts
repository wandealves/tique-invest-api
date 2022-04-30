import { InvestmentDTO } from "@/presentation/dtos";

export const makeInvestmentDTO = ({
  id,
  name
}: {
  id: number;
  name: string;
}): InvestmentDTO => {
  const investmentDTO = new InvestmentDTO(id, name);
  return investmentDTO;
};
