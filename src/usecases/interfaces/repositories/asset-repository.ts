import { Ticket } from "../../../domain/models";

export interface IAssetRepository {
  create(entity: Ticket): Promise<number>;
  update(id: number, entity: Ticket): Promise<number>;
  delete(id: number): Promise<void>;

  all: () => Promise<Ticket[] | null>;
  filter: (query: any) => Promise<Ticket[] | null>;
  findOne: (id: number) => Promise<Ticket | null>;
  findCode: (code: string) => Promise<Ticket | null>;
  find: (query: any) => Promise<Ticket | null>;
}
