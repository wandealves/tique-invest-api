import { container } from "tsyringe";

import { CreateUserDto } from "../../usecases/dtos";
import { CreateUser } from "../../usecases";

import { ok, badRequest } from "../helpers";
import { HttpResponse } from "../protocols";

export class UserController {
  constructor() {}

  public async post(request: CreateUserDto): Promise<HttpResponse> {
    const usecase = container.resolve(CreateUser);
    const result = await usecase.execute(request);
    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result);
  }
}
