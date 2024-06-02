import { Request, Response } from "express";
import {
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
  updateCartItem as updateCartItemService,
  viewCart as viewCartService,
  checkout as checkoutService,
} from "../services/cartService";

export const addToCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    await addToCartService(userId, productId, quantity);
    return res.status(200).json({ message: "Item added to cart" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { productId } = req.params;
  const userId = req.user.id;
  try {
    await removeFromCartService(userId, productId);
    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  try {
    await updateCartItemService(userId, productId, quantity);
    return res.status(200).json({ message: "Cart item updated" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const viewCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.user.id;

  try {
    const cartItems = await viewCartService(userId);
    return res.status(200).json(cartItems);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const checkout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.user.id;

  try {
    await checkoutService(userId);
    return res.status(200).json({ message: "Checkout successful" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
