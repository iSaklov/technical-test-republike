import { Request, Response } from 'express'
import Post from '../models/Post'

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new Post({
      userId: req.body.userId,
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
    const posts = await Post.find().populate('userId', 'username')
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
export const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).send('Post not found')
    }
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
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
export const dislikePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).send('Post not found')
    }
    if (!post.dislikes.includes(req.body.userId)) {
      await post.updateOne({ $push: { dislikes: req.body.userId } })
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
