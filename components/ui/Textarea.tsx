import type { ComponentPropsWithoutRef } from 'react'
import { CONTROL_CLASSES, Field, fieldAria, type FieldProps } from './Field'
import { cn } from '@/lib/cn'

type TextareaProps = Omit<FieldProps, 'children'> & Omit<ComponentPropsWithoutRef<'textarea'>, 'id'>

export function Textarea({ id, label, hint, error, required, rows = 4, className, ...rest }: TextareaProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        className={cn(CONTROL_CLASSES, 'h-auto resize-y py-2.5 leading-relaxed')}
        {...fieldAria(id, { hint, error })}
        {...rest}
      />
    </Field>
  )
}
