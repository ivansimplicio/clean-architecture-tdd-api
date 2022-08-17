import { InvalidPasswordError } from '@validation/errors';
import { Validation } from '@presentation/interfaces';

import validator from 'validator';

export class PasswordValidator implements Validation {
  async validate(input: any): Promise<void> {
    if (Object.prototype.hasOwnProperty.call(input, 'password')) {
      const isValid =
        typeof input.password === 'string' &&
        validator.isStrongPassword(input.password);
      if (!isValid) {
        throw new InvalidPasswordError();
      }
    }
  }
}
