import mongoose from 'mongoose'

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: 'personal',
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    default: 'M',
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export const Contact = mongoose.model('contact', ContactSchema)
