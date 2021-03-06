import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'


dotenv.config()

connectDB();

const app = express()
//body parser
app.use(express.json({ limit: "50kb" }))
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}


//Mounting Routes
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/upload', uploadRouter)

app.get('/api/v1/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// app.use((req, res, next) => {
//   console.log(res);
//   next()
// })

//Not Found middleware
app.use(notFound)

//Error middleware
app.use(errorHandler)


const PORT = process.env.PORT || 2000
app.listen(PORT, '127.0.0.1', () => {
  console.log(`app running on port ${PORT}`);
})