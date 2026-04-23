import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("Adaeze Director");
  const [email, setEmail] = useState("adaeze@abc.edu");
  const [phone, setPhone] = useState("+234 802 555 0142");
  const [bio, setBio] = useState("Program Director at Africa Business College. 12 years in higher-ed leadership across Lagos, Nairobi and Cape Town.");
  const [location, setLocation] = useState("Lagos, Nigeria");

  return (
    <>
      <PageHeader title="Profile" subtitle="Your personal account information" />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="shadow-elev-sm lg:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="h-24 w-24 mx-auto"><AvatarFallback className="text-2xl bg-primary text-primary-foreground">AD</AvatarFallback></Avatar>
            <h3 className="mt-3 text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
            <Badge className="mt-2 bg-accent text-accent-foreground">Super Admin</Badge>
            <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => toast.success("Avatar update coming soon")}>Change avatar</Button>
          </CardContent>
        </Card>

        <Card className="shadow-elev-sm lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Personal information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block"><span className="text-xs font-medium">Full name</span><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" /></label>
              <label className="block"><span className="text-xs font-medium">Email</span><Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" /></label>
              <label className="block"><span className="text-xs font-medium">Phone</span><Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" /></label>
              <label className="block"><span className="text-xs font-medium">Location</span><Input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1.5" /></label>
            </div>
            <label className="block"><span className="text-xs font-medium">Bio</span><Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-1.5" /></label>
            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button variant="outline" onClick={() => toast.info("Changes discarded")}>Discard</Button>
              <Button className="bg-gradient-primary text-primary-foreground" onClick={() => toast.success("Profile updated")}>Save changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
