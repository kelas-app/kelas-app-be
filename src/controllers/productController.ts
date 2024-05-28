import { Request, Response } from 'express';
import Product from '../models/Product';

// Controller for handling product-related operations

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error: any) { // Explicitly define the type of error
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error: any) { // Explicitly define the type of error
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, seller_id, category } = req.body;
  const newProduct = new Product({ name, description, price, seller_id, category });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error: any) { // Explicitly define the type of error
    res.status(400).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error: any) { // Explicitly define the type of error
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) { // Explicitly define the type of error
    res.status(500).json({ message: error.message });
  }
};
