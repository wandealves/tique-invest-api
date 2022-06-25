import { CreateTicketPurchasedDto } from "./create-ticket-purchased-dto";
import { CreateFeesDto } from "./create-fees-dto";

export interface CreateWalletDto {
  name: string;
  currencyCode: string;
  userId: number;

  tickets: CreateTicketPurchasedDto[];
  fees: CreateFeesDto[];
}
