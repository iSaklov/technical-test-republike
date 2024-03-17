import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={`px-4 py-2 bg-primary text-sm/5 font-semibold text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
