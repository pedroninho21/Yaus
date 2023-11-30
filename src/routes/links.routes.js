import { Router } from 'express';
import UserLinkController from '../controllers/userslinks.controller.js';
import authentification from '../middlewares/auth.middleware.js';
import Validation from '../middlewares/validation.middleware.js';
import LinkValidation from '../validation/link.validation.js';

const linksRouter = Router();

linksRouter.get('/:alias', UserLinkController.getOneByAlias);
linksRouter.post(
  '/',
  Validation(LinkValidation.create, 'body'),
  authentification({
    authRequired: false,
  }),
  UserLinkController.create
);
linksRouter.patch(
  '/:id',

  Validation(LinkValidation.update, 'body'),
  authentification(true),
  UserLinkController.update
);
linksRouter.delete('/:id', authentification(true), UserLinkController.delete);

export default linksRouter;
