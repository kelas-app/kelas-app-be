import Order, { IOrder } from '../models/Order';

// Service for order-related operations

// Get all orders
export const getAllOrders = async (): Promise<IOrder[]> => {
  return Order.find();
};

// Get a single order by ID
export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return Order.findById(id);
};

// Create a new order
export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  return Order.create(orderData);
};

// Update an order
export const updateOrder = async (id: string, orderData: Partial<IOrder>): Promise<IOrder | null> => {
  return Order.findByIdAndUpdate(id, orderData, { new: true });
};

// Delete an order
export const deleteOrder = async (id: string): Promise<void> => {
  await Order.findByIdAndDelete(id);
};
