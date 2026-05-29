import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { supabase } from "#/Integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/medicines")({ component: Medicines });

const empty = {
  name: "",
  generic_name: "",
  category: "",
  batch_no: "",
  supplier: "",
  cost_price: "",
  selling_price: "",
  stock_qty: "",
  expiry_date: "",
};

function Medicines() {
  const [rows, setRows] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [f, setF] = useState<any>(empty);

  const load = async () => {
    let query = supabase.from("medicines").select("*").order("name");
    if (q) query = query.ilike("name", `%${q}%`);
    const { data } = await query;
    setRows(data ?? []);
  };
  useEffect(() => {
    load();
  }, [q]);

  const openNew = () => {
    setEditing(null);
    setF(empty);
    setOpen(true);
  };
  const openEdit = (m: any) => {
    setEditing(m);
    setF({
      ...empty,
      ...m,
      cost_price: m.cost_price ?? "",
      selling_price: m.selling_price ?? "",
      stock_qty: m.stock_qty ?? "",
      expiry_date: m.expiry_date ?? "",
    });
    setOpen(true);
  };

  const save = async () => {
    const payload = {
      name: f.name,
      generic_name: f.generic_name || null,
      category: f.category || null,
      batch_no: f.batch_no || null,
      supplier: f.supplier || null,
      cost_price: f.cost_price ? Number(f.cost_price) : 0,
      selling_price: f.selling_price ? Number(f.selling_price) : 0,
      stock_qty: f.stock_qty ? parseInt(f.stock_qty) : 0,
      expiry_date: f.expiry_date || null,
    };
    const { error } = editing
      ? await supabase.from("medicines").update(payload).eq("id", editing.id)
      : await supabase.from("medicines").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success("Saved");
      setOpen(false);
      load();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div>
          <h2 className="text-2xl font-bold">Medicines</h2>
          <p className="text-sm text-muted-foreground">Inventory & expiry management</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}>
              <Plus className="h-4 w-4 mr-1" />
              New medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "New"} medicine</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Name *</Label>
                <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              </div>
              <div>
                <Label>Generic</Label>
                <Input
                  value={f.generic_name}
                  onChange={(e) => setF({ ...f, generic_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={f.category}
                  onChange={(e) => setF({ ...f, category: e.target.value })}
                />
              </div>
              <div>
                <Label>Batch no</Label>
                <Input
                  value={f.batch_no}
                  onChange={(e) => setF({ ...f, batch_no: e.target.value })}
                />
              </div>
              <div>
                <Label>Supplier</Label>
                <Input
                  value={f.supplier}
                  onChange={(e) => setF({ ...f, supplier: e.target.value })}
                />
              </div>
              <div>
                <Label>Cost price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={f.cost_price}
                  onChange={(e) => setF({ ...f, cost_price: e.target.value })}
                />
              </div>
              <div>
                <Label>Selling price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={f.selling_price}
                  onChange={(e) => setF({ ...f, selling_price: e.target.value })}
                />
              </div>
              <div>
                <Label>Stock qty</Label>
                <Input
                  type="number"
                  value={f.stock_qty}
                  onChange={(e) => setF({ ...f, stock_qty: e.target.value })}
                />
              </div>
              <div>
                <Label>Expiry date</Label>
                <Input
                  type="date"
                  value={f.expiry_date}
                  onChange={(e) => setF({ ...f, expiry_date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={save} disabled={!f.name}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search medicines"
          className="pl-9"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No medicines yet.</p>
          ) : (
            <div className="divide-y">
              {rows.map((m) => {
                const low = m.stock_qty < 10;
                const expSoon =
                  m.expiry_date && new Date(m.expiry_date) <= new Date(Date.now() + 90 * 864e5);
                return (
                  <button
                    key={m.id}
                    onClick={() => openEdit(m)}
                    className="w-full text-left flex items-center justify-between p-4 hover:bg-muted/50"
                  >
                    <div>
                      <div className="font-medium">
                        {m.name}{" "}
                        {m.generic_name && (
                          <span className="text-muted-foreground text-sm">({m.generic_name})</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {[m.category, m.batch_no && `Batch ${m.batch_no}`]
                          .filter(Boolean)
                          .join(" · ")}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className={low ? "text-destructive font-semibold" : ""}>
                        Stock: {m.stock_qty}
                      </div>
                      {m.expiry_date && (
                        <div className={expSoon ? "text-warning" : "text-muted-foreground"}>
                          Exp {m.expiry_date}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
