import { Sidebar } from "@/components/sidebar"
import { CommandPalette } from "@/components/command-palette"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex flex-1 overflow-hidden">{children}</main>
      <CommandPalette />
    </div>
  )
}
