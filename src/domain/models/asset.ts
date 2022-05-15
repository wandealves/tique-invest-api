import { TypeAsset } from "./enums/type-asset";

export class Asset {
  private readonly id: number;
  private readonly name: string;
  private readonly code: string;
  private readonly iconUrl: string;
  private readonly type: TypeAsset;

  constructor(
    id: number,
    name: string,
    code: string,
    iconUrl: string,
    type: TypeAsset
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.iconUrl = iconUrl;
    this.type = type;
  }
}
