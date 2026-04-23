import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { Check, Trash2, Bell } from "lucide-react";
import { toast } from "sonner";

const Notifications = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, removeNotification } = useStore();

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="System alerts, enrollments, faculty and operational events"
        actions={
          <Button variant="outline" size="sm" onClick={() => { markAllNotificationsRead(); toast.success("All marked as read"); }}>
            <Check className="h-4 w-4" /> Mark all read
          </Button>
        }
      />
      <Card className="shadow-elev-sm">
        <CardContent className="p-0">
          {notifications.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <Bell className="mx-auto h-8 w-8 opacity-50" /> <p className="mt-2 text-sm">No notifications</p>
            </div>
          )}
          {notifications.map((n) => (
            <div key={n.id} className={cn("flex items-start gap-3 border-b border-border p-4 last:border-0", !n.read && "bg-primary/5")}>
              <span className={cn("mt-1.5 h-2 w-2 rounded-full shrink-0",
                n.severity === "critical" && "bg-destructive",
                n.severity === "warning" && "bg-warning",
                n.severity === "success" && "bg-success",
                n.severity === "info" && "bg-info",
              )} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{n.title}</p>
                  <Badge variant="outline" className="text-[10px] capitalize">{n.severity}</Badge>
                  <span className="ml-auto text-xs text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{n.description}</p>
              </div>
              <div className="flex gap-1">
                {!n.read && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => markNotificationRead(n.id)} title="Mark read"><Check className="h-3.5 w-3.5" /></Button>}
                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeNotification(n.id)} title="Dismiss"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default Notifications;
