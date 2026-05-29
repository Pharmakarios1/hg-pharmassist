import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { supabase } from "#/Integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/sales")({ component: Sales });

interface Item {
  medicine_id: string;
  medicine_name: string;
  quantity: number;
  unit_price: number;
  dose: string;
  frequency: string;
  duration: string;
  counseling: string;
}

function Sales() {
  const [patients, setPatients] = useState<any[]>([]);
  const [meds, setMeds] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [patientId, setPatientId] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);

  const load = async () => {
    const [{ data: p }, { data: m }, { data: r }] = await Promise.all([
      supabase.from("patients").select("id, full_name").order("full_name"),
      supabase.from("medicines").select("*").gt("stock_qty", 0).order("name"),
      supabase
        .from("sales")
        .select("*, patients(full_name), sale_items(*)")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);
    setPatients(p ?? []);
    setMeds(m ?? []);
    setRecent(r ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const addItem = (medId: string) => {
    const m = meds.find((x) => x.id === medId);
    if (!m) return;
    setItems([
      ...items,
      {
        medicine_id: m.id,
        medicine_name: m.name,
        quantity: 1,
        unit_price: Number(m.selling_price) || 0,
        dose: "",
        frequency: "",
        duration: "",
        counseling: "",
      },
    ]);
  };
  const update = (i: number, k: keyof Item, v: any) => {
    const c = [...items];
    (c[i] as any)[k] = v;
    setItems(c);
  };
  const remove = (i: number) => setItems(items.filter((_, x) => x !== i));
  const total = items.reduce((s, i) => s + i.quantity * i.unit_price, 0);

  const dispense = async () => {
    if (items.length === 0) {
      toast.error("Add at least one item");
      return;
    }
    const { data: sale, error } = await supabase
      .from("sales")
      .insert({
        patient_id: patientId || null,
        total,
      })
      .select()
      .single();
    if (error || !sale) {
      toast.error(error?.message ?? "Failed");
      return;
    }
    const { error: e2 } = await supabase
      .from("sale_items")
      .insert(items.map((i) => ({ ...i, sale_id: sale.id })));
    if (e2) {
      toast.error(e2.message);
      return;
    }
    toast.success("Dispensed and stock updated");
    setItems([]);
    setPatientId("");
    load();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Dispensing</h2>
        <p className="text-sm text-muted-foreground">
          Create a sale and deduct stock automatically
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            New dispensing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Patient (optional)</Label>
              <Select value={patientId} onValueChange={setPatientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Walk-in / select patient" />
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
              <Label>Add medicine</Label>
              <Select value="" onValueChange={addItem}>
                <SelectTrigger>
                  <SelectValue placeholder="Pick a medicine" />
                </SelectTrigger>
                <SelectContent>
                  {meds.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name} — stock {m.stock_qty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((it, i) => (
                <div key={i} className="rounded-lg border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{it.medicine_name}</span>
                    <Button size="icon" variant="ghost" onClick={() => remove(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-2 md:grid-cols-5">
                    <div>
                      <Label className="text-xs">Qty</Label>
                      <Input
                        type="number"
                        min={1}
                        value={it.quantity}
                        onChange={(e) => update(i, "quantity", parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Unit price</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={it.unit_price}
                        onChange={(e) => update(i, "unit_price", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Dose</Label>
                      <Input value={it.dose} onChange={(e) => update(i, "dose", e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Frequency</Label>
                      <Input
                        value={it.frequency}
                        onChange={(e) => update(i, "frequency", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Duration</Label>
                      <Input
                        value={it.duration}
                        onChange={(e) => update(i, "duration", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Counseling</Label>
                    <Input
                      value={it.counseling}
                      onChange={(e) => update(i, "counseling", e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-lg font-semibold">Total: {total.toFixed(2)}</span>
                <Button onClick={dispense}>
                  <Plus className="h-4 w-4 mr-1" />
                  Dispense
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent dispensing</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recent.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">None yet.</p>
          ) : (
            <div className="divide-y">
              {recent.map((s) => (
                <div key={s.id} className="p-4 text-sm">
                  <div className="flex justify-between">
                    <div className="font-medium">{s.patients?.full_name ?? "Walk-in"}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(s.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    {s.sale_items?.length ?? 0} items · Total {Number(s.total).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
