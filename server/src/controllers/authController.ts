import dotenv from 'dotenv'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

// Load environment variables from the .env file
dotenv.config()

// Ensure the JWT_SECRET environment variable is set
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variable is not set.')
  process.exit(1) // Terminate the application if the key is not set
}

const jwtSecret = process.env.JWT_SECRET

// User registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.password) {
      return res.status(400).send('Password is required')
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    // Create a new user
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
    })

    // Save the user in the database
    await user.save()

    // After successful registration
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: '1h',
    })

    // Send token and userID back to the client along with a success message
    res.status(201).json({
      token,
      // userId: user._id,
      message: 'User registered successfully',
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
}

// User login
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).send('User not found')

    // Compare the hashed password
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    )
    if (!isValidPassword) return res.status(400).send('Invalid password')

    // Create and assign a token
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: '1h',
    })

    // Send token and welcome message back to the client
    res.json({
      token,
      // userId: user._id,
      message: `Welcome back, ${user.firstname}!`,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
}
