import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  downloadAllProducts,
} from "../controllers/productController";
import { checkSellerRole } from "../middleware/roleMiddleware";
import upload from "../utils/upload";

const router = express.Router();

router.use(authenticateToken);

router.get("/download", downloadAllProducts);

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  upload.array("productImage", 2),
  checkSellerRole,
  createProduct
);
router.put(
  "/:id",
  upload.array("productImage", 2),
  checkSellerRole,
  updateProduct
);

router.delete("/:id", checkSellerRole, deleteProduct);

export default router;
