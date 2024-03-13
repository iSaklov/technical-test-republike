import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { IUser } from '../interfaces/IUser'

// Define our own type that extends the Request interface with an additional user property
interface RequestWithUser extends Request {
  user?: IUser
}

const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Extract the token from the Authorization header

  if (token == null) {
    return res.sendStatus(401) // If there is no token, return status 401 Unauthorized
  }

  // Ensure JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET environment variable is not set.')
    return res.sendStatus(500) // Return server error if JWT_SECRET is not defined
  }

  const jwtSecret: Secret = process.env.JWT_SECRET as Secret

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }

    // Check if decoded is an object and contains the required fields
    if (typeof decoded === 'object' && decoded !== null && 'email' in decoded) {
      const user = decoded as IUser // Now you can assume that decoded matches IUser
      req.user = user // Store the user data in the request object
      next() // Proceed to the next middleware/handler
    } else {
      return res.sendStatus(403)
    }
  })
}

export default authenticateToken
