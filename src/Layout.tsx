import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 flex">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}