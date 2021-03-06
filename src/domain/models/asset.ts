import { AssetType } from "./enums";

export class Asset {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _code: string;
  private readonly _iconUrl: string;
  private readonly _assetType: AssetType;

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

  get iconUrl(): string {
    return this._iconUrl;
  }

  get assetType(): AssetType {
    return this._assetType;
  }

  constructor(
    id: number,
    name: string,
    code: string,
    iconUrl: string,
    assetType: AssetType
  ) {
    this._id = id;
    this._name = name;
    this._code = code;
    this._iconUrl = iconUrl;
    this._assetType = assetType;
  }
}
