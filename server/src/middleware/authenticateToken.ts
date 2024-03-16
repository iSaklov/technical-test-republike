import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

// Define our own type that extends the Request interface with an additional user property
export interface RequestWithUserId extends Request {
  userId?: string
}

const authenticateToken = (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Extract the token from the Authorization header
  console.log('token', token)

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
      return res.sendStatus(403) // Token is invalid or expired
    }

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      // Directly attaching the user ID to the request for clarity and direct access
      req.userId = decoded.id
      next()
    } else {
      return res.sendStatus(403) // Decoded token structure is not as expected
    }
  })
}

export default authenticateToken
