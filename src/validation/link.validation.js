import Joi from 'joi';

const LinkValidation = {
  create: Joi.object({
    url: Joi.string()
      .required()
      .min(3)
      .regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)
      .messages({
        'string.empty': 'URL is required',
        'string.min': 'URL must be at least 3 characters',
        'string.pattern.base': 'URL must be a valid URL',
      }),
    alias: Joi.string()
      .max(20)
      .regex(/^[\w-]+$/)

      .required()
      .messages({
        'string.empty': 'Alias is required',
        'string.max': 'Alias must be less than 20 characters',
        'string.pattern.base':
          'Alias must contain only letters, numbers, and hyphens',
      }),
  }).required(),

  update: Joi.object({
    alias: Joi.string()
      .max(20)
      .regex(/^[\w-]+$/)
      .required()
      .messages({
        'string.empty': 'Alias is required',
        'string.max': 'Alias must be less than 20 characters',
        'string.pattern.base':
          'Alias must contain only letters, numbers, and hyphens',
      }),
  }).required(),
};

export default LinkValidation;
