import { CartItem } from "../models/Cart";
import ShoppingCart from "../models/Cart";

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<void> => {
  try {
    let cart = await ShoppingCart.findOne({ userId });

    if (!cart) {
      cart = new ShoppingCart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
  } catch (error: any) {
    throw new Error(`Failed to add item to cart: ${error.message}`);
  }
};

export const removeFromCart = async (
  userId: string,
  productId: string
): Promise<void> => {
  try {
    const cart = await ShoppingCart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);

    await cart.save();
  } catch (error: any) {
    throw new Error(`Failed to remove item from cart: ${error.message}`);
  }
};

export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<void> => {
  try {
    const cart = await ShoppingCart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const item = cart.items.find((item) => item.productId === productId);

    if (!item) {
      throw new Error("Item not found in cart");
    }

    item.quantity = quantity;

    await cart.save();
  } catch (error: any) {
    throw new Error(`Failed to update cart item: ${error.message}`);
  }
};

export const viewCart = async (userId: string): Promise<CartItem[]> => {
  try {
    const cart = await ShoppingCart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    return cart.items;
  } catch (error: any) {
    throw new Error(`Failed to view cart: ${error.message}`);
  }
};

export const checkout = async (userId: string): Promise<void> => {
  try {
    // Implement checkout logic here, e.g., creating an order
  } catch (error: any) {
    throw new Error(`Failed to checkout: ${error.message}`);
  }
};
