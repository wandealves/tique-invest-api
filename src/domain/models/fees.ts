export class Fees {
  private readonly _name: string;
  private readonly _tax: number;

  constructor(name: string, tax: number) {
    this._name = name;
    this._tax = tax;
  }

  get tax(): number {
    return this._tax;
  }
}
