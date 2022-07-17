import { container } from "tsyringe";
import _ from "lodash";

import { CreateWalletDto, ParamsDto } from "../../usecases/dtos";
import { CreateWallet, ShowWallet, AllWallet } from "../../usecases";

import { ok, badRequest } from "../helpers";
import { HttpResponse } from "../protocols";

export class WalletController {
  constructor() {}

  public async post(request: CreateWalletDto): Promise<HttpResponse> {
    const createWallet = container.resolve(CreateWallet);
    const result = await createWallet.execute(request);
    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result);
  }

  public async get(params: ParamsDto): Promise<HttpResponse> {
    const showWallet = container.resolve(ShowWallet);
    const result = await showWallet.execute(_.toNumber(params.id));
    return ok(result.value);
  }

  public async all(): Promise<HttpResponse> {
    const allWallet = container.resolve(AllWallet);
    const result = await allWallet.execute();
    return ok(result.value);
  }
}
