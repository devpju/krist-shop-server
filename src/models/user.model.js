import mongoose, { Schema } from 'mongoose';
import { accountStatus } from '~/constants/status';
import bcrypt from 'bcrypt';
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    password: { type: String },
    avatar: { type: String, default: '' },
    slug: { type: String },
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
);

const saltRounds = 10;

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
