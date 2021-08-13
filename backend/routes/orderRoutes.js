import express from 'express'
import { createOrderItem, getOrderById } from '../controllers/orderCtrl.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').post(protect, createOrderItem)
router.route('/:id').get(protect, getOrderById)

export default router