import { Request, Response } from 'express';
import Order from '../models/Order';

// Controller for handling order-related operations

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error: any) { // Explicitly define the type of error
    res.status(500).json({ message: error.message });
  }
};

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error: any) { // Explicitly define the type of error
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  const { buyer_id, seller_id, product_id, quantity, total_price, status } = req.body;
  const newOrder = new Order({ buyer_id, seller_id, product_id, quantity, total_price, status });
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error: any) { // Explicitly define the type of error
    res.status(400).json({ message: error.message });
  }
};

// Update an order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error: any) { // Explicitly define the type of error
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error: any) { // Explicitly define the type of error
    res.status(500).json({ message: error.message });
  }
};
