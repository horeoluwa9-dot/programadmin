import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Crown, GraduationCap, HeartHandshake, UserSquare2, UserCog } from "lucide-react";

const roles = [
  { id: "super", name: "Super Admin", icon: Crown, count: 2, accent: "text-accent" },
  { id: "prog", name: "Program Admin", icon: ShieldCheck, count: 5, accent: "text-primary" },
  { id: "fac", name: "Faculty", icon: UserCog, count: 7, accent: "text-info" },
  { id: "men", name: "Mentor", icon: HeartHandshake, count: 6, accent: "text-success" },
  { id: "stu", name: "Student", icon: UserSquare2, count: 2536, accent: "text-muted-foreground" },
];

const permissions = [
  { name: "Manage programs", super: true, prog: true, fac: false, men: false, stu: false },
  { name: "Edit courses", super: true, prog: true, fac: true, men: false, stu: false },
  { name: "Grade assignments", super: true, prog: true, fac: true, men: false, stu: false },
  { name: "Launch simulations", super: true, prog: true, fac: true, men: false, stu: false },
  { name: "View analytics", super: true, prog: true, fac: true, men: true, stu: false },
  { name: "Send announcements", super: true, prog: true, fac: false, men: false, stu: false },
  { name: "Manage users", super: true, prog: false, fac: false, men: false, stu: false },
  { name: "Configure billing", super: true, prog: false, fac: false, men: false, stu: false },
];

const Permissions = () => {
  return (
    <>
      <PageHeader title="Permissions / RBAC" subtitle="Roles and permissions across the institution" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 mb-4">
        {roles.map((r) => (
          <Card key={r.id} className="shadow-elev-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted"><r.icon className={`h-4 w-4 ${r.accent}`} /></div>
              <div><p className="text-xs text-muted-foreground">{r.name}</p><p className="kpi-number text-base">{r.count.toLocaleString()}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="shadow-elev-sm">
        <CardHeader><CardTitle className="text-base flex items-center justify-between">Permission matrix <Badge variant="outline">Read-only preview</Badge></CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Capability</TableHead>
                <TableHead className="text-center">Super Admin</TableHead>
                <TableHead className="text-center">Program Admin</TableHead>
                <TableHead className="text-center">Faculty</TableHead>
                <TableHead className="text-center">Mentor</TableHead>
                <TableHead className="text-center">Student</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((p) => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium text-sm">{p.name}</TableCell>
                  <TableCell className="text-center"><Switch defaultChecked={p.super} /></TableCell>
                  <TableCell className="text-center"><Switch defaultChecked={p.prog} /></TableCell>
                  <TableCell className="text-center"><Switch defaultChecked={p.fac} /></TableCell>
                  <TableCell className="text-center"><Switch defaultChecked={p.men} /></TableCell>
                  <TableCell className="text-center"><Switch defaultChecked={p.stu} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Permissions;
