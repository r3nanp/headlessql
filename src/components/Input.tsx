import clsx from 'clsx'
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactElement
} from 'react'

export const variants = {
  primary:
    'text-gray-900 outline- border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500',
  error:
    'font-bold border border-red-300 bg-red-50 text-red-500 focus:border-red-500 focus:ring-red-500 outline-red-400'
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label?: string
  error?: string
  icon?: ReactElement
  variant?: keyof typeof variants
}

export const InputC: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  const {
    label,
    name,
    icon,
    variant = 'primary',
    error,
    type = 'text',
    className = '',
    ...rest
  } = props

  return (
    <>
      {!!label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      {icon}

      <input
        ref={ref}
        type={type}
        name={name}
        className={clsx(
          'block w-full rounded-lg p-2.5 text-sm',
          variants[variant],
          className
        )}
        {...(label ? { id: name } : {})}
        {...rest}
      />

      {!!error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </>
  )
}

export const Input = forwardRef(InputC)
