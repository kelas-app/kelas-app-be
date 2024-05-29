import Joi from "joi";

// Schema for registering a new user
export const registerSchema = Joi.object({
  firstname: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required()
    .messages({
      "string.pattern.base": "First name must contain only letters and spaces",
      "string.empty": "First name is required",
      "any.required": "First name is required",
    }),

  lastname: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .optional()
    .messages({
      "string.pattern.base": "Last name must contain only letters and spaces",
    }),

  username: Joi.string()
    .min(5)
    .required()
    .messages({
      "string.min": "Username must be at least 5 characters long",
      "string.empty": "Username is required",
      "any.required": "Username is required",
    }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email address is required",
      "any.required": "Email address is required",
    }),

  phone: Joi.string()
    .trim()
    .min(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      'string.min': 'Phone number must be at least 10 digits long',
      'string.pattern.base': 'Phone number must contain only digits',
    }),

  password: Joi.string()
    .min(5)
    .required()
    .messages({
      "string.min": "Password must be at least 5 characters long",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),

  address: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Address is required",
      "any.required": "Address is required",
    }),
});

// Schema for logging in a user
export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({ 
      "string.email": "Please enter a valid email address",
      "string.empty": "Email address is required",
      "any.required": "Email address is required",
    }),

  password: Joi.string()
    .required()
    .messages({ 
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
});

// Schema for product details
export const productSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required"
    }),

  category: Joi.string()
    .required()
    .messages({ "any.required": "Category is required" }),

  description: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      "string.empty": "Description is required",
      "string.min": "Description should have a minimum length of {#limit}",
      "string.max": "Description should have a maximum length of {#limit}",
      "any.required": "Description is required"
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.empty": "Price is required",
      "number.min": "Price should be a non-negative number",
      "any.required": "Price is required"
    }),

  sellerId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": "Seller ID must be a string",
      "string.empty": "Seller ID is required",
      "string.pattern.base": "Seller ID must be a valid MongoDB ObjectId",
      "any.required": "Seller ID is required"
    }),
    
});
