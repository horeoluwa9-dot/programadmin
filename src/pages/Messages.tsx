import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { Send, Trash2, Reply, Plus } from "lucide-react";
import { toast } from "sonner";
import { FormDialog, FormField } from "@/components/forms/FormDialog";
import { Input } from "@/components/ui/input";

const Messages = () => {
  const { messages, markMessageRead, removeMessage } = useStore();
  const [active, setActive] = useState<string | null>(messages[0]?.id ?? null);
  const [reply, setReply] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const msg = messages.find((m) => m.id === active);

  return (
    <>
      <PageHeader
        title="Messages"
        subtitle="Inbox from faculty, mentors, and the leadership team"
        actions={<Button size="sm" className="bg-gradient-primary text-primary-foreground" onClick={() => setComposeOpen(true)}><Plus className="h-4 w-4" /> Compose</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="shadow-elev-sm lg:col-span-1">
          <CardContent className="p-0">
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => { setActive(m.id); markMessageRead(m.id); }}
                className={cn("flex w-full items-start gap-3 border-b border-border p-3 text-left hover:bg-muted/50",
                  active === m.id && "bg-muted",
                  !m.read && "bg-primary/5"
                )}
              >
                <Avatar className="h-9 w-9 shrink-0"><AvatarFallback className="text-xs bg-primary/10 text-primary">{m.from.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2"><p className="text-sm font-medium truncate">{m.from}</p><span className="text-[10px] text-muted-foreground shrink-0">{m.time}</span></div>
                  <p className="text-xs font-medium truncate">{m.subject}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{m.preview}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-elev-sm lg:col-span-2">
          <CardContent className="p-5">
            {!msg && <p className="text-sm text-muted-foreground text-center py-12">Select a message</p>}
            {msg && (
              <>
                <div className="flex items-start justify-between gap-3 border-b border-border pb-3 mb-3">
                  <div>
                    <h3 className="text-base font-semibold">{msg.subject}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">From {msg.from} · {msg.fromRole} · {msg.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => { removeMessage(msg.id); setActive(messages.find(x => x.id !== msg.id)?.id ?? null); toast.success("Deleted"); }}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.body}</p>
                <div className="mt-5 border-t border-border pt-3">
                  <p className="text-xs font-medium mb-2 flex items-center gap-1"><Reply className="h-3.5 w-3.5" /> Reply</p>
                  <Textarea rows={3} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply…" />
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" className="bg-gradient-primary text-primary-foreground" onClick={() => { if(!reply.trim()) return toast.error("Reply is empty"); toast.success(`Reply sent to ${msg.from}`); setReply(""); }}><Send className="h-3.5 w-3.5" /> Send reply</Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <FormDialog
        open={composeOpen} onOpenChange={setComposeOpen}
        title="New message" submitLabel="Send"
        onSubmit={() => { if(!to || !subject) return toast.error("To and subject required"); toast.success(`Message sent to ${to}`); setComposeOpen(false); setTo(""); setSubject(""); setBody(""); }}
      >
        <FormField label="To" required><Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="recipient@abc.edu" /></FormField>
        <FormField label="Subject" required><Input value={subject} onChange={(e) => setSubject(e.target.value)} /></FormField>
        <FormField label="Message"><Textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} /></FormField>
      </FormDialog>
    </>
  );
};

export default Messages;
