import Joi from "joi";

// Schema for registering a new user
export const registerSchema = Joi.object({
  firstname: Joi.string()
    .pattern(/^[a-zA-Z ]*$/)
    .required()
    .messages({
      "string.pattern.base": "First name must contain only letters and spaces",
    }),

  lastname: Joi.string()
    .pattern(/^[a-zA-Z ]*$/)
    .optional()
    .messages({
      "string.pattern.base": "Last name must contain only letters and spaces",
    }),

  username: Joi.string()
    .min(5)
    .required()
    .messages({ "string.min": "Username must be at least 5 characters long" }),

  email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Please enter a valid email address" }),

  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .message("Phone number must contain only digits")
    .optional(),

  password: Joi.string()
    .min(5)
    .required()
    .messages({ "string.min": "Password must be at least 5 characters long" }),

  address: Joi.string()
    .required()
    .messages({ "any.required": "Address is required" }),
});

// Schema for product details
export const productSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Product name is required" }),

  category: Joi.string()
    .required()
    .messages({ "any.required": "Category is required" }),

  description: Joi.string()
    .required()
    .messages({ "any.required": "Description is required" }),

  price: Joi.number()
    .required()
    .messages({ "any.required": "Price is required" }),

  seller_id: Joi.string()
    .required()
    .messages({ "any.required": "Seller ID is required" }),
});

// Schema for logging in a user
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Please enter a valid email address" }),

  password: Joi.string()
    .required()
    .messages({ "any.required": "Password is required" }),
});
