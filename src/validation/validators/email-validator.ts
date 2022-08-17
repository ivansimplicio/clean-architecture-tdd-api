import { InvalidEmailError } from '@validation/errors';
import { Validation } from '@presentation/interfaces';

import validator from 'validator';

export class EmailValidator implements Validation {
  async validate(input: any): Promise<void> {
    if (Object.prototype.hasOwnProperty.call(input, 'email')) {
      const isValid =
        typeof input.email === 'string' && validator.isEmail(input.email);
      if (!isValid) {
        throw new InvalidEmailError();
      }
    }
  }
}
