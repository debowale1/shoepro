import express from 'express'
import { createOrderItem, getOrderById, updateOrderToPaid } from '../controllers/orderCtrl.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').post(protect, createOrderItem)
router.route('/:id').get(protect, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router