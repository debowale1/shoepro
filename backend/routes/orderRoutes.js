import express from 'express'
import { createOrderItem, getOrderById, updateOrderToPaid,updateOrderToDelivered, getMyOrders, getOrders } from '../controllers/orderCtrl.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/myorders').get(protect, getMyOrders)

router.route('/').get(protect, restrictTo('admin'), getOrders).post(protect, createOrderItem)
router.route('/:id').get(protect, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, restrictTo('admin'), updateOrderToDelivered)

export default router