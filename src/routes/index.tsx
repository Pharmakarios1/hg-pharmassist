import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Pill, Users, FlaskConical, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "PharmaCare Lite — Pharmacy Management" },
      {
        name: "description",
        content: "Patient history, stock & lab records for community pharmacies.",
      },
    ],
  }),
});

function Feature({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-5 ">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b shadow-xl sticky top-0 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600  font-bold">
              <Pill color="white" />
            </div>
            <span className="font-semibold md:text-xl">Rx-assist</span>
          </div>
          <div className="gap-2 hidden lg:block ">
            <Link to="/">
              <Button variant="ghost" className="cursor-pointer text-md">
                Home
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="cursor-pointer text-md">
                Stock
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="cursor-pointer text-md">
                Alert
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="cursor-pointer text-md">
                Patients
              </Button>
            </Link>
          </div>
          <div className="flex justify-between  fixed bottom-0 lg:hidden bg-white shadow-t-md w-full p-6 ">
            <Link to="/">
              <Button variant="ghost" className="cursor-pointer text-md">
                Home
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="cursor-pointer text-md">
                Stock
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="cursor-pointer text-md">
                Alert
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="cursor-pointer text-md">
                Patients
              </Button>
            </Link>
          </div>
          <div className="flex gap-2">
            <Link to="/auth">
              <Button variant="outline" className="cursor-pointer border ">
                Sign in
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" className="cursor-pointer bg-blue-600 text-white">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto flex flex-col lg:flex-row gap-5 items-center max-w-6xl px-4 py-16 md:py-24">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
            Built for community pharmacies
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Advanced Patient History docs, Stock management & Point of Care Findings - in one place.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Pharmacare digitizes consultations, dispensing, and lab findings so you can focus on
            care, not paperwork.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/auth">
              <Button size="lg" variant="outline" className="bg-[]">
                Start free
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline">
                See features
              </Button>
            </a>
          </div>
        </div>
        <div className="max-w-xl">
          <img src="/public/POCT.jpg" alt="" className="" />
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={Users}
            title="Patient history"
            desc="Profiles, vitals, allergies and consultation notes."
          />
          <Feature
            icon={Pill}
            title="Stock management"
            desc="Batches, expiry alerts and low-stock warnings."
          />
          <Feature
            icon={FlaskConical}
            title="Lab findings"
            desc="Record test results with reference ranges."
          />
          <Feature
            icon={ShieldCheck}
            title="Secure & role-based"
            desc="Multi-user access with admin controls."
          />
        </div>
      </section>
    </div>
  );
}
