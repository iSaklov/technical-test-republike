import React, { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-between">
      {/* Left side with brand background and logo */}
      <div className="w-1/2 bg-primary flex items-center justify-center">
        <div>
          <img
            src="/assets/logo.svg"
            alt="Logo"
            className="h-[124px] w-[124px]"
          />
        </div>
      </div>
      {/* Right side for the auth forms */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[472px] p-8 rounded-lg shadow-md">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
