// utils/validation.ts
import Joi from "joi"

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
  username: Joi.string().min(5).required().messages({
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
      "string.min": "Phone number must be at least 10 digits long",
      "string.pattern.base": "Phone number must contain only digits",
    }),
  password: Joi.string().min(5).required().messages({
    "string.min": "Password must be at least 5 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  address: Joi.string().trim().required().messages({
    "string.empty": "Address is required",
    "any.required": "Address is required",
  }),
})

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
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
})

export const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required",
  }),
  category: Joi.string()
    .required()
    .messages({ "any.required": "Category is required" }),
  description: Joi.string().min(10).max(500).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description should have a minimum length of {#limit}",
    "string.max": "Description should have a maximum length of {#limit}",
    "any.required": "Description is required",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.empty": "Price is required",
    "number.min": "Price should be a non-negative number",
    "any.required": "Price is required",
  }),
  sellerId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": "Seller ID must be a string",
      "string.empty": "Seller ID is required",
      "string.pattern.base": "Seller ID must be a valid MongoDB ObjectId",
      "any.required": "Seller ID is required",
    }),
  productImage: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "At least one product image is required",
    "any.required": "Product image is required",
  }),
})

export const ratingReviewSchema = Joi.object({
  value: Joi.number().min(1).max(5).required().messages({
    "number.base": "Rating value must be a number",
    "number.empty": "Rating value is required",
    "number.min": "Rating value must be at least 1",
    "number.max": "Rating value must be at most 5",
    "any.required": "Rating value is required",
  }),
  comment: Joi.string().optional().allow("").max(255).messages({
    "string.base": "Comment must be a string",
    "string.max": "Comment should have a maximum length of {#limit}",
  }),
})

export const nikSchema = Joi.object({
  nik: Joi.string()
    .length(16)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "NIK should be a type of text",
      "string.length": "NIK must be exactly 16 digits",
      "string.pattern.base": "NIK must contain only numbers",
      "any.required": "NIK is required",
    }),
})

export const updateUserProfileSchema = Joi.object({
  firstname: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .optional()
    .messages({
      "string.pattern.base": "First name must contain only letters and spaces",
    }),
  lastname: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .optional()
    .messages({
      "string.pattern.base": "Last name must contain only letters and spaces",
    }),
  username: Joi.string().min(5).optional().messages({
    "string.min": "Username must be at least 5 characters long",
  }),
  phone: Joi.string()
    .trim()
    .min(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.min": "Phone number must be at least 10 digits long",
      "string.pattern.base": "Phone number must contain only digits",
    }),
  address: Joi.string().trim().optional().messages({
    "string.empty": "Address is required",
  }),
})
