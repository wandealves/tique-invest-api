import jwt from "jsonwebtoken";
import _ from "lodash";

import { IJwt, JwtProps, VerifyResponseProps } from "../../usecases/interfaces";
import { Either, left, right, strings } from "../../shared";
import { tokenError } from "../../shared/utils";
import { HandleError } from "../../main/errors";

export class JwtAdapter implements IJwt {
  constructor() {}

  async sign(props: JwtProps): Promise<string> {
    const token = jwt.sign(props, String(process.env.JWT_SECRET), {
      expiresIn: `${Number(process.env.JWT_EXPIRESIN)}s` // segundos
    });

    return token;
  }

  verify(token: string): Either<HandleError, VerifyResponseProps> {
    if (!token)
      return left(new HandleError("verify", [strings.MSS10.message], 401));

    try {
      const result = jwt.verify(token, String(process.env.JWT_SECRET));

      if (!result)
        return left(new HandleError("verify", [strings.MSS10.message], 401));

      return right({
        id: _.get(result, "id", 0),
        email: _.get(result, "email"),
        exp: _.get(result, "exp", 0)
      });
    } catch (error) {
      const message = tokenError(_.get(error, "message"));
      return left(new HandleError("verify", [message], 401));
    }
  }
}
