import mongoose from 'mongoose'
import validator from 'validator'

const {Schema} = mongoose

const productSchema = Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  slug: String,
  images: {
    type: [String],
    required: [true, 'A user must have an email'],    
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avgRating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
})

const Product = new mongoose.model('Product', productSchema)
export default Product;