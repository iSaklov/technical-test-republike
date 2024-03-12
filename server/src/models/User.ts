import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
})

const User = model('User', userSchema)

export default User
