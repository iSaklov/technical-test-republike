import express from 'express'
import {
  createPost,
  getPosts,
  likePost,
  dislikePost,
} from '../controllers/postController'

const router = express.Router()

// Creating a post
router.post('/', createPost)

// Retrieving all posts
router.get('/', getPosts)

// Liking a post
router.put('/:postId/like', likePost)

// Disliking a post
router.put('/:postId/dislike', dislikePost)

export default router
