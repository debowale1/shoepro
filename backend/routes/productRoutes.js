import express from 'express'
import { createProduct, getAllProducts, getProduct } from '../controllers/productCtrl.js'

const router = express.Router()

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct)


export default router