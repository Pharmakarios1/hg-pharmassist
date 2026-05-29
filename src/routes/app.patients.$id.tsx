import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { supabase } from "#/Integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/patients/$id")({
  component: PatientDetail,
});

function PatientDetail() {
  const { id } = Route.useParams();
  const [p, setP] = useState<any>(null);
  const [cons, setCons] = useState<any[]>([]);
  const [labs, setLabs] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [showCons, setShowCons] = useState(false);
  const [showLab, setShowLab] = useState(false);
  const [c, setC] = useState<any>({});
  const [l, setL] = useState<any>({});

  const load = async () => {
    const [{ data: pat }, { data: cs }, { data: ls }, { data: ss }] = await Promise.all([
      supabase.from("patients").select("*").eq("id", id).single(),
      supabase
        .from("consultations")
        .select("*")
        .eq("patient_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("lab_tests")
        .select("*")
        .eq("patient_id", id)
        .order("test_date", { ascending: false }),
      supabase
        .from("sales")
        .select("*, sale_items(*)")
        .eq("patient_id", id)
        .order("created_at", { ascending: false }),
    ]);
    setP(pat);
    setCons(cs ?? []);
    setLabs(ls ?? []);
    setSales(ss ?? []);
  };
  useEffect(() => {
    load();
  }, [id]);

  const saveCons = async () => {
    const { error } = await supabase
      .from("consultations")
      .insert({ patient_id: id, ...c, follow_up_date: c.follow_up_date || null });
    if (error) toast.error(error.message);
    else {
      toast.success("Consultation saved");
      setShowCons(false);
      setC({});
      load();
    }
  };
  const saveLab = async () => {
    const { error } = await supabase.from("lab_tests").insert({ patient_id: id, ...l });
    if (error) toast.error(error.message);
    else {
      toast.success("Lab result saved");
      setShowLab(false);
      setL({});
      load();
    }
  };

  if (!p) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-4">
      <Link
        to="/app/patients"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>{p.full_name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3 text-sm">
          <div>
            <span className="text-muted-foreground">Age:</span> {p.age ?? "—"}
          </div>
          <div>
            <span className="text-muted-foreground">Gender:</span> {p.gender ?? "—"}
          </div>
          <div>
            <span className="text-muted-foreground">Phone:</span> {p.phone ?? "—"}
          </div>
          <div className="md:col-span-3">
            <span className="text-muted-foreground">Address:</span> {p.address ?? "—"}
          </div>
          <div className="md:col-span-3">
            <span className="text-muted-foreground">Allergies:</span>{" "}
            <span className="text-destructive">{p.allergies ?? "—"}</span>
          </div>
          <div className="md:col-span-3">
            <span className="text-muted-foreground">Chronic:</span> {p.chronic_diseases ?? "—"}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cons">
        <TabsList>
          <TabsTrigger value="cons">Consultations ({cons.length})</TabsTrigger>
          <TabsTrigger value="lab">Lab ({labs.length})</TabsTrigger>
          <TabsTrigger value="dispense">Dispensing ({sales.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="cons" className="space-y-3">
          {!showCons && (
            <Button size="sm" onClick={() => setShowCons(true)}>
              <Plus className="h-4 w-4 mr-1" />
              New consultation
            </Button>
          )}
          {showCons && (
            <Card>
              <CardContent className="space-y-3 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Label>Chief complaints</Label>
                    <Textarea
                      rows={2}
                      value={c.complaints || ""}
                      onChange={(e) => setC({ ...c, complaints: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>History</Label>
                    <Textarea
                      rows={2}
                      value={c.history || ""}
                      onChange={(e) => setC({ ...c, history: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>BP</Label>
                    <Input
                      value={c.bp || ""}
                      onChange={(e) => setC({ ...c, bp: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Pulse</Label>
                    <Input
                      value={c.pulse || ""}
                      onChange={(e) => setC({ ...c, pulse: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Temperature</Label>
                    <Input
                      value={c.temperature || ""}
                      onChange={(e) => setC({ ...c, temperature: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Weight</Label>
                    <Input
                      value={c.weight || ""}
                      onChange={(e) => setC({ ...c, weight: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Current medications</Label>
                    <Textarea
                      rows={2}
                      value={c.current_medications || ""}
                      onChange={(e) => setC({ ...c, current_medications: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Assessment</Label>
                    <Textarea
                      rows={2}
                      value={c.assessment || ""}
                      onChange={(e) => setC({ ...c, assessment: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Treatment plan</Label>
                    <Textarea
                      rows={2}
                      value={c.treatment_plan || ""}
                      onChange={(e) => setC({ ...c, treatment_plan: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Follow-up date</Label>
                    <Input
                      type="date"
                      value={c.follow_up_date || ""}
                      onChange={(e) => setC({ ...c, follow_up_date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveCons}>Save</Button>
                  <Button variant="outline" onClick={() => setShowCons(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {cons.map((x) => (
            <Card key={x.id}>
              <CardContent className="p-4 space-y-1 text-sm">
                <div className="text-xs text-muted-foreground">
                  {new Date(x.created_at).toLocaleString()}
                </div>
                {x.complaints && (
                  <div>
                    <b>Complaints:</b> {x.complaints}
                  </div>
                )}
                {(x.bp || x.pulse || x.temperature || x.weight) && (
                  <div className="text-muted-foreground">
                    Vitals: BP {x.bp || "—"} · Pulse {x.pulse || "—"} · Temp {x.temperature || "—"}{" "}
                    · Wt {x.weight || "—"}
                  </div>
                )}
                {x.assessment && (
                  <div>
                    <b>Assessment:</b> {x.assessment}
                  </div>
                )}
                {x.treatment_plan && (
                  <div>
                    <b>Plan:</b> {x.treatment_plan}
                  </div>
                )}
                {x.follow_up_date && (
                  <div className="text-primary">
                    <b>Follow-up:</b> {x.follow_up_date}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="lab" className="space-y-3">
          {!showLab && (
            <Button size="sm" onClick={() => setShowLab(true)}>
              <Plus className="h-4 w-4 mr-1" />
              New lab result
            </Button>
          )}
          {showLab && (
            <Card>
              <CardContent className="space-y-3 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label>Test name *</Label>
                    <Input
                      value={l.test_name || ""}
                      onChange={(e) => setL({ ...l, test_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={l.test_date || ""}
                      onChange={(e) => setL({ ...l, test_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Result</Label>
                    <Input
                      value={l.result_value || ""}
                      onChange={(e) => setL({ ...l, result_value: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Reference range</Label>
                    <Input
                      value={l.reference_range || ""}
                      onChange={(e) => setL({ ...l, reference_range: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Interpretation</Label>
                    <Textarea
                      rows={2}
                      value={l.interpretation || ""}
                      onChange={(e) => setL({ ...l, interpretation: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Notes</Label>
                    <Textarea
                      rows={2}
                      value={l.notes || ""}
                      onChange={(e) => setL({ ...l, notes: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveLab} disabled={!l.test_name}>
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setShowLab(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {labs.map((x) => (
            <Card key={x.id}>
              <CardContent className="p-4 text-sm space-y-1">
                <div className="flex justify-between">
                  <b>{x.test_name}</b>
                  <span className="text-xs text-muted-foreground">{x.test_date}</span>
                </div>
                <div>
                  Result: <b>{x.result_value || "—"}</b>{" "}
                  {x.reference_range && (
                    <span className="text-muted-foreground">(ref {x.reference_range})</span>
                  )}
                </div>
                {x.interpretation && <div>Interpretation: {x.interpretation}</div>}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="dispense" className="space-y-3">
          {sales.length === 0 && (
            <p className="text-sm text-muted-foreground">No dispensing records.</p>
          )}
          {sales.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-4 text-sm">
                <div className="flex justify-between mb-2">
                  <b>Receipt</b>
                  <span className="text-xs text-muted-foreground">
                    {new Date(s.created_at).toLocaleString()}
                  </span>
                </div>
                <ul className="space-y-1">
                  {s.sale_items?.map((i: any) => (
                    <li key={i.id} className="flex justify-between">
                      <span>
                        {i.medicine_name} × {i.quantity}{" "}
                        {i.dose && (
                          <span className="text-muted-foreground">
                            ({i.dose}, {i.frequency}, {i.duration})
                          </span>
                        )}
                      </span>
                      <span>{(i.quantity * i.unit_price).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between mt-2 pt-2 border-t font-semibold">
                  <span>Total</span>
                  <span>{Number(s.total).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
