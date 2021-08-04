import mongoose from 'mongoose'
import slugify from 'slugify'

const {Schema} = mongoose

const productSchema = Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true,
    unique: [true, 'A product must be unique']
  },
  slug: String,
  image: {
    type: String,
    required: [true, 'Product must have an image'],    
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
},{
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true},
})

productSchema.pre('save', function(next){
  this.slug = slugify(this.name, {lower: true})
  next()
})

const Product = new mongoose.model('Product', productSchema)
export default Product;