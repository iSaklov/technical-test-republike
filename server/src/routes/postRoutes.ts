import express from 'express'
import authenticateToken from '../middleware/authenticateToken'
import {
  createPost,
  getPosts,
  likePost,
  dislikePost,
} from '../controllers/postController'

const router = express.Router()

// Creating a post
router.post('/', authenticateToken, createPost)

// Retrieving all posts
router.get('/', authenticateToken, getPosts)

// Liking a post
router.put('/:postId/like', authenticateToken, likePost)

// Disliking a post
router.put('/:postId/dislike', authenticateToken, dislikePost)

export default router
