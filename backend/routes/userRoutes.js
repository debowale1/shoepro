import express from 'express'
import { registerUser, getAllUsers, authUser, getUserProfile, updateUserProfile } from '../controllers/userCtrl.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)
// router.use(protect)
router.route('/profile').get(protect, getUserProfile).patch(protect, updateUserProfile)

router.route('/').get(protect, restrictTo('admin'), getAllUsers).post(registerUser)


export default router