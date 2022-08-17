import { Validation } from '@presentation/interfaces';
import { InvalidCpfError } from '@validation/errors';

import { cpf } from 'cpf-cnpj-validator';

export class CpfValidator implements Validation {
  async validate(input: any): Promise<void> {
    if (Object.prototype.hasOwnProperty.call(input, 'cpf')) {
      const isValid = typeof input.cpf === 'string' && cpf.isValid(input.cpf);
      if (!isValid) {
        throw new InvalidCpfError();
      }
    }
  }
}
