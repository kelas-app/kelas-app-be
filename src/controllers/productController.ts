import { Request, Response } from "express";
import axios from 'axios';
import Product from "../models/Product";
import { productSchema } from "../utils/validation";
import { bucket } from "../utils/googleCloudStorage";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import InteractionService from '../services/interactionService';
import fs from "fs";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await Product.find({ isVisible: true });
    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId, isVisible: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await InteractionService.trackInteraction(req.user.id, productId, 'getProductById', 1);

    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

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

export const downloadAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    const jsonData = JSON.stringify(products, null, 2);

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=allProducts.json"
    );
    res.setHeader("Content-Type", "application/json");

    res.send(jsonData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });

    if (!products.length) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductRecommendations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const flaskUrl = `http://localhost:8000/recommend`;
    const response = await axios.get(flaskUrl, {
      params: { user_id: userId }
    });

    const visibleProducts = response.data.filter((product: any) => product.isVisible);

    return res.status(200).json(visibleProducts);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return res.status(500).json({ error: 'Error fetching recommendations' });
  }
};

export const semanticSearch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter "query" is required' });
    }

    const flaskUrl = `http://localhost:8000/semantic-search?query=${query}`;
    const response = await axios.get(flaskUrl);

    const productNames = response.data;

    return res.status(200).json(productNames);
  } catch (error) {
    console.error('Error performing semantic search:', error);
    return res.status(500).json({ error: 'Error performing semantic search' });
  }
};

export const searchProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const searchTerm = req.query.term?.toString() || '';
    const regex = new RegExp(searchTerm, 'i');
    const products = await Product.find({ name: regex, isVisible: true });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

