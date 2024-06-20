import { Request, Response } from "express"
import Wishlist from "../models/Wishlist"
import Product from "../models/Product"

export const addToWishlist = async (req: Request, res: Response) => {
  const { userId, productId } = req.body

  try {
    let wishlist = await Wishlist.findOne({ userId })
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    wishlist.items.push({ productId })
    await wishlist.save()

    res.status(200).json(wishlist)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { userId, productId } = req.body

  try {
    const wishlist = await Wishlist.findOne({ userId })
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" })
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.productId !== productId
    )
    await wishlist.save()

    res.status(200).json(wishlist)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

export const getWishlist = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate(
      "items.productId"
    )
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" })
    }

    res.status(200).json(wishlist)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}
