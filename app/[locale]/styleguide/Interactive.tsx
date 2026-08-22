'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { useToast } from '@/components/ui/Toast'

/** Déclencheurs des composants qui n'existent qu'à l'état ouvert. */
export function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Ouvrir la boîte de dialogue
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Confirmer la demande">
        <p className="text-ink/80">
          Bâtie sur l’élément <code className="font-mono text-sm">&lt;dialog&gt;</code> natif : piège de
          focus, touche Échap et couche d’inertie viennent du navigateur.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => setOpen(false)}>Envoyer la demande</Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Retour
          </Button>
        </div>
      </Dialog>
    </>
  )
}

export function ToastDemo() {
  const push = useToast()
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => push('Demande envoyée')}>
        Confirmation
      </Button>
      <Button
        variant="ghost"
        onClick={() => push('L’envoi a échoué. Réessayez ou appelez le [TEL].', 'alert')}
      >
        Erreur
      </Button>
    </div>
  )
}
