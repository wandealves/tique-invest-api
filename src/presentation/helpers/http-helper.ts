import { Error } from "../errors";
import { HttpResponse } from "../protocols";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { error: error, isError: true }
});

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: { error: error, isError: true }
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: { error: error, isError: true }
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: { error: error, isError: true }
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: { error: error, isError: true }
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
});
