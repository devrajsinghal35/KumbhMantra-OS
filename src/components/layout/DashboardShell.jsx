export default function DashboardShell({ children }) {
  return (
    <div className="flex-1 overflow-hidden">
      <main className="h-full overflow-auto p-4">{children}</main>
    </div>
  )
}
