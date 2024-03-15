import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from './UI/Button'

const Posts: React.FC = () => {
  const auth = useAuth() // Use the authentication context
  const navigate = useNavigate()

  // Function to handle the sign out
  const handleLogout = () => {
    auth.logout() // Call the logout function from the context
    navigate('/login') // Redirect to the login page
  }

  React.useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate('/login')
    }
  }, [auth, navigate])

  return (
    <div className="flex justify-center items-center h-screen gap-y-8 flex-col">
      <Button onClick={handleLogout}>Sign Out</Button>
      <h1 className="font-bold text-5xl">Republike</h1>
    </div>
  )
}

export default Posts
