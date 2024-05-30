import { Request, Response } from "express";
import Product from "../models/Product";
import { productSchema } from "../utils/validation";
import { bucket } from "../utils/googleCloudStorage";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Get all products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, description, price, category } = req.body;
  const sellerId = req.user.id;
  let productImage: string[] = [];

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const uploadPromises = req.files.map(async (file: Express.Multer.File) => {
      const blob = bucket.file(
        `${uuidv4()}_${path.basename(file.originalname)}`
      );
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.end(file.buffer);

      await new Promise((resolve, reject) => {
        blobStream.on("finish", resolve);
        blobStream.on("error", reject);
      });

      return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    });

    productImage = await Promise.all(uploadPromises);
  }

  const { error } = productSchema.validate({
    name,
    description,
    price,
    category,
    sellerId,
    productImage,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newProduct = new Product({
    name,
    description,
    price,
    sellerId,
    category,
    productImage,
  });

  try {
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, description, price, category } = req.body;
  const sellerId = req.user.id;
  let productImage: string[] = [];

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const uploadPromises = req.files.map(async (file: Express.Multer.File) => {
      const blob = bucket.file(
        `${uuidv4()}_${path.basename(file.originalname)}`
      );
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.end(file.buffer);

      await new Promise((resolve, reject) => {
        blobStream.on("finish", resolve);
        blobStream.on("error", reject);
      });

      return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    });

    productImage = await Promise.all(uploadPromises);
  }

  const { error } = productSchema.validate({
    name,
    description,
    price,
    category,
    sellerId,
    productImage,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updateData: any = {
    name,
    description,
    price,
    category,
    sellerId,
    productImage,
  };

  if (productImage.length > 0) {
    updateData.productImage = productImage;
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
