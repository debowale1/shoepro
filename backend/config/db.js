import mongoose from 'mongoose'

const connectDB = async () => {
  const DB = process.env.MONGO_URI.replace('<PASSWORD>', process.env.MONGO_PASS)
  try {
    const conn = await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB



