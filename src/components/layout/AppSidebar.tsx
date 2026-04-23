import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard, GraduationCap, BookOpen, Users, UserCog, HeartHandshake,
  UserSquare2, ClipboardCheck, FlaskConical, BarChart3, Megaphone, Settings, ShieldCheck,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";

const items = [
  { title: "Overview", url: "/", icon: LayoutDashboard, end: true },
  { title: "Programs", url: "/programs", icon: GraduationCap },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Cohorts", url: "/cohorts", icon: Users },
  { title: "Faculty", url: "/faculty", icon: UserCog },
  { title: "Mentors", url: "/mentors", icon: HeartHandshake },
  { title: "Students", url: "/students", icon: UserSquare2 },
  { title: "Assessments", url: "/assessments", icon: ClipboardCheck },
  { title: "Simulations", url: "/simulations", icon: FlaskConical },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Announcements", url: "/announcements", icon: Megaphone },
  { title: "Permissions", url: "/permissions", icon: ShieldCheck },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-2 px-1.5 py-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10 backdrop-blur p-1">
            <BrandLogo size={32} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-sidebar-foreground">ABC Admin</div>
              <div className="truncate text-[11px] text-sidebar-foreground/60">African Business College</div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-sidebar-foreground/50">Workspace</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.end}
                      className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="!bg-sidebar-accent !text-sidebar-accent-foreground border-l-2 border-sidebar-primary"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
