import { useLayoutEffect, useState } from 'react'

// Tracks an element's size with ResizeObserver, so SVG charts can draw at the real box size.
export function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => {
      setSize({ width: Math.round(el.clientWidth), height: Math.round(el.clientHeight) })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return size
}
