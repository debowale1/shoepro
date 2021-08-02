import express from 'express'
import { createProduct, getAllProducts } from '../controllers/productCtrl.js'

const router = express.Router()

router.route('/').get(getAllProducts).post(createProduct)


export default router