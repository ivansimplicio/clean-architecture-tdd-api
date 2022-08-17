import { InvalidDateError } from '@validation/errors';
import { Validation } from '@presentation/interfaces';

import validator from 'validator';

export class DateValidator implements Validation {
  constructor(private fieldName: string) {}

  async validate(input: any): Promise<void> {
    if (Object.prototype.hasOwnProperty.call(input, this.fieldName)) {
      const isValid = validator.isDate(input[this.fieldName]);
      if (!isValid) {
        throw new InvalidDateError();
      }
    }
  }
}
