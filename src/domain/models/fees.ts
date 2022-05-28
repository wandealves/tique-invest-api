import _ from "lodash";

export class Fees {
  private id: number;
  private name: string;
  private tax: number;
  private investmentId: number;

  constructor(id: number, name: string, tax: number, investmentId: number) {
    this.id = id;
    this.name = name;
    this.tax = tax;
    this.investmentId = investmentId;
  }

  // get getName(): string {
  // return this.name;
  // }
  //set setName(name: string) {
  //this.name = name;
  //}

  get getTax(): number {
    return this.tax;
  }
  // set setTax(tax: number) {
  // this.tax = tax;
  //}
}
