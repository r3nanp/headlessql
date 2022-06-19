import clsx from 'clsx'
import {
  forwardRef,
  ForwardRefRenderFunction,
  TextareaHTMLAttributes
} from 'react'
import { variants } from './Input'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label?: string
  error?: string
  variant?: keyof typeof variants
}

export const TextAreaC: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = (props, ref) => {
  const {
    variant = 'primary',
    className = '',
    name,
    error,
    label,
    ...rest
  } = props

  return (
    <>
      {!!label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          {label}
        </label>
      )}

      <textarea
        ref={ref}
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

export const TextArea = forwardRef(TextAreaC)
