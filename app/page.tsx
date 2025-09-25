import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Briefs that stay on track",
    description:
      "Organize every request, requirement, and asset in one place so your team can ship faster without chasing context.",
  },
  {
    title: "Feedback with zero friction",
    description:
      "Keep discussions threaded alongside the work. Resolve questions instantly and move from review to delivery without detours.",
  },
  {
    title: "Insights you can trust",
    description:
      "Understand capacity, velocity, and blockers at a glance with real-time reporting built for creative ops.",
  },
]

const highlights = [
  {
    label: "Intake",
    title: "Intuitive briefs",
    description:
      "Launch new workstreams with structured forms and templates that keep scope, deliverables, and approvals crystal clear.",
  },
  {
    label: "Collaboration",
    title: "Threaded feedback",
    description:
      "Centralize comments, decisions, and files so everyone understands context—no more searching Slack or email for the latest note.",
  },
  {
    label: "Delivery",
    title: "Effortless handoffs",
    description:
      "Track review cycles, finalize assets, and send polished deliverables without breaking focus or leaving the workflow.",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25),_transparent_55%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-10">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Collective
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link href="/dashboard" className="transition hover:text-white">
            Product
          </Link>
          <Link href="/dashboard" className="transition hover:text-white">
            Pricing
          </Link>
          <Link href="/dashboard" className="transition hover:text-white">
            Resources
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="hidden text-slate-300 transition hover:bg-white/5 hover:text-white md:inline-flex"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button className="group" asChild>
            <Link href="/register">
              Get started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 pb-20 pt-24 text-center md:pt-32">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
          Creative Operations
        </span>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-[56px]">
          Ship polished creative faster with the clarity your team deserves.
        </h1>
        <p className="max-w-2xl text-balance text-base text-slate-300 sm:text-lg">
          Collective keeps briefs, collaboration, and delivery aligned. Manage the entire lifecycle—from intake to invoice—in a single, beautifully fast workspace inspired by Linear.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="group w-full sm:w-auto" asChild>
            <Link href="/register">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full border-white/20 text-slate-100 hover:bg-white/10 sm:w-auto" asChild>
            <Link href="/dashboard">View product</Link>
          </Button>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 pb-20 pt-10 text-center text-slate-400">
        <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Trusted by creative leaders</span>
        <div className="grid w-full grid-cols-2 items-center gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-6">
          {[
            "Latitude",
            "Northwind",
            "Mosaic",
            "Signal",
            "Arcadia",
            "Vista Labs",
          ].map((brand) => (
            <div
              key={brand}
              className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-semibold tracking-wide text-white/70"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 pb-24 pt-10 md:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950 px-8 py-10 text-white shadow-xl shadow-slate-900/30">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Built for momentum</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-[38px]">
            A single source of truth for every creative milestone.
          </h2>
          <p className="mt-4 text-sm text-slate-300 md:text-base">
            Collective mirrors the way modern creative teams move—from capturing briefs, managing approvals, and aligning partners, to closing the loop with invoicing. Focus on craft while we orchestrate the workflow.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Centralized intake that eliminates back-and-forth.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
              Real-time statuses so stakeholders stay aligned.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
              Built-in analytics to forecast capacity and timelines.
            </li>
          </ul>
        </div>
        <div className="grid gap-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg shadow-slate-900/25 transition hover:border-white/20 hover:bg-white/10"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-6 pb-24 pt-10 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg shadow-slate-900/20"
          >
            <div className="mb-4 h-10 w-10 rounded-full bg-white/10" />
            <h2 className="mb-2 text-lg font-semibold text-white">{feature.title}</h2>
            <p className="text-sm text-slate-300">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 px-10 py-16 text-center shadow-xl shadow-slate-900/30">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">Ready to bring clarity to every project?</h2>
        <p className="max-w-xl text-sm text-slate-300 md:text-base">
          Join teams that run their creative workflow on Collective. Automate the busywork, focus on the craft, and deliver work you are proud of.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="group w-full sm:w-auto" asChild>
            <Link href="/register">
              Create your account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="ghost" size="lg" className="w-full text-slate-300 hover:text-white sm:w-auto" asChild>
            <Link href="/dashboard">Explore the dashboard</Link>
          </Button>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 py-16 text-xs text-slate-500 md:flex-row">
        <p>&copy; {new Date().getFullYear()} Collective. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="transition hover:text-slate-200">
            Privacy
          </Link>
          <Link href="/dashboard" className="transition hover:text-slate-200">
            Terms
          </Link>
          <Link href="/dashboard" className="transition hover:text-slate-200">
            Support
          </Link>
        </div>
      </footer>
    </main>
  )
}
