"use server"

import { generateObject } from "ai"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { researchHistory } from "@/lib/db/schema"
import { headers } from "next/headers"
import {
  researchResultSchema,
  opportunitiesSchema,
  trendsSchema,
  storeReportSchema,
  analyzerSchema,
  marketingSchema,
  type ResearchResult,
  type Opportunities,
  type Trends,
  type StoreReport,
  type Analyzer,
  type Marketing,
} from "@/lib/ai/schemas"

const MODEL = "openai/gpt-5-mini"

async function maybeUserId() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    return session?.user?.id ?? null
  } catch {
    return null
  }
}

export async function runResearch(query: string): Promise<ResearchResult> {
  const { object } = await generateObject({
    model: MODEL,
    schema: researchResultSchema,
    prompt: `You are ProductPulse AI, an expert ecommerce product research analyst.
A user wants to research: "${query}".

Produce a realistic, data-grounded product opportunity report. Pick the single most promising specific product
that fits the query. Base your numbers on plausible real-world ecommerce dynamics (search demand, competition,
margins, dropshipping/print-on-demand viability, seasonality). Be specific and actionable, not generic.
Write the summary in first person as a research assistant addressing the user.`,
  })

  const userId = await maybeUserId()
  if (userId) {
    try {
      await db.insert(researchHistory).values({ userId, query, result: object })
    } catch {
      // non-fatal: history persistence should never break the research flow
    }
  }

  return object
}

export async function findOpportunities(niche: string): Promise<Opportunities> {
  const { object } = await generateObject({
    model: MODEL,
    schema: opportunitiesSchema,
    prompt: `You are ProductPulse AI. Find 6-8 high-potential ecommerce product opportunities${
      niche ? ` in the "${niche}" niche` : " across trending consumer niches"
    }.
For each, give a realistic opportunity score, demand level, competition level, profit margin %, and recent trend %.
Favor products with strong demand and lower competition. Be specific with real-sounding product names.`,
  })
  return object
}

export async function discoverTrends(category: string): Promise<Trends> {
  const { object } = await generateObject({
    model: MODEL,
    schema: trendsSchema,
    prompt: `You are ProductPulse AI. Identify 5-7 emerging or rising ecommerce product trends${
      category ? ` in "${category}"` : " across consumer ecommerce"
    }.
For each trend give realistic growth %, monthly search volume, lifecycle stage, and a one-line reason it's moving.
Prioritize trends that are early enough to still be profitable.`,
  })
  return object
}

export async function analyzeStore(input: string): Promise<StoreReport> {
  const { object } = await generateObject({
    model: MODEL,
    schema: storeReportSchema,
    prompt: `You are ProductPulse AI. Produce an estimated competitive teardown of this ecommerce store: "${input}".
Estimate monthly revenue range, monthly visits, product count, top products with prices and estimated sales,
plus key strengths and weaknesses. Make estimates realistic and clearly inferential. If it's a generic name,
model a plausible store of that type.`,
  })
  return object
}

export async function analyzeProduct(input: string): Promise<Analyzer> {
  const { object } = await generateObject({
    model: MODEL,
    schema: analyzerSchema,
    prompt: `You are ProductPulse AI. Analyze the viability of selling this product: "${input}".
Give a viability score, a short verdict, concrete pros and cons, a suggested retail price, the ideal target
audience, and a summary. Ground it in real ecommerce economics (margins, shipping, saturation, ad costs).`,
  })
  return object
}

export async function generateMarketing(input: string): Promise<Marketing> {
  const { object } = await generateObject({
    model: MODEL,
    schema: marketingSchema,
    prompt: `You are ProductPulse AI, an expert DTC copywriter. Generate 4-6 ready-to-use marketing assets for
this product: "${input}". Include a mix such as a Facebook ad headline, TikTok hook, product title, email subject
line, and a short product description. Make the copy punchy, specific, and conversion-focused.`,
  })
  return object
}
