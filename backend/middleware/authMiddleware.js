import asyncHandler from 'express-async-handler';
import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token) return next(res.status(401).json({status: 'error', message: 'Not authorized. Token not found'}))

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  //find the user with the id
  const user = await User.findById(decoded.id).select('-password')
  if(!user) return next(res.status(403).json({ status: 'fail', message: 'Not user found'}))
  //everything OK
  req.user = user
  next()
})

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      res.status(401)
      throw new Error('Not Authorized. This page can only be accessed by admins')
    }
    next()
  }
}

export { protect, restrictTo }