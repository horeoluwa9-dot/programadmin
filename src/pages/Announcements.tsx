import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Send, Calendar, Eye } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Announcements = () => {
  const announcements = useStore((s) => s.announcements);
  const addAnnouncement = useStore((s) => s.addAnnouncement);
  const [audience, setAudience] = useState("All students");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const reset = () => { setSubject(""); setBody(""); };

  const send = () => {
    if (!subject.trim() || !body.trim()) return toast.error("Subject and message required");
    addAnnouncement({ title: subject, body, audience, sentAt: new Date().toISOString().slice(0,10), status: "sent" });
    toast.success("Announcement sent");
    reset();
  };

  const schedule = () => {
    if (!subject.trim() || !body.trim()) return toast.error("Subject and message required");
    addAnnouncement({ title: subject, body, audience, sentAt: "", status: "scheduled" });
    toast.success("Announcement scheduled");
    reset();
  };

  return (
    <>
      <PageHeader title="Announcements" subtitle="Send messages to programs, cohorts or individuals" />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-elev-sm">
          <CardHeader><CardTitle className="text-base">Compose announcement</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><label className="text-xs font-medium text-muted-foreground">Audience</label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All students">All students</SelectItem>
                  <SelectItem value="All faculty">All faculty</SelectItem>
                  <SelectItem value="By program">By program</SelectItem>
                  <SelectItem value="By cohort">By cohort</SelectItem>
                  <SelectItem value="Individuals">Individuals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><label className="text-xs font-medium text-muted-foreground">Subject</label><Input className="mt-1" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Announcement title" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Message</label><Textarea className="mt-1" rows={6} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your message…" /></div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm" onClick={schedule}><Calendar className="h-4 w-4" /> Schedule</Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4" /> Preview</Button>
                <Button size="sm" className="bg-gradient-primary" onClick={send}><Send className="h-4 w-4" /> Send now</Button>
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

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Preview — {subject || "Untitled"}</DialogTitle></DialogHeader>
          <div className="rounded-md border border-border p-4 bg-muted/30">
            <p className="text-xs text-muted-foreground">To: {audience}</p>
            <h3 className="mt-2 text-base font-semibold">{subject || "—"}</h3>
            <p className="mt-2 text-sm whitespace-pre-wrap">{body || "—"}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Announcements;
