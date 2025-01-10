import mongoose from 'mongoose'
import env from './env'

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_DB_URI)
    console.log('🎯 MongoDB connected')
  } catch (err) {
    console.error('🥲 MongoDB connection error:', err)
    process.exit(1)
  }
}

export default connectDB
