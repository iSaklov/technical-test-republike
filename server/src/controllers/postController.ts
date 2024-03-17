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
      author: req.userId, // Now ensured to be not undefined
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
      .populate('author', 'firstname lastname username') // Populate user data
      .lean() // Convert results into plain JavaScript objects
      .sort({ publishedAt: -1 })

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

    // If the user has already liked the post, remove the like
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } })
    } else {
      // Add a like and remove a dislike if it exists
      await post.updateOne({
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      })
    }

    const updatedPost = await Post.findById(req.params.postId).populate(
      'author',
      'firstname lastname username',
    )

    // Return the updated post
    res.status(200).json(updatedPost)
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

    // If the user has already disliked the post, remove the dislike
    if (post.dislikes.includes(userId)) {
      await post.updateOne({ $pull: { dislikes: userId } })
    } else {
      // Add a dislike and remove a like if it exists
      await post.updateOne({
        $addToSet: { dislikes: userId },
        $pull: { likes: userId },
      })
    }

    const updatedPost = await Post.findById(req.params.postId).populate(
      'author',
      'firstname lastname username',
    )

    // Return the updated post
    res.status(200).json(updatedPost)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
}
