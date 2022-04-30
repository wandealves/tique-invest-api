import { Response } from "express";

import { BaseDTO } from "@/presentation/dtos";
import { Error } from "@/presentation/errors";

export const badRequest = (resp: Response, message = "Not Found"): Response =>
  resp.status(404).send(new Error(message, 404));

export const unauthorized = (
  resp: Response,
  message = "Unauthorized"
): Response => resp.status(401).send(new Error(message, 401));

export const forbidden = (resp: Response, message = "Forbidden"): Response =>
  resp.status(403).send(new Error(message, 403));

export const notFound = (resp: Response, message = "Not Found"): Response =>
  resp.status(404).send(new Error(message, 404));

export const serverError = (
  resp: Response,
  message = "Server Error"
): Response => resp.status(500).send(new Error(message, 500));

export const ok = (resp: Response, data: BaseDTO): Response =>
  resp.status(200).send(data);

export const created = (resp: Response, data: BaseDTO): Response =>
  resp.status(201).send(data);
