import { Request, Response } from "express";
import _ from "lodash";

import { HttpResponse } from "@/presentation/protocols";

export const adaptRoute = (handle: (data?: any) => Promise<HttpResponse>) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {})
    };

    const params = _.get(req, "params");

    let httpResponse: HttpResponse = {
      statusCode: 200,
      body: {},
      message: "",
      stack: ""
    };

    if (!_.isEmpty(params)) {
      httpResponse = await handle(params);
    } else {
      httpResponse = await handle(request);
    }

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      });
    }
  };
};
