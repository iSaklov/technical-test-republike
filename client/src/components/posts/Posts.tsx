import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { IPost } from '../../interfaces/IPost'
import AddPost from './AddPost'
import Button from '../UI/Button'

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, logout } = useAuth() // Use the authentication context
  const navigate = useNavigate()

  // Function to handle the sign out
  const handleLogout = () => {
    logout() // Call the logout function from the context
    navigate('/login') // Redirect to the login page
  }

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async (postId: string) => {
    try {
      await fetch(`http://localhost:3001/api/posts/${postId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      // Refetch posts or update UI accordingly
    } catch (error) {
      console.error('Error liking the post:', error)
    }
  }

  const handleDislike = async (postId: string) => {
    try {
      await fetch(`http://localhost:3001/api/posts/${postId}/dislike`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      // Refetch posts or update UI accordingly
    } catch (error) {
      console.error('Error disliking the post:', error)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login') // Redirect to login page if not authenticated
      return
    }

    fetchPosts()
  }, [isAuthenticated, navigate])

  return (
    <div className="flex justify-center items-center h-screen gap-y-8 flex-col">
      <Button onClick={handleLogout}>Sign Out</Button>
      <h1 className="font-bold text-5xl">Republike</h1>
      <AddPost onPostAdded={fetchPosts} />
      <div>
        {isLoading ? (
          <p>Loading posts...</p>
        ) : (
          posts.map((post) => (
            <div key={post._id}>
              <h3>{post.text}</h3>
              <button onClick={() => handleLike(post._id)}>Like</button>
              <button onClick={() => handleDislike(post._id)}>Dislike</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Posts
