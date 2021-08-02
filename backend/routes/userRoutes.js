import express from 'express'
import { createUser, getAllUsers } from '../controllers/userCtrl.js'

const router = express.Router()

router.route('/').get(getAllUsers).post(createUser)


export default router