import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProduct } from '../controllers/productCtrl.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/')
      .get(getAllProducts)
      .post(protect, restrictTo('admin'),createProduct)

router.route('/:id')
      .get(getProduct)
      .delete(protect, restrictTo('admin'),deleteProduct)


export default router