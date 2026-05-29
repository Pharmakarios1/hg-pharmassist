import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { supabase } from "#/Integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/patients")({
  component: Patients,
});

function Patients() {
  const [rows, setRows] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    next_of_kin: "",
    allergies: "",
    chronic_diseases: "",
  });

  const load = async () => {
    let query = supabase.from("patients").select("*").order("created_at", { ascending: false });
    if (q) query = query.or(`full_name.ilike.%${q}%,phone.ilike.%${q}%`);
    const { data } = await query;
    setRows(data ?? []);
  };
  useEffect(() => {
    load();
  }, [q]);

  const save = async () => {
    const { error } = await supabase.from("patients").insert({
      full_name: form.full_name,
      age: form.age ? parseInt(form.age) : null,
      gender: form.gender || null,
      phone: form.phone || null,
      address: form.address || null,
      next_of_kin: form.next_of_kin || null,
      allergies: form.allergies || null,
      chronic_diseases: form.chronic_diseases || null,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Patient registered");
      setOpen(false);
      setForm({
        full_name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        next_of_kin: "",
        allergies: "",
        chronic_diseases: "",
      });
      load();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div>
          <h2 className="text-2xl font-bold">Patients</h2>
          <p className="text-sm text-muted-foreground">Register patients and view their history</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" /> New patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Register patient</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Full name *</Label>
                <Input
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Age</Label>
                <Input
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
              <div>
                <Label>Gender</Label>
                <Input
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Next of kin</Label>
                <Input
                  value={form.next_of_kin}
                  onChange={(e) => setForm({ ...form, next_of_kin: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Address</Label>
                <Input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Allergies</Label>
                <Textarea
                  rows={2}
                  value={form.allergies}
                  onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Chronic diseases</Label>
                <Textarea
                  rows={2}
                  value={form.chronic_diseases}
                  onChange={(e) => setForm({ ...form, chronic_diseases: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={save} disabled={!form.full_name}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone"
          className="pl-9"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No patients yet.</p>
          ) : (
            <div className="divide-y">
              {rows.map((p) => (
                <Link
                  key={p.id}
                  to="/app/patients/$id"
                  params={{ id: p.id }}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <div className="font-medium">{p.full_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {[p.age && `${p.age}y`, p.gender, p.phone].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(p.created_at).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
