import React, { createContext, useContext, useState, ReactNode } from 'react'
import { IUser } from '../interfaces/IUser'

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, user: IUser) => void
  logout: () => void
  user: IUser | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('token'),
  )
  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null // Restoring user data from localStorage upon initialization
  })

  const login = (token: string, userData: IUser) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData)) // Saving user data to localStorage
    setUser(userData) // Updating user state in context
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
