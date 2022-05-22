import _ from "lodash";

export class Fees {
  private readonly id: number;
  private readonly name: string;
  private readonly tax: number;
  private readonly investmentId: number;

  constructor(id: number, name: string, tax: number, investmentId: number) {
    this.id = id;
    this.name = name;
    this.tax = tax;
    this.investmentId = investmentId;
  }

  public getTax():number{
    return this.tax;
  }
}
