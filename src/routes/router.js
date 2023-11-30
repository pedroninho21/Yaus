import { Router } from 'express';
import linksRouter from './links.routes.js';
import authRouter from './auth.routes.js';

const router = Router();

router.use('/links', linksRouter);
router.use('/auth', authRouter);

export default router;
