import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { supabase } from "#/Integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Pill } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign in — PharmaCare Lite" }] }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/app" });
    });
  }, [navigate]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Welcome back");
      navigate({ to: "/app" });
    }
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/app`, data: { display_name: name } },
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Account created");
      navigate({ to: "/app" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <Card className="w-full max-w-md shadow-2xl ">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white font-bold text-xl">
            <Pill/>
          </div>
          <CardTitle className="text-xl">Rx-assit</CardTitle>
          <p className="text-sm tex-black">Sign in to your pharmacy workspace</p>
        </CardHeader>
        <CardContent className="bo">
          <Tabs defaultValue="signin" className="flex flex-col">
            <TabsList className="grid w-full grid-cols-2 " variant="line">
              <TabsTrigger value="signin" className="cursor-pointer">Sign in</TabsTrigger>
              <TabsTrigger value="signup" className="cursor-pointer">Create account</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={signIn} className="space-y-3">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button size={'lg'} type="submit" className="w-full bg-blue-500 text-white py-2 cursor-pointer" disabled={busy}>
                  {busy ? "Signing in…" : "Sign in"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={signUp} className="space-y-3">
                <div>
                  <Label>Full name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-500 text-white py-2 cursor-pointer" disabled={busy}>
                  {busy ? "Creating…" : "Create account"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  The first account becomes the admin.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
