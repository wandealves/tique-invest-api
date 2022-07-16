import { Either, left, right } from "../../shared";
import { HandleError } from "../../main/errors";

export interface JwtProps {
  id: number;
  email: string;
}

export interface VerifyResponseProps {
  id: number;
  email: string;
  exp: number;
}

export interface IJwt {
  sign(props: JwtProps): Promise<string>;
  verify(token: string): Either<HandleError, VerifyResponseProps>;
}
