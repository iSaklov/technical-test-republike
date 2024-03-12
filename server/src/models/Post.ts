import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const Post = model('Post', postSchema)

export default Post
