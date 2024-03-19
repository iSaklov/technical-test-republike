import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes'
import postRoutes from './routes/postRoutes'

// Load environment variables from the .env file
dotenv.config()

// Initialize the Express application
const app = express()
app.use(cors()) // Enable CORS for all requests
app.use(express.json()) // For parsing JSON request bodies

// Using routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

if (process.env.NODE_ENV === 'production') {
  // After all other middleware/API routes
  app.use(express.static(path.join(__dirname, '../../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'))
  })
}

// The port on which the server will run. The value is taken from environment variables, or 3001 is used by default
const port = process.env.PORT || 3001

// Validate that MONGODB_URI is not undefined
const mongodbUri = process.env.MONGODB_URI
if (!mongodbUri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env file',
  )
}

// Function to connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri) // Use the validated URI
    console.log('Connected to MongoDB')
  } catch (error) {
    // Use a type guard to ensure 'error' is an instance of Error
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message)
    } else {
      console.error('An unknown error occurred')
    }
  }
}

// Call the function to connect to the database
connectToDatabase()

// A simple route for testing server operation
app.get('/', (req, res) => {
  res.send('Hello Node!')
})

// Start the server on the selected port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
