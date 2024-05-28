import Product, { IProduct } from '../models/Product';

// Service for product-related operations

// Get all products
export const getAllProducts = async (): Promise<IProduct[]> => {
  return Product.find();
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<IProduct | null> => {
  return Product.findById(id);
};

// Create a new product
export const createProduct = async (productData: IProduct): Promise<IProduct> => {
  return Product.create(productData);
};

// Update a product
export const updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
  return Product.findByIdAndUpdate(id, productData, { new: true });
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  await Product.findByIdAndDelete(id);
};
