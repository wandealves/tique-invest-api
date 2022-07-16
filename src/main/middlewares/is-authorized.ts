import { Request, Response, NextFunction } from "express";

import { JwtAdapter } from "../../infra";
import { strings } from "../../shared/constants/strings";

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];

  if (!authorization)
    return res.status(401).json({ auth: false, message: strings.MSS11 });

  const [_, token] = authorization.split(" ");

  const data = new JwtAdapter().verify(token);

  if (data.isLeft()) {
    return res
      .status(data.value.status)
      .json({ auth: false, message: data.value.messages });
  }

  req.body.user = {
    id: data.value.id,
    email: data.value.email
  };

  next();
};
