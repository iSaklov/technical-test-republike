import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../UI/Button'

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            firstname,
            lastname,
            username: '@' + username,
          }),
        },
      )

      if (response.ok) {
        const { token, user, message } = await response.json()
        login(token, user)
        alert(message)
        navigate('/')
      } else {
        alert('Failed to register')
      }
    } catch (error) {
      console.error('Failed to register', error)
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUsername = e.target.value.replace(/\s+/g, '_').toLowerCase()
    setUsername(updatedUsername)
  }

  useEffect(() => {
    if (
      password.match(
        '^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?/~`|-]).{8,}$',
      ) !== null
    ) {
      setIsValidPassword(true)
    } else {
      setIsValidPassword(false)
    }
  }, [password])

  useEffect(() => {
    if (
      email.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$') !== null
    ) {
      setIsValidEmail(true)
    } else {
      setIsValidEmail(false)
    }
  }, [email])

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <h2 className="text-xl leading-5 font-bold">Create you account</h2>
        <div className="grid grid-cols-1 space-y-4">
          <div className="col-span-full space-y-2">
            <label htmlFor="email" className="text-sm/5 font-semibold">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.oi"
                required
                className="w-full px-4 py-2 text-sm/5 outline-0 border-light-gray border rounded placeholder:text-medium-gray bg-transparent"
              />
              <span
                className={`text-pink-600 text-[10px] absolute -bottom-5 left-0 ${!isValidEmail && email.length > 0 ? 'visible' : 'invisible'}`}
              >
                Email no valid
              </span>
            </div>
          </div>
          <div className="col-span-full space-y-2">
            <label htmlFor="password" className="text-sm/5 font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="P@ssw0rd"
                required
                className="w-full px-4 py-2 text-sm/5 outline-0 border-light-gray border rounded placeholder:text-medium-gray bg-transparent"
              />
              <img
                src="/assets/icons/eye.svg"
                alt=""
                className="h-4 w-4 absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
            <span
              className={`text-[10px] ${!isValidPassword && password.length > 0 ? 'text-pink-600' : 'text-medium-gray'}`}
            >
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
                placeholder="John"
                required
                className="w-full px-4 py-2 text-sm/5 outline-0 border-light-gray border rounded placeholder:text-medium-gray bg-transparent"
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
                placeholder="Doe"
                required
                className="w-full px-4 py-2 text-sm/5 outline-0 border-light-gray border rounded placeholder:text-medium-gray bg-transparent"
              />
            </div>
          </div>
          <div className="col-span-full space-y-2">
            <label htmlFor="username" className="text-sm/5 font-semibold">
              Username
            </label>
            <div className="flex border border-light-gray rounded px-4 py-2 text-sm/5 w-full">
              <span className="flex select-none items-center">@</span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="j_doe"
                required
                className="outline-0 placeholder:text-medium-gray border-0 bg-transparent flex-1"
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
