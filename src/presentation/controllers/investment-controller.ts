import { Request, Response } from "express";
import { Controller, Get, Post } from "@overnightjs/core";

import { ok } from "@/presentation/helpers";
import { InvestmentDTO } from "@/presentation/dtos";
import { makeInvestmentDTO } from "@/main/factories";

@Controller("investments")
export class InvestmentController {
  constructor() {}

  @Post("")
  public async post(request: Request, response: Response): Promise<Response> {
    return ok(response, makeInvestmentDTO(request.body));
  }

  //@Get("")
  //public async getAll(request: Request, response: Response): Promise<Response> {
  // return ok(response, { ok: true });
  //}
}
