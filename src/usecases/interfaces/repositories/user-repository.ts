import { User } from "../../../domain/models";

export interface IUserRepository {
  create(entity: User): Promise<number>;
  update(id: number, entity: User): Promise<number>;
  delete(id: number): Promise<void>;

  all(): Promise<User[] | null>;
  filter(query: any): Promise<User[] | null>;
  findOne(id: number): Promise<User | null>;
  find(query: any): Promise<User | null>;
}
