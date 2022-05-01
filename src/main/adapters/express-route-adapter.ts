import { Request, Response } from "express";

import { HttpResponse } from "@/presentation/protocols";
import { BaseDTO, InvestmentDTO } from "@/presentation/dtos";

export const adaptRoute = (
  handle: (data?: any) => Promise<HttpResponse>
) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {})
    };

    const httpResponse = await handle(request);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      });
    }
  };
};
