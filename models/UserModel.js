import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Create User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },

  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: 3,
    select: false // Don't return password on find by default
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export model
const User = mongoose.model('User', userSchema);
export default User;