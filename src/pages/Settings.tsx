import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  return (
    <>
      <PageHeader title="Settings" subtitle="Institution configuration" />
      <Tabs defaultValue="institution">
        <TabsList>
          <TabsTrigger value="institution">Institution</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="institution" className="mt-4">
          <Card className="shadow-elev-sm">
            <CardHeader><CardTitle className="text-base">Institution profile</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div><label className="text-xs text-muted-foreground">Name</label><Input className="mt-1" defaultValue="Africa Business College" /></div>
              <div><label className="text-xs text-muted-foreground">Short code</label><Input className="mt-1" defaultValue="ABC" /></div>
              <div className="md:col-span-2"><label className="text-xs text-muted-foreground">Description</label><Textarea className="mt-1" rows={3} defaultValue="A pan-African business college shaping the next generation of leaders, entrepreneurs and operators." /></div>
              <div><label className="text-xs text-muted-foreground">Primary contact</label><Input className="mt-1" defaultValue="dean@abc.edu" /></div>
              <div><label className="text-xs text-muted-foreground">HQ Country</label><Input className="mt-1" defaultValue="Nigeria" /></div>
              <div className="md:col-span-2 flex justify-end"><Button className="bg-gradient-primary">Save changes</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="mt-4">
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Branding</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-2"><div><label className="text-xs text-muted-foreground">Primary color</label><div className="mt-1 flex items-center gap-2"><div className="h-9 w-9 rounded-md bg-primary border border-border" /><Input defaultValue="#1B3266" /></div></div><div><label className="text-xs text-muted-foreground">Accent color</label><div className="mt-1 flex items-center gap-2"><div className="h-9 w-9 rounded-md bg-accent border border-border" /><Input defaultValue="#D4A028" /></div></div></CardContent></Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Notification rules</CardTitle></CardHeader><CardContent className="space-y-3">{[["At-risk student alerts","Notify when a student's risk level becomes high"],["Faculty workload","Alert when any faculty exceeds 85% workload"],["Cohort engagement","Daily digest of low-engagement cohorts"],["Simulation events","Notify when simulations launch or complete"]].map(([t,d])=>(<div key={t} className="flex items-center justify-between border-b border-border pb-3 last:border-0"><div><p className="text-sm font-medium">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div><Switch defaultChecked /></div>))}</CardContent></Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Security</CardTitle></CardHeader><CardContent className="space-y-3">{[["Two-factor authentication","Required for all admins"],["Single sign-on (SAML)","Use your identity provider"],["Session timeout","Auto sign-out after 30 minutes of inactivity"],["Audit log","Track all admin actions"]].map(([t,d])=>(<div key={t} className="flex items-center justify-between border-b border-border pb-3 last:border-0"><div><p className="text-sm font-medium">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div><Switch defaultChecked /></div>))}</CardContent></Card>
        </TabsContent>

        <TabsContent value="system" className="mt-4">
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">System</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Version</span><span className="font-medium tabular-nums">v1.0.0</span></div><div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Region</span><span className="font-medium">eu-west</span></div><div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Storage used</span><span className="font-medium tabular-nums">12.4 GB</span></div><div className="flex justify-between"><span className="text-muted-foreground">Last backup</span><span className="font-medium">2 hours ago</span></div></CardContent></Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Settings;
