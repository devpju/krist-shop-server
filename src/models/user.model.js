import mongoose, { Schema } from 'mongoose'
import { accountStatus } from '~/constants/status'

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    status: {
      type: String,
      required: true,
      enum: Object.values(accountStatus),
      default: accountStatus.UNVERIFIED
    },
    isAdmin: { type: Boolean, required: true, default: false },
    emailOtp: { type: String },
    otpExpiresAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('User', userSchema)
