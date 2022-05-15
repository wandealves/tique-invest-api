import { Entity } from "./entity";

export class Country extends Entity {
  private readonly name: string;

  constructor(id: number, name: string) {
    super(id);
    this.name = name;
  }
}
