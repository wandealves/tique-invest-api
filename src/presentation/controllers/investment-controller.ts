import { Request, Response } from "express";

import { ok } from "@/presentation/helpers";
import { InvestmentDTO } from "@/presentation/dtos";
import { makeInvestmentDTO } from "@/main/factories";

export class InvestmentController {
  constructor() {}

  public async post(request: Request, response: Response): Promise<Response> {
    return ok(response, makeInvestmentDTO(request.body));
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    return ok(response, makeInvestmentDTO({ id: 9, name: "OPA009" }));
  }
}
