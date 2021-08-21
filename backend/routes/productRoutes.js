import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/productCtrl.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/')
      .get(getAllProducts)
      .post(protect, restrictTo('admin'), createProduct)

router.route('/:id')
      .get(getProduct)
      .put(protect, restrictTo('admin'), updateProduct)
      .delete(protect, restrictTo('admin'),deleteProduct)


export default router