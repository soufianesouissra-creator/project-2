import type { ComponentPropsWithoutRef } from 'react'
import { CONTROL_CLASSES, Field, fieldAria, type FieldProps } from './Field'
import { cn } from '@/lib/cn'

export interface SelectOption {
  readonly value: string
  readonly label: string
}

type SelectProps = Omit<FieldProps, 'children'> &
  Omit<ComponentPropsWithoutRef<'select'>, 'id'> & {
    readonly options: readonly SelectOption[]
    readonly placeholder?: string
  }

/**
 * `select` natif, pas de menu maison. Sur un téléphone posé sur un tableau de
 * bord, le sélecteur du système bat n'importe quelle liste déroulante réécrite.
 */
export function Select({
  id,
  label,
  hint,
  error,
  required,
  options,
  placeholder,
  className,
  ...rest
}: SelectProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue={placeholder ? '' : undefined}
        className={cn(CONTROL_CLASSES, 'appearance-none bg-[length:12px] bg-no-repeat pe-9')}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23121315' stroke-width='2'/%3E%3C/svg%3E\")",
          backgroundPosition: 'right 12px center',
        }}
        {...fieldAria(id, { hint, error })}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  )
}
