import express from 'express'
import { registerUser, getAllUsers, authUser, getUserProfile, updateUserProfile } from '../controllers/userCtrl.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)
// router.use(protect)
router.route('/profile').get(protect, getUserProfile).patch(protect, updateUserProfile)

router.route('/').get(getAllUsers).post(registerUser)


export default router