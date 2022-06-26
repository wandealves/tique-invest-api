import _ from "lodash";

import { ITransformTickets } from "../interfaces";
import { TicketPurchased, Ticket } from "../../domain/models";
import { ITicketRepository } from "../interfaces/repositories";
import { handlePurchasedAssetError } from "../errors";
import { Either, left, right } from "../../shared";

export class TransformTickets implements ITransformTickets {
  private readonly ticketRepository: ITicketRepository;

  constructor(ticketRepository: ITicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async execute(
    ticketsPurchased: TicketPurchased[]
  ): Promise<Either<handlePurchasedAssetError, TicketPurchased[]>> {
    if (!ticketsPurchased)
      return left(new handlePurchasedAssetError("Nenhum ticket encontrado"));

    const codes = _.map(ticketsPurchased, asset => asset.ticketCode);
    const tickets = await this.ticketRepository.filter({
      code: {
        in: [...codes]
      }
    });

    if (_.size(tickets) === 0)
      return left(new handlePurchasedAssetError("Nenhum ticket encontrado"));

    return right(this.transform(ticketsPurchased, tickets));
  }

  transform(ticketsPurchased: TicketPurchased[], tickets: Ticket[] | null) {
    const items: TicketPurchased[] = [];

    for (const ticket of ticketsPurchased) {
      const ticketFind = _.find(
        tickets,
        asset => asset.code === ticket.ticketCode
      );

      if (ticketFind) {
        ticket.ticketId = ticketFind.id;
        items.push(ticket);
      }
    }

    return items;
  }
}
