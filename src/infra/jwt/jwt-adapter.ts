import jwt from "jsonwebtoken";

import { IJwt, JwtProps } from "../../usecases/interfaces";

export class JwtAdapter implements IJwt {
  constructor() {}

  async jwt(props: JwtProps): Promise<string> {
    const token = jwt.sign(props, String(process.env.JWT_SECRET), {
      expiresIn: Number(process.env.JWT_EXPIRESIN) // segundos
    });

    return token;
  }
}
