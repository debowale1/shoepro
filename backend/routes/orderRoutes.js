import express from 'express'
import { createOrderItem } from '../controllers/orderCtrl.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').post(protect, createOrderItem)

export default router