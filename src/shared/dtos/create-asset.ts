import { TypeAsset } from "../../domain/models/enums/type-asset";

export interface CreateAssetDto {
  name: string;
  code: string;
  iconUrl: string;
}
