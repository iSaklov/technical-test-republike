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
      className={`px-4 py-2 bg-primary text-sm font-semibold text-white rounded hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-primary-10 focus:ring-offset-2 w-full transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
