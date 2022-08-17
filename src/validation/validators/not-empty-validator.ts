import { Validation } from '@presentation/interfaces';
import { NotEmptyError } from '@validation/errors';

import validator from 'validator';

export class NotEmptyValidator implements Validation {
  constructor(private fieldName: string) {}

  async validate(input: any): Promise<void> {
    let isEmpty = true;
    if (input[this.fieldName]) {
      isEmpty = validator.isEmpty(input[this.fieldName], {
        ignore_whitespace: true,
      });
    }
    if (isEmpty) {
      throw new NotEmptyError(this.fieldName);
    }
  }
}
