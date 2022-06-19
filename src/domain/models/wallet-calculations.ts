import _ from "lodash";

import { TicketPurchased } from "./ticket-purchased";
import { Fees } from "./fees";

export class WalletCalculations {
  /**
   * Calcular o total de tickets comprados
   *
   * @param ticketsPurchased: Lista de tickets
   *
   * @returns number
   */
  public calculateTotalTickets(ticketsPurchased: TicketPurchased[]): number {
    const total = _.reduce(
      ticketsPurchased,
      function (sum, item) {
        return sum + item.total;
      },
      0
    );

    return total;
  }

  /**
   * Calcular o total de taxas
   *
   * @param ticketsPurchased: Lista de taxas
   *
   * @returns number
   */
  public calculateTotalFees(fees: Fees[]): number {
    const total = _.reduce(
      fees,
      function (sum, item) {
        return sum + item.tax;
      },
      0
    );

    return _.toNumber(total.toFixed(2));
  }
}
