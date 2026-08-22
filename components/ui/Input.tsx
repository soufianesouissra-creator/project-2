import type { ComponentPropsWithoutRef } from 'react'
import { CONTROL_CLASSES, Field, fieldAria, type FieldProps } from './Field'
import { cn } from '@/lib/cn'

type InputProps = Omit<FieldProps, 'children'> & Omit<ComponentPropsWithoutRef<'input'>, 'id'>

export function Input({ id, label, hint, error, required, className, ...rest }: InputProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <input id={id} name={id} required={required} className={cn(CONTROL_CLASSES)} {...fieldAria(id, { hint, error })} {...rest} />
    </Field>
  )
}
