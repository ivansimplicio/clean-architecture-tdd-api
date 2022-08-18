import { Controller, HttpRequest } from '@presentation/interfaces';
import { Request, Response } from 'express';

export const routerAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const { body, params, query, headers, url } = request;
    const httpRequest: HttpRequest = { body, params, query, headers, url };
    const httpResponse = await controller.handle(httpRequest);
    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
