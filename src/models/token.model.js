import mongoose, { Schema } from 'mongoose'

const tokenSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true }
})

const Token = mongoose.model('Token', tokenSchema)
export default Token
