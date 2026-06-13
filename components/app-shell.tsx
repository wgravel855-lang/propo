import { Sidebar } from "@/components/sidebar"
import { CommandPalette } from "@/components/command-palette"
import { SaveProvider } from "@/components/save-provider"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SaveProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <main className="flex flex-1 overflow-hidden">{children}</main>
        <CommandPalette />
      </div>
    </SaveProvider>
  )
}
