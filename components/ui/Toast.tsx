'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ToastTone = 'confirm' | 'alert'

interface ToastMessage {
  readonly id: number
  readonly text: string
  readonly tone: ToastTone
}

const ToastContext = createContext<((text: string, tone?: ToastTone) => void) | null>(null)

/**
 * Confirmations d'envoi : « Demande envoyée », « Candidature envoyée ».
 *
 * La région est `aria-live="polite"` et présente dès le rendu initial — une
 * région insérée en même temps que son message n'est pas annoncée par tous les
 * lecteurs d'écran.
 */
export function ToastProvider({ children }: { readonly children: ReactNode }) {
  const [messages, setMessages] = useState<readonly ToastMessage[]>([])

  const push = useCallback((text: string, tone: ToastTone = 'confirm') => {
    setMessages((current) => [...current, { id: Date.now() + current.length, text, tone }])
  }, [])

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:end-6 sm:items-end"
      >
        {messages.map((message) => (
          <ToastItem
            key={message.id}
            message={message}
            onDone={() => setMessages((current) => current.filter((item) => item.id !== message.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const push = useContext(ToastContext)
  if (!push) throw new Error('useToast doit être utilisé sous <ToastProvider>.')
  return push
}

function ToastItem({ message, onDone }: { readonly message: ToastMessage; readonly onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 5000)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-center gap-3 px-4 py-3 font-mono text-sm shadow-none',
        message.tone === 'alert' ? 'bg-signal text-limestone' : 'bg-asphalt text-concrete',
      )}
    >
      <span aria-hidden className={cn('size-1.5', message.tone === 'alert' ? 'bg-limestone' : 'bg-marking')} />
      {message.text}
    </div>
  )
}
