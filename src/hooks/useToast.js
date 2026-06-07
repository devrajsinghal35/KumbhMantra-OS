import { useCallback, useRef, useState } from 'react'

export default function useToast() {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type })
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setToast(null), 3000)
  }, [])

  return { toast, showToast, clearToast: () => setToast(null) }
}
