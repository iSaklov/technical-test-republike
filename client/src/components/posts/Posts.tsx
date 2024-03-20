import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { IPost } from '../../interfaces/IPost'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import PostModal from './PostModal'
import Button from '../UI/Button'

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth() // Use the authentication context
  const navigate = useNavigate()

  // Function to handle the sign out
  const handleLogout = () => {
    logout() // Call the logout function from the context
    navigate('/login') // Redirect to the login page
  }

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
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
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/like`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      if (response.ok) {
        const updatedPost = await response.json()
        setPosts(
          posts.map((post) => (post._id === postId ? updatedPost : post)),
        )
      } else {
        throw new Error('Failed to like the post')
      }
    } catch (error) {
      console.error('Error liking the post:', error)
    }
  }

  const handleDislike = async (postId: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/dislike`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      if (response.ok) {
        const updatedPost = await response.json()
        setPosts(
          posts.map((post) => (post._id === postId ? updatedPost : post)),
        )
      } else {
        throw new Error('Failed to dislike the post')
      }
    } catch (error) {
      console.error('Error disliking the post:', error)
    }
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handlePostSubmit = async (postText: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ text: postText }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      closeModal() // Close the modal window after submission
      await fetchPosts() // Fetch posts again to update the list with the new post
    } catch (error) {
      console.error(error)
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
    <div className="min-h-screen">
      <header className="border-b border-very-light-gray">
        <div className="flex items-center justify-between w-full container mx-auto px-8">
          <Link to="/">
            <div className="px-[7px]">
              <img
                src="/assets/logo-black.svg"
                alt="Logo"
                className="h-[36px] w-[36px]"
              />
            </div>
          </Link>
          <Link to="/">
            <h1 className="flex-grow text-center text-xl font-bold pt-5 pb-[18px]">
              Home
            </h1>
          </Link>
          {/* Use an invisible block for balance */}
          <div className="h-[36px] w-[36px] invisible" />
        </div>
      </header>
      <main className="relative">
        <aside className="w-[228px] absolute mx-8 space-y-6">
          <header className="flex items-center gap-x-3">
            <div className="bg-primary-10 text-primary text-sm font-semibold flex justify-center items-center w-[44px] h-[44px] rounded-full m-2">
              UD
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold">
                {`${capitalizeFirstLetter(user?.firstname ?? '')} ${capitalizeFirstLetter(user?.lastname ?? '')}`}
              </p>
              <p className="text-primary text-sm font-semibold">
                {user?.username.toLowerCase()}
              </p>
            </div>
          </header>
          <nav className="w-full space-y-6">
            <Link to="/">
              <Button className="bg-primary-5 !text-primary flex gap-x-2 !rounded-lg items-center">
                <img src="/assets/icons/home.svg" alt="" />
                Home
              </Button>
            </Link>
            <Button onClick={openModal} className="!rounded-lg">
              Create new post
            </Button>
            <PostModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onPostSubmit={handlePostSubmit}
            />
            <Button onClick={handleLogout} className="!bg-black !rounded-lg">
              Sign Out
            </Button>
          </nav>
        </aside>
        <div className="max-w-[662px] w-full container mx-auto space-y-8 my-10">
          {isLoading ? (
            <p>Loading posts...</p>
          ) : (
            posts.map(({ _id, author, text, likes, dislikes }) => (
              <div
                key={_id}
                className="rounded-lg border-very-light-gray border p-6 space-y-4"
              >
                <div className="flex items-center gap-x-3">
                  <div className="bg-primary-10 text-primary text-sm font-semibold flex justify-center items-center w-[44px] h-[44px] rounded-full">
                    {author?.firstname[0].toUpperCase() +
                      author?.lastname[0].toUpperCase()}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold">
                      {`${capitalizeFirstLetter(author?.firstname ?? '')} ${capitalizeFirstLetter(author?.lastname) ?? ''}`}
                    </p>
                    <p className="text-primary text-sm font-semibold">
                      {author?.username.toLowerCase()}
                    </p>
                  </div>
                </div>
                <p>{text}</p>
                <div className="flex gap-x-6 items-center">
                  <button onClick={() => handleLike(_id)}>
                    <img
                      src={
                        likes.includes(user?._id || '')
                          ? '/assets/icons/like-inactive.svg'
                          : '/assets/icons/like.svg'
                      }
                      alt=""
                    />
                  </button>
                  <button onClick={() => handleDislike(_id)}>
                    <img
                      src={
                        dislikes.includes(user?._id || '')
                          ? '/assets/icons/dislike-inactive.svg'
                          : '/assets/icons/dislike.svg'
                      }
                      alt=""
                    />
                  </button>
                  <span className="text-steel-gray font-semibold text-sm">
                    Likes: <span className="text-primary">{likes.length}</span>
                  </span>
                  <span className="text-steel-gray font-semibold text-sm">
                    Dislikes:{' '}
                    <span className="text-primary">{dislikes.length}</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default Posts
