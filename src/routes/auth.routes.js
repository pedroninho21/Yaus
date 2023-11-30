import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import Validation from '../middlewares/validation.middleware.js';
import Limiter from '../services/limiters.service.js';
import AuthValidation from '../validation/auth.validation.js';

const authRouter = Router();

authRouter.post(
  '/login',
  Limiter.accountLogin, // middleware for rate limiting
  Validation(AuthValidation.login, 'body'),
  AuthController.login
);

authRouter.post(
  '/register',
  Limiter.accountCreation,
  Validation(AuthValidation.register, 'body'),
  AuthController.register
);

export default authRouter;
