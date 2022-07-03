import { HttpResponse } from "../protocols";

export const badRequest = (errors: string[]): HttpResponse => {
  return {
    statusCode: 400,
    body: { message: errors }
  };
};

export const unauthorized = (errors: string[]): HttpResponse => ({
  statusCode: 401,
  body: { message: errors }
});

export const forbidden = (errors: string[]): HttpResponse => ({
  statusCode: 403,
  body: { message: errors }
});

export const notFound = (errors: string[]): HttpResponse => ({
  statusCode: 404,
  body: { message: errors }
});

export const serverError = (errors: string[]): HttpResponse => ({
  statusCode: 500,
  body: { message: errors }
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
});
