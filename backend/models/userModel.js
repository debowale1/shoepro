import mongoose from 'mongoose'
import validator from 'validator'

const {Schema} = mongoose

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    valdate: [validator.isEmail, 'Please provide a valid email address'],
    
  },
  password: {
    type: String,
    required: [true, 'User must provide a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function(el){
        return el === this.password
      },
      message: "Passwords dont match"
    }
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user"
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
})

const User = new mongoose.model('User', userSchema)
export default User;