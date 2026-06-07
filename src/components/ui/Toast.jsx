export default function Toast({ toast }) {
  if (!toast) return null

  const tones = {
    success: 'border-emerald-600/60 bg-emerald-950/80 text-emerald-300',
    info: 'border-sky-600/60 bg-sky-950/80 text-sky-300',
    warning: 'border-amber-600/60 bg-amber-950/80 text-amber-300',
  }

  return (
    <div className={`toast-animate fixed bottom-4 right-4 z-[70] rounded-lg border px-4 py-3 text-xs font-semibold shadow-lg ${tones[toast.type] || tones.success}`}>
      {toast.msg}
    </div>
  )
}
