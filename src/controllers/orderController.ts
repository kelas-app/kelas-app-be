import { Request, Response } from "express";
import Order from "../models/Order";
import Product from '../models/Product';
import InteractionService from '../services/interactionService';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserOrderHistory = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const orders = await Order.find({ buyerId: userId });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { buyerId, sellerId, productId, totalPrice, status } = req.body;
  const newOrder = new Order({
    buyerId,
    sellerId,
    productId,
    totalPrice,
    status,
  });
  try {
    const savedOrder = await newOrder.save();

    await InteractionService.trackInteraction(buyerId, productId, 'createOrder', 1);

    res.status(201).json(savedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const productId = updatedOrder.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product linked to order not found' });
    }

    if (status === 'Proses') {
      product.isVisible = false;
      await product.save();
    } else if (status === 'Selesai') {
      product.isVisible = false;
      product.isCompleted = true;
      await product.save();
    } else if (status === 'Batal') {
      product.isVisible = true;
      product.isCompleted = false;
      await product.save();
    }

    res.json(updatedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
