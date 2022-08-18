import { Router } from 'express';
import { makeCreateUserController } from '@main/factories/controllers';
import { routerAdapter } from '@main/adapters';

const router = Router();

router.post('/', routerAdapter(makeCreateUserController()));

export { router };
