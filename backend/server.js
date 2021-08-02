import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'

dotenv.config()

connectDB();

const app = express();
//body parser
app.use(express.json());


//Mounting Routes
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)


const PORT = process.env.PORT || 2000
app.listen(PORT, '127.0.0.1', () => {
  console.log(`app running on port ${PORT}`);
})