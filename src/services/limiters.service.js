import rateLimit from 'express-rate-limit';

const Limiter = {
  base: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
  }),
  accountCreation: rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    message: 'You have exceeded the 1 account creation per minute limit!',
  }),
  accountLogin: rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: 'You have exceeded the 5 account login attempts per minute limit!',
  }),
};

export default Limiter;
