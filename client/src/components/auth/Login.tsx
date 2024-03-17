import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../UI/Button'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const { token, user, message } = await response.json()
        login(token, user)
        alert(message)
        navigate('/posts')
      } else {
        alert('Failed to login')
      }
    } catch (error) {
      console.error('Failed to login', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <h2 className="text-xl leading-5 font-bold">Sign in</h2>
        <div className="grid grid-cols-1 space-y-4">
          <div className="col-span-full space-y-2">
            <label htmlFor="email" className="text-sm/5 font-semibold">
              Email
            </label>
            <div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.oi"
                required
                className="w-full px-4 py-2 text-sm/5 outline-0 border-light-gray border rounded placeholder:text-border-light-gray bg-transparent"
              />
            </div>
          </div>
          <div className="col-span-full space-y-2">
            <label htmlFor="password" className="text-sm/5 font-semibold">
              Password
            </label>
            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-2 text-sm/5 outline-0 border-light-gray border rounded placeholder:text-border-light-gray bg-transparent"
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Log in
        </Button>
        <div>
          <span className="dark-gray text-sm/5 text-dark-gray">
            Don’t have an account?
          </span>{' '}
          <Link to="/register" className="text-black font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default Login
