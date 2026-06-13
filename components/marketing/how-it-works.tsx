"use client"

import { motion } from "framer-motion"
import { MessageSquare, Cpu, Rocket } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Ask in plain language",
    body: "Describe what you're looking for — a niche, a competitor, a price range, a vibe. No filters or dashboards to configure.",
  },
  {
    icon: Cpu,
    title: "The agent researches",
    body: "ProductPulse pulls live demand, competition, pricing, and trend signals, then scores the opportunity against our model.",
  },
  {
    icon: Rocket,
    title: "Act on the answer",
    body: "Get a scored verdict, the data behind it, and ready-to-run marketing — then save it or dig deeper with a follow-up.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-brand">How it works</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From question to decision in three steps
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-brand">
                <s.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <span className="mt-5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Step {i + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
