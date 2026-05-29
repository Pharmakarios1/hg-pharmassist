import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { supabase } from "#/Integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/lab")({ component: Lab });

function Lab() {
  const [rows, setRows] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<any>({ test_date: new Date().toISOString().slice(0, 10) });

  const load = async () => {
    const [{ data }, { data: p }] = await Promise.all([
      supabase
        .from("lab_tests")
        .select("*, patients(full_name)")
        .order("test_date", { ascending: false })
        .limit(100),
      supabase.from("patients").select("id, full_name").order("full_name"),
    ]);
    setRows(data ?? []);
    setPatients(p ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    const { error } = await supabase.from("lab_tests").insert({
      patient_id: f.patient_id,
      test_name: f.test_name,
      result_value: f.result_value || null,
      reference_range: f.reference_range || null,
      interpretation: f.interpretation || null,
      notes: f.notes || null,
      test_date: f.test_date,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Saved");
      setOpen(false);
      setF({ test_date: new Date().toISOString().slice(0, 10) });
      load();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold">Lab Tests</h2>
          <p className="text-sm text-muted-foreground">Record lab findings</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              New result
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>New lab result</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Patient *</Label>
                <Select
                  value={f.patient_id || ""}
                  onValueChange={(v) => setF({ ...f, patient_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Test name *</Label>
                <Input
                  value={f.test_name || ""}
                  onChange={(e) => setF({ ...f, test_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={f.test_date}
                  onChange={(e) => setF({ ...f, test_date: e.target.value })}
                />
              </div>
              <div>
                <Label>Result</Label>
                <Input
                  value={f.result_value || ""}
                  onChange={(e) => setF({ ...f, result_value: e.target.value })}
                />
              </div>
              <div>
                <Label>Reference range</Label>
                <Input
                  value={f.reference_range || ""}
                  onChange={(e) => setF({ ...f, reference_range: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Interpretation</Label>
                <Textarea
                  rows={2}
                  value={f.interpretation || ""}
                  onChange={(e) => setF({ ...f, interpretation: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Notes</Label>
                <Textarea
                  rows={2}
                  value={f.notes || ""}
                  onChange={(e) => setF({ ...f, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={save} disabled={!f.patient_id || !f.test_name}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No lab results yet.</p>
          ) : (
            <div className="divide-y">
              {rows.map((r) => (
                <Link
                  key={r.id}
                  to="/app/patients/$id"
                  params={{ id: r.patient_id }}
                  className="block p-4 hover:bg-muted/50"
                >
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="font-medium">
                        {r.test_name} — {r.patients?.full_name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Result: {r.result_value || "—"}{" "}
                        {r.reference_range && `(ref ${r.reference_range})`}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{r.test_date}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
