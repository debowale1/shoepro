import User from './../models/userModel.js'

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

const createUser = async(req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (error) {
    next(error)
  }
}

export {getAllUsers, createUser}