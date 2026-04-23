import { useState, useMemo } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, MessageSquare, Search, Sparkles, ChevronDown, LogOut, User, Settings as SettingsIcon, X, Check } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAIAssistant } from "@/components/ai/AIAssistantProvider";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";

export function TopBar() {
  const { open: openAI } = useAIAssistant();
  const navigate = useNavigate();
  const notifications = useStore((s) => s.notifications);
  const messages = useStore((s) => s.messages);
  const markAllRead = useStore((s) => s.markAllNotificationsRead);
  const markNotifRead = useStore((s) => s.markNotificationRead);
  const markMsgRead = useStore((s) => s.markMessageRead);
  const programs = useStore((s) => s.programs);
  const cohorts = useStore((s) => s.cohorts);
  const students = useStore((s) => s.students);
  const courses = useStore((s) => s.courses);

  const [cmdOpen, setCmdOpen] = useState(false);

  const unreadNotifs = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
  const unreadMsgs = useMemo(() => messages.filter((m) => !m.read).length, [messages]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-card/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <SidebarTrigger className="text-foreground" />

        <button
          onClick={() => setCmdOpen(true)}
          className="relative ml-2 hidden flex-1 max-w-md md:flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 h-9 text-left text-sm text-muted-foreground hover:bg-muted transition"
        >
          <Search className="h-4 w-4" />
          Search programs, cohorts, students…
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-card px-1.5 font-mono text-[10px] font-medium">⌘K</kbd>
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <Button onClick={openAI} size="sm" className="h-9 gap-1.5 bg-gradient-gold text-accent-foreground hover:opacity-90 shadow-gold">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground px-1">{unreadNotifs}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96 p-0">
              <div className="flex items-center justify-between border-b border-border p-3">
                <p className="text-sm font-semibold">Notifications</p>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={markAllRead}>
                  <Check className="h-3 w-3" /> Mark all read
                </Button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">All clear ✨</p>}
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => { markNotifRead(n.id); navigate("/notifications"); }}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-border p-3 text-left hover:bg-muted/50 transition",
                      !n.read && "bg-primary/5"
                    )}
                  >
                    <span className={cn("mt-1 h-2 w-2 rounded-full shrink-0",
                      n.severity === "critical" && "bg-destructive",
                      n.severity === "warning" && "bg-warning",
                      n.severity === "success" && "bg-success",
                      n.severity === "info" && "bg-info",
                    )} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{n.description}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="border-t border-border p-2">
                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate("/notifications")}>View all</Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Messages */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative" aria-label="Messages">
                <MessageSquare className="h-4 w-4" />
                {unreadMsgs > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground px-1">{unreadMsgs}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96 p-0">
              <div className="flex items-center justify-between border-b border-border p-3">
                <p className="text-sm font-semibold">Messages</p>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => navigate("/messages")}>Open inbox</Button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {messages.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { markMsgRead(m.id); navigate("/messages"); }}
                    className={cn("flex w-full items-start gap-3 border-b border-border p-3 text-left hover:bg-muted/50 transition", !m.read && "bg-primary/5")}
                  >
                    <Avatar className="h-9 w-9 shrink-0"><AvatarFallback className="text-xs bg-primary/10 text-primary">{m.from.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback></Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-medium truncate">{m.from}</p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{m.time}</span>
                      </div>
                      <p className="text-xs font-medium truncate">{m.subject}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{m.preview}</p>
                    </div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 gap-2 pl-1.5 pr-2">
                <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary text-primary-foreground text-xs">AD</AvatarFallback></Avatar>
                <div className="hidden lg:flex flex-col items-start leading-tight">
                  <span className="text-xs font-medium">Adaeze Director</span>
                  <span className="text-[10px] text-muted-foreground">Program Admin</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm">Adaeze Director</span>
                  <span className="text-xs text-muted-foreground">adaeze@abc.edu</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}><User className="h-4 w-4 mr-2" />Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}><SettingsIcon className="h-4 w-4 mr-2" />Workspace settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/permissions")}>
                Switch role <Badge variant="outline" className="ml-auto text-[10px]">Super Admin</Badge>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.success("Signed out")}><LogOut className="h-4 w-4 mr-2" />Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <CommandInput placeholder="Search across the institution…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Programs">
            {programs.slice(0, 6).map((p) => (
              <CommandItem key={p.id} onSelect={() => { setCmdOpen(false); navigate(`/programs/${p.id}`); }}>{p.title}</CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Cohorts">
            {cohorts.slice(0, 6).map((c) => (
              <CommandItem key={c.id} onSelect={() => { setCmdOpen(false); navigate(`/cohorts/${c.id}`); }}>{c.name}</CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Courses">
            {courses.slice(0, 6).map((c) => (
              <CommandItem key={c.id} onSelect={() => { setCmdOpen(false); navigate(`/courses/${c.id}`); }}>{c.title}</CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Students">
            {students.slice(0, 6).map((s) => (
              <CommandItem key={s.id} onSelect={() => { setCmdOpen(false); navigate(`/students/${s.id}`); }}>{s.name}</CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
