import Joi from 'joi';

export const registerSchema = Joi.object({
  firstname: Joi.string().pattern(/^[a-zA-Z ]*$/).required(),
  lastname: Joi.string().pattern(/^[a-zA-Z ]*$/),
  username: Joi.string().required().min(5),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).message('Phone number must contain only digits'),
  password: Joi.string().required().min(5),
  address: Joi.string().required()
});

export const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  seller_id: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
