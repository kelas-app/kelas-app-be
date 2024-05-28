import Order, { IOrder } from "../models/Order";

// Service for order-related operations

// Get all orders
export const getAllOrders = async (): Promise<IOrder[]> => {
  try {
    return await Order.find();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to get all orders: ${error.message}`);
    } else {
      throw new Error("Failed to get all orders: Unknown error occurred");
    }
  }
};

// Get a single order by ID
export const getOrderById = async (id: string): Promise<IOrder | null> => {
  try {
    return await Order.findById(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to get order by ID: ${error.message}`);
    } else {
      throw new Error("Failed to get order by ID: Unknown error occurred");
    }
  }
};

// Create a new order
export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  try {
    return await Order.create(orderData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to create order: ${error.message}`);
    } else {
      throw new Error("Failed to create order: Unknown error occurred");
    }
  }
};

// Update an order
export const updateOrder = async (
  id: string,
  orderData: Partial<IOrder>
): Promise<IOrder | null> => {
  try {
    return await Order.findByIdAndUpdate(id, orderData, { new: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to update order: ${error.message}`);
    } else {
      throw new Error("Failed to update order: Unknown error occurred");
    }
  }
};

// Delete an order
export const deleteOrder = async (id: string): Promise<void> => {
  try {
    await Order.findByIdAndDelete(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete order: ${error.message}`);
    } else {
      throw new Error("Failed to delete order: Unknown error occurred");
    }
  }
};
