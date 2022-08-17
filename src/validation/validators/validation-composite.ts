import { Validation } from '@presentation/interfaces';

export class ValidationComposite implements Validation {
  constructor(private validations: Validation[]) {}

  async validate(input: any): Promise<void> {
    for (const validation of this.validations) {
      await validation.validate(input);
    }
  }
}
