import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'
import productRouter from './routes/productRoutes'

dotenv.config()

connectDB();

const app = express();
//body parser
app.use(express.json());


//Mounting Routes
app.use('/api/v1/products', productRouter)


const PORT = process.env.PORT || 2000
app.listen(PORT, '127.0.0.1', () => {
  console.log(`app running on port ${PORT}`);
})