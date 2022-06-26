import { Ticket, Wallet, TicketPurchased } from "../../../src/domain/models";
import { TypeTicket } from "../../../src/domain/models/enums";
import {
  IWalletRepository,
  ITicketRepository
} from "../../usecases/interfaces/repositories";

export class WalletRepositorySpy implements IWalletRepository {
  create(entity: Wallet, purchasedAssets: TicketPurchased[]): Promise<number> {
    return Promise.resolve(1);
  }
  update(id: number, entity: Wallet): Promise<number> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  all(): Promise<Wallet[] | null> {
    throw new Error("Method not implemented.");
  }
  filter(query: any): Promise<Wallet[] | null> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<Wallet | null> {
    throw new Error("Method not implemented.");
  }
  find(query: any): Promise<Wallet | null> {
    throw new Error("Method not implemented.");
  }
}

export class AssetRepositorySpy implements ITicketRepository {
  create(entity: Ticket): Promise<number> {
    throw new Error("Method not implemented.");
  }
  update(id: number, entity: Ticket): Promise<number> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  all(): Promise<Ticket[] | null> {
    throw new Error("Method not implemented.");
  }
  filter(query: any): Promise<Ticket[] | null> {
    return Promise.resolve([
      new Ticket(1, "AALR3", "AALR3", "", TypeTicket.ACAO),
      new Ticket(2, "ABEV3", "ABEV3", "", TypeTicket.ACAO),
      new Ticket(3, "AGRO3", "AGRO3", "", TypeTicket.ACAO),
      new Ticket(4, "ALUP11", "ALUP11", "", TypeTicket.ACAO)
    ]);
  }
  findOne(id: number): Promise<Ticket | null> {
    throw new Error("Method not implemented.");
  }
  findCode(code: string): Promise<Ticket | null> {
    throw new Error("Method not implemented.");
  }
  find(query: any): Promise<Ticket | null> {
    throw new Error("Method not implemented.");
  }
}
