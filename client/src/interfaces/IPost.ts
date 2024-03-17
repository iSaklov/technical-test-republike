import { IUser } from './IUser'

export interface IPost {
  _id: string
  author: IUser
  text: string
  publishedAt: Date
  likes: string[]
  dislikes: string[]
}
