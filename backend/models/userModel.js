import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

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
    validate: [validator.isEmail, 'Please provide a valid email address'],
    
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
},
{
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
})


//encrypt password before save
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  this.passwordConfirm = undefined
  next()
})

//compare encrypted password and provided password on log in request
userSchema.methods.comparePassword = async function(providedPassword, hashedPassword) {
  return await bcrypt.compare(providedPassword, hashedPassword)
}

const User = new mongoose.model('User', userSchema)
export default User;