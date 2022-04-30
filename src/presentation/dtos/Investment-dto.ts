import { BaseDTO } from "./base-dto";

export class InvestmentDTO extends BaseDTO {
  constructor(protected id: number, private name: string) {
    super(id);
  }
}
