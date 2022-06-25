export interface CreateTicketPurchasedDto {
  ticketCode: string;
  price: number;
  quantity: number;
  date: Date;
  brokerName: string;
  transactionType: string;
  currencyCode: string;
}
