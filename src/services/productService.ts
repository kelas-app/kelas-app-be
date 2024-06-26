import Product, { IProduct } from "../models/Product";

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    return await Product.find();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get all products: ${error.message}`);
    } else {
      throw new Error("Failed to get all products: Unknown error occurred");
    }
  }
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    return await Product.findById(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get product by ID: ${error.message}`);
    } else {
      throw new Error("Failed to get product by ID: Unknown error occurred");
    }
  }
};

export const createProduct = async (
  productData: IProduct
): Promise<IProduct> => {
  try {
    return await Product.create(productData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create product: ${error.message}`);
    } else {
      throw new Error("Failed to create product: Unknown error occurred");
    }
  }
};

export const updateProduct = async (
  id: string,
  productData: Partial<IProduct>
): Promise<IProduct | null> => {
  try {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update product: ${error.message}`);
    } else {
      throw new Error("Failed to update product: Unknown error occurred");
    }
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await Product.findByIdAndDelete(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    } else {
      throw new Error("Failed to delete product: Unknown error occurred");
    }
  }
};

export const getProductsByCategory = async (category: string): Promise<IProduct[]> => {
  try {
    const products = await Product.find({ category });
    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get products by category: ${error.message}`);
    } else {
      throw new Error("Failed to get products by category: Unknown error occurred");
    }
  }
};