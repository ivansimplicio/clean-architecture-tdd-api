import { DbCreateUser } from '@data/usecases';
import {
  EmailValidator,
  ValidationComposite,
  CpfValidator,
  DateValidator,
  RequiredFieldValidator,
  PasswordValidator,
  NotEmptyValidator,
} from '@validation/validators';
import { CreateUserController } from '@presentation/controllers';
import { Controller, Validation } from '@presentation/interfaces';
import { UserMySqlRepository } from '@infra/db/mysql';

export const makeCreateUserController = (): Controller => {
  const userMySqlRepository = new UserMySqlRepository();
  const createUser = new DbCreateUser(userMySqlRepository, userMySqlRepository);
  return new CreateUserController(
    createUser,
    new ValidationComposite(makeCreateUserValidations())
  );
};

const makeCreateUserValidations = (): Array<Validation> => {
  const validators: Array<Validation> = [
    new NotEmptyValidator('name'),
    new EmailValidator(),
    new CpfValidator(),
    new DateValidator('birthDate'),
    new PasswordValidator(),
  ];
  const requiredFields = ['name', 'email', 'password', 'cpf', 'birthDate'];
  for (const field of requiredFields) {
    validators.push(new RequiredFieldValidator(field));
  }
  return validators;
};
