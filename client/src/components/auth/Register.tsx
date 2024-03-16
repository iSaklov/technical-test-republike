import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../UI/Button'

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
          username,
        }),
      })

      if (response.ok) {
        const { token, message } = await response.json()
        login(token)
        alert(message)
        navigate('/posts')
      } else {
        alert('Failed to register')
      }
    } catch (error) {
      console.error('Failed to register', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <h2 className="text-xl leading-5 font-bold">Create you account</h2>
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
            <span className="medium-gray text-[10px]">
              Must have min. 8 characters, 1 number, uppercase and special
              character
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 space-y-4">
          <div className="col-span-full space-y-2">
            <label htmlFor="firstname" className="text-sm/5 font-semibold">
              First name
            </label>
            <div>
              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First name"
                required
                className="w-full px-4 py-2 text-sm/5 outline-0 border-light-gray border rounded placeholder:text-border-light-gray bg-transparent"
              />
            </div>
          </div>
          <div className="col-span-full space-y-2">
            <label htmlFor="lastname" className="text-sm/5 font-semibold">
              Last name
            </label>
            <div>
              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last name"
                required
                className="w-full px-4 py-2 text-sm/5 outline-0 border-light-gray border rounded placeholder:text-border-light-gray bg-transparent"
              />
            </div>
          </div>
          <div className="col-span-full space-y-2">
            <label htmlFor="username" className="text-sm/5 font-semibold">
              Username
            </label>
            <div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full px-4 py-2 text-sm/5 outline-0 border-light-gray border rounded placeholder:text-border-light-gray bg-transparent"
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Create profile
        </Button>
        <div>
          <span className="dark-gray text-sm/5 text-dark-gray">
            Already have an account?{' '}
            <Link to="/login" className="text-black font-semibold">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </form>
  )
}

export default Register
