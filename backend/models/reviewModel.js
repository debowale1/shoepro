import mongoose from 'mongoose'

const {Schema} = mongoose

const reviewSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A review must be from a user'],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'A review must belong to a Product'],
  },
  review: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  } 
}, 
{
  timeStamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
})

const Review = new mongoose.model('Review', reviewSchema)
export default Review;