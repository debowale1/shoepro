import connectDB from "../config/db.js";
import dotenv from 'dotenv'
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import users from './users.js'
import products from './products.js'

dotenv.config()

connectDB()

const seedData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const admin = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return {...product, user: admin}
    })

    await Product.insertMany(sampleProducts)

  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}
const deleteData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    console.log('Data deleted!');
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

if(process.argv[2] === '--delete'){
  deleteData()
}
if(process.argv[2] === '--seed'){
  seedData()
}

