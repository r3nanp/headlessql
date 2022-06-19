import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactElement } from 'react'
import { Spinner } from './Spinner'

const variants = {
  primary:
    'bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
}

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg'
}

type IconProps =
  | { startIcon: ReactElement; endIcon?: never }
  | { endIcon: ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  size?: keyof typeof sizes
  variant?: keyof typeof variants
} & IconProps

export const Button = ({
  endIcon,
  startIcon,
  className = '',
  type = 'button',
  isLoading = false,
  size = 'md',
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'flex items-center rounded-lg bg-blue-700 text-center font-medium sm:w-auto',
        sizes[size],
        variants[variant],
        className
      )}
      {...rest}
    >
      {isLoading && <Spinner size="sm" className="text-current" />}
      {!isLoading && startIcon}
      <span className="mx-2">{rest.children}</span> {!isLoading && endIcon}
    </button>
  )
}
