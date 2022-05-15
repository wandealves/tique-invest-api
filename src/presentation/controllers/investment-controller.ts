import { InvestmentDTO } from "../dtos";
import { ok } from "../helpers";
import { HttpResponse } from "../protocols";

export class InvestmentController {
  constructor() {}

  public async post(request: InvestmentDTO): Promise<HttpResponse> {
    return ok(request);
  }

  public async getAll(): Promise<HttpResponse> {
    return ok({ id: 9, name: "OPA0889" });
  }
}
