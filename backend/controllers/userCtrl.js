import asyncHandler from 'express-async-handler';
import User from './../models/userModel.js'
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get token
// route GET /api/v1/users/login
// access Public
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      length: users.length,
      data: {
        users
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc Register a new User
// route GET /api/v1/users
// access Public
const registerUser = asyncHandler(async(req, res, next) => {
    const {name, email, password, passwordConfirm } = req.body

    const userExists = await User.findOne({email})
    if(userExists){
      return next(res.status(400).json({message: 'User already exists'}))
    }
    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,

    });
    const token = generateToken(user._id)
    res.status(201).json({
      status: 'success',
      data: {
        user,
        token
      }
    })
  
})

// @desc Auth user & get token
// route GET /api/v1/users/login
// access Public
const authUser = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;

  //check if email and password are supplied
  if(email === '' || password === '') return next(res.status(400).json({status: 'fail', message: 'Please supply email and password'}))

  //find user with the email address
  const user = await User.findOne({email});

  // check if user exists and if password is correct
  if(!user || !(await user.comparePassword(password, user.password))) {
    return next(res.status(403).json({status: 'Not Authenticated', message: 'Email or Password is incorrect'}))
  }
  
  // everything OK
  const token = generateToken(user._id)
  res.status(200).json({
    status: 'success', 
    data: {
      user: {
        name: user.name,
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
        token
      }
    }
  })
})

// @desc Get user's profile
// route GET /api/v1/users/profile
// access Private
const getUserProfile = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user._id).select('-password')
  if(!user) return next(res.status(404).json({status: 'fail', message: 'User not found'}))
  res.status(200).json({
    status: 'success', 
    data: {
      user
    }
  })
})

export {getAllUsers, registerUser, authUser, getUserProfile }