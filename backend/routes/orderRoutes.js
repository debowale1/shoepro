import express from 'express'
import { createOrderItem, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderCtrl.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/myorders').get(protect, getMyOrders)

router.route('/').post(protect, createOrderItem)
router.route('/:id').get(protect, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router