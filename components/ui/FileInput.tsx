import type { ComponentPropsWithoutRef } from 'react'
import { Field, fieldAria, type FieldProps } from './Field'
import { cn } from '@/lib/cn'

type FileInputProps = Omit<FieldProps, 'children'> & Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type'>

/**
 * Dépôt de CV. Les contraintes (PDF, 5 Mo) sont écrites dans l'aide et
 * revérifiées côté serveur — `accept` est un confort, pas un contrôle.
 */
export function FileInput({
  id,
  label,
  hint = 'PDF, 5 Mo maximum.',
  error,
  required,
  accept = 'application/pdf',
  className,
  ...rest
}: FileInputProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <input
        id={id}
        name={id}
        type="file"
        accept={accept}
        required={required}
        className={cn(
          'text-ink file:bg-asphalt file:text-concrete file:rounded-control hover:file:bg-gravel w-full font-mono text-sm file:me-3 file:cursor-pointer file:border-0 file:px-4 file:py-2.5 file:font-sans file:text-sm file:font-medium',
        )}
        {...fieldAria(id, { hint, error })}
        {...rest}
      />
    </Field>
  )
}
