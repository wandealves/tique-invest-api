import { TicketPurchased } from "../../../domain/models";
import { CreateWalletError } from "../../errors";
import { Either, left } from "../../../shared";

export interface ITransformTickets {
  execute: (
    ticketsPurchased: TicketPurchased[]
  ) => Promise<Either<CreateWalletError, TicketPurchased[]>>;
}
