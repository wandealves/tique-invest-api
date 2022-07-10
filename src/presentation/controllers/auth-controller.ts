import { container } from "tsyringe";

import { AuthDto } from "../../usecases/dtos";
import { Login } from "../../usecases";

import { ok, badRequest } from "../helpers";
import { HttpResponse } from "../protocols";

export class AuthController {
  constructor() {}

  public async post(request: AuthDto): Promise<HttpResponse> {
    const login = container.resolve(Login);
    const result = await login.execute(request);
    if (result.isLeft()) {
     // return badRequest(result.value);
    }

    return ok(result);
  }
}
