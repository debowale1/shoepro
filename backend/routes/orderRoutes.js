import express from 'express'
import { createOrderItem, getOrderById } from '../controllers/orderCtrl.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/:id').get(protect, getOrderById)
router.route('/').post(protect, createOrderItem)

export default router