import { TypeAsset } from "./enums";

export class Asset {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _code: string;
  private readonly _iconUrl: string;
  private readonly _typeAsset: TypeAsset;

  constructor(
    id: number,
    name: string,
    code: string,
    iconUrl: string,
    typeAsset: TypeAsset
  ) {
    this._id = id;
    this._name = name;
    this._code = code;
    this._iconUrl = iconUrl;
    this._typeAsset = typeAsset;
  }
}
