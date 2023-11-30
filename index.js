import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/router.js';
import ErrorMiddleware from './src/middlewares/error.middleware.js';
import Limiter from './src/services/limiters.service.js';

dotenv.config();

const PORT = process.env.API_PORT ?? 3000;
const app = express();

// middleware for rate limiting
app.use(Limiter.base);

app.use(express.json());

app.use(router);

// middleware for error handling
app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
