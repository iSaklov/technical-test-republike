import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Post from '../models/Post'
import { RequestWithUserId } from '../middleware/authenticateToken'

// Create a new post
export const createPost = async (req: RequestWithUserId, res: Response) => {
  try {
    // Ensure userId is defined
    if (!req.userId) {
      return res.status(400).send('User ID is required')
    }

    if (!req.body.text) {
      return res.status(400).send('Text is required')
    }

    const post = new Post({
      userId: req.userId, // Now ensured to be not undefined
      text: req.body.text,
    })

    await post.save()
    res.status(201).send('Post created successfully')
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
}

// Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    // const posts = await Post.find().populate('userId', 'username')
    const posts = await Post.find()
    res.json(posts)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
}

// Like a post
export const likePost = async (req: RequestWithUserId, res: Response) => {
  try {
    // Ensure userId is defined
    if (!req.userId) {
      return res.status(400).send('User ID is required')
    }

    const post = await Post.findById(req.params.postId)

    if (!post) {
      return res.status(404).send('Post not found')
    }

    // Convert userId from string to ObjectId
    const userId = new mongoose.Types.ObjectId(req.userId)

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: req.userId } })
      res.status(200).send('The post has been liked')
    } else {
      res.status(400).send('You already liked this post')
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
}

// Dislike a post
export const dislikePost = async (req: RequestWithUserId, res: Response) => {
  try {
    // Ensure userId is defined
    if (!req.userId) {
      return res.status(400).send('User ID is required')
    }

    const post = await Post.findById(req.params.postId)

    if (!post) {
      return res.status(404).send('Post not found')
    }

    // Convert userId from string to ObjectId
    const userId = new mongoose.Types.ObjectId(req.userId)

    if (!post.dislikes.includes(userId)) {
      await post.updateOne({ $push: { dislikes: req.userId } })
      res.status(200).send('The post has been disliked')
    } else {
      res.status(400).send('You already disliked this post')
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
}
