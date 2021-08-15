import asyncHandler from 'express-async-handler';
import User from './../models/userModel.js'
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get token
// route GET /api/v1/users
// access Private/Admin
const getAllUsers = asyncHandler(async (req, res, next) => {
  
  const users = await User.find();
  res.json(users)
  
})

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
  const token = generateToken(user._id)
  res.status(200).json({
    // status: 'success',
    // data: {
    //   ...user,
    //   token
    // }
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin,
    token
  })
})

// @desc Update user's profile
// route PATCH /api/v1/users/profile
// access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user._id)
  if(!user) {
    res.status(404)
    throw new Error('User not found!')
  }
  const updates = {
    
  }
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
      token: generateToken(updatedUser._id)
  })

  // if(user) {

  //   user.name = req.body.name || user.name
  //   user.email = req.body.email || user.email

  //   if(req.body.password && req.body.passwordConfirm){
  //     user.password = req.body.password
  //     // user.passwordConfirm = req.body.passwordConfirm
  //   }
  //   const updatedUser = await user.save()
  
  //   res.status(200).json({
  //     status: 'success', 
  //     data: {
  //       updatedUser,
  //       token: generateToken(updatedUser._id)
  //     }
  //   })
  // }else {
  //   res.status(404)
  //   throw new Error('User not found')
  // }
})

export {getAllUsers, registerUser, authUser, getUserProfile, updateUserProfile }