import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { announcements } from "@/data/mock";
import { Megaphone, Send, Calendar } from "lucide-react";
import { toast } from "sonner";

const Announcements = () => {
  return (
    <>
      <PageHeader title="Announcements" subtitle="Send messages to programs, cohorts or individuals" />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-elev-sm">
          <CardHeader><CardTitle className="text-base">Compose announcement</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><label className="text-xs font-medium text-muted-foreground">Audience</label>
              <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select audience" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All students</SelectItem><SelectItem value="prog">By program</SelectItem><SelectItem value="cohort">By cohort</SelectItem><SelectItem value="ind">Individuals</SelectItem></SelectContent>
              </Select>
            </div>
            <div><label className="text-xs font-medium text-muted-foreground">Subject</label><Input className="mt-1" placeholder="Announcement title" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Message</label><Textarea className="mt-1" rows={6} placeholder="Write your message…" /></div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm"><Calendar className="h-4 w-4" /> Schedule</Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Preview</Button>
                <Button size="sm" className="bg-gradient-primary" onClick={()=>toast.success("Announcement sent")}><Send className="h-4 w-4" /> Send now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-elev-sm">
          <CardHeader><CardTitle className="text-base">Recent announcements</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {announcements.map((a)=>(<div key={a.id} className="border-b border-border pb-2 last:border-0"><div className="flex items-center justify-between"><p className="text-sm font-medium">{a.title}</p><Badge variant="outline" className="capitalize text-[10px]">{a.status}</Badge></div><p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{a.body}</p><p className="mt-1 text-[10px] text-muted-foreground"><Megaphone className="h-3 w-3 inline mr-0.5" /> {a.audience}{a.sentAt && ` · ${a.sentAt}`}</p></div>))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Announcements;
