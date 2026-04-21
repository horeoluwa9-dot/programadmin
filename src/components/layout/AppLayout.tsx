import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { Outlet } from "react-router-dom";
import { AIAssistantProvider, AIAssistantPanel } from "@/components/ai/AIAssistantProvider";

export function AppLayout() {
  return (
    <SidebarProvider defaultOpen>
      <AIAssistantProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col">
            <TopBar />
            <main className="flex-1 overflow-x-hidden">
              <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6 animate-fade-in">
                <Outlet />
              </div>
            </main>
          </SidebarInset>
          <AIAssistantPanel />
        </div>
      </AIAssistantProvider>
    </SidebarProvider>
  );
}
