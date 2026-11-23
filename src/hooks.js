import { useEffect } from 'react'

// Calls onClose when a click lands outside ref's element while open is true.
export function useOutsideClose(ref, open, onClose) {
  useEffect(() => {
    if (!open) return undefined
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [ref, open, onClose])
}
