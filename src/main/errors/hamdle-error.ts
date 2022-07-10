import { BaseError } from "./base-error";

import { strings } from "../../shared";

export class HandleError implements BaseError {
  constructor(
    public name: string = strings["ERR01"].label,
    public messages: string[] = [],
    public status: number = 500
  ) {}
}
