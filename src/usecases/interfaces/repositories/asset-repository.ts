import { Asset } from "../../../domain/models";

export interface IAssetRepository {
  create(entity: Asset): Promise<number>;
  update(id: number, entity: Asset): Promise<number>;
  delete(id: number): Promise<void>;

  all: () => Promise<Asset[] | null>;
  filter: (query: any) => Promise<Asset[] | null>;
  findOne: (id: number) => Promise<Asset | null>;
  findCode: (code: string) => Promise<Asset | null>;
  find: (query: any) => Promise<Asset | null>;
}
