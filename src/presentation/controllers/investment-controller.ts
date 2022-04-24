import { Request, Response } from "express";
import { Controller, Get } from "@overnightjs/core";

@Controller("investments")
export class InvestmentController {
  constructor() {}

  @Get("")
  public async getAll(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }
}
