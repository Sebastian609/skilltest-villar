import { Router } from 'express';
import { charactersController, characterByIdController } from '../controllers/characters.controller';
import { validate, validateParams } from '../middleware/validate';
import { charactersQuerySchema, characterIdParamSchema } from '../schemas/characters.schema';

const router = Router();

router.get('/characters', validate(charactersQuerySchema), charactersController);
router.get('/characters/:id', validateParams(characterIdParamSchema), characterByIdController);

export default router;
