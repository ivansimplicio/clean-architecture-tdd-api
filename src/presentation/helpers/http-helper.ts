import { HttpResponse } from '@presentation/interfaces';

export const ok = (): HttpResponse => ({
  statusCode: 200,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const badRequest = (message: string): HttpResponse => ({
  statusCode: 400,
  body: {
    status: 400,
    code: 'BAD_REQUEST',
    message,
  },
});

export const notFound = (message: string): HttpResponse => ({
  statusCode: 404,
  body: {
    status: 404,
    code: 'NOT_FOUND',
    message,
  },
});

export const unprocessableEntity = (message: string): HttpResponse => ({
  statusCode: 422,
  body: {
    status: 422,
    code: 'UNPROCESSABLE_ENTITY',
    message,
  },
});
