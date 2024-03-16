import { IUser } from './IUser'

export interface IPost {
  _id: string
  userId: IUser | string
  text: string
  publishedAt: Date
  likes: IUser[] | string[]
  dislikes: IUser[] | string[]
}
