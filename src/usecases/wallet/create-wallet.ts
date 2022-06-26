import { inject, injectable } from "tsyringe";
import _ from "lodash";

import { TransformTickets } from "../transform-tickets/transform-tickets";
import { ICreateWallet } from "../interfaces";
import {
  IWalletRepository,
  ITicketRepository
} from "../interfaces/repositories";
import { CreateWalletDto, CreateWalletResponseDto } from "../dtos";
import { Wallet, Fees } from "../../domain/models";
import { makeTicketsPurchased, makeFees } from "../../main/factories";
import { CreateWalletError } from "../errors";
import { Either, left, right } from "../../shared";
import { stringToCurrencyCode, currencyCodeToString } from "../../shared/utils";

@injectable()
export class CreateWallet implements ICreateWallet {
  private readonly walletRepository: IWalletRepository;
  private readonly ticketRepository: ITicketRepository;

  constructor(
    @inject("IWalletRepository")
    walletRepository: IWalletRepository,
    @inject("IAssetRepository")
    ticketRepository: ITicketRepository
  ) {
    this.walletRepository = walletRepository;
    this.ticketRepository = ticketRepository;
  }

  async execute(
    dto: CreateWalletDto
  ): Promise<Either<CreateWalletError, CreateWalletResponseDto>> {
    const tickets = _.get(dto, "tickets", []);
    if (_.size(tickets) === 0)
      return left(new CreateWalletError("Nenhum ticket encontrado"));

    const fees: Fees[] = makeFees(dto.fees);
    const ticketsPurchased = makeTicketsPurchased(dto.tickets);

    const wallet = new Wallet(
      0,
      dto.name,
      stringToCurrencyCode(dto.currencyCode),
      dto.userId
    );

    const unifyTickets = wallet.unifyTickets(ticketsPurchased);

    const transformTickets = new TransformTickets(this.ticketRepository);
    const transformTicketsResult = await transformTickets.execute(unifyTickets);
    if (transformTicketsResult.isLeft())
      return left(new CreateWalletError(transformTicketsResult.value.message));

    const result = await this.walletRepository.create(
      wallet,
      transformTicketsResult.value
    );

    return right({
      id: result,
      name: wallet.name,
      currencyCode: currencyCodeToString(wallet.currencyCode),
      userId: wallet.userId
    });
  }
}
