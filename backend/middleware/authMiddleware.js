import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token) return next(res.status(401).json({status: 'error', message: 'Not authorized. Token not found'}))

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  //find the user with the id
  const user = await User.findById(decoded.id).select('-password')
  if(!user) return next(res.status(403).json({ status: 'fail', message: 'Not user found'}))
  //everything OK
  req.user = user
  next()
})

export { protect }