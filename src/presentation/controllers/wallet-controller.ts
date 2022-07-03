import { container } from "tsyringe";

import { CreateWalletDto } from "../../usecases/dtos";
import { CreateWallet } from "../../usecases";

import { ok, badRequest } from "../helpers";
import { HttpResponse } from "../protocols";

export class WalletController {
  constructor() {}

  public async post(request: CreateWalletDto): Promise<HttpResponse> {
    const createWallet = container.resolve(CreateWallet);
    const result = await createWallet.execute(request);
    if (result.isLeft()) {
      return badRequest([result.value.message]);
    }

    return ok(result);
  }

  public async getAll(): Promise<HttpResponse> {
    return ok({ id: 9, name: "OPA0889" });
  }
}
