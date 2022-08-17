import { MissingParamError } from '@validation/errors';
import { Validation } from '@presentation/interfaces';

export class RequiredFieldValidator implements Validation {
  constructor(private fieldName: string) {}

  async validate(input: any): Promise<void> {
    if (!Object.prototype.hasOwnProperty.call(input, this.fieldName)) {
      throw new MissingParamError(this.fieldName);
    }
  }
}
