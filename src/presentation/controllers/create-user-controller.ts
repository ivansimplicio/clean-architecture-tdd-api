import { CreateUser } from '@domain/usecases';
import { unprocessableEntity, created } from '@presentation/helpers';
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
} from '@presentation/interfaces';

export class CreateUserController implements Controller {
  constructor(private createUser: CreateUser, private validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.validation.validate(httpRequest.body);
      const user = await this.createUser.create(httpRequest.body);
      return created(user);
    } catch (error) {
      return unprocessableEntity(error.message);
    }
  }
}
