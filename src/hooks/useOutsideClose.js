import { useEffect } from 'react'

// Calls onClose when a click lands outside ref's element while `open` is true.
export function useOutsideClose(ref, open, onClose) {
  useEffect(() => {
    if (!open) return undefined
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) onClose()
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [ref, open, onClose])
}
