import { z } from "zod"

const levelEnum = z.enum(["Low", "Medium", "High"])

// ---- Core product research result (research workspace) ----
export const researchResultSchema = z.object({
  productName: z.string().describe("The specific product this research focuses on"),
  summary: z
    .string()
    .describe("A 2-3 sentence conversational analysis of the opportunity, written as an AI assistant"),
  opportunityScore: z.number().int().min(0).max(100).describe("Overall opportunity score 0-100"),
  scoreVerdict: z.string().describe("A short 3-5 word verdict, e.g. 'Strong opportunity'"),
  scoreRationale: z.string().describe("1-2 sentences explaining the score"),
  keyInsights: z
    .array(
      z.object({
        label: z.string().describe("Metric name, e.g. 'Monthly Searches'"),
        value: z.string().describe("The metric value, e.g. '74K' or '$28'"),
        detail: z.string().describe("Short context, max 6 words"),
        icon: z.enum(["gauge", "swords", "flame", "percent"]).describe("Best-fit icon for this metric"),
      }),
    )
    .length(4)
    .describe("Exactly 4 key metrics: demand, competition, trend momentum, and margin"),
  demandTrend: z
    .array(z.number())
    .length(8)
    .describe("8 monthly demand index values (0-100), oldest to newest, showing the trend"),
  analysis: z
    .array(
      z.object({
        title: z.string().describe("Section title, e.g. 'Why it's trending'"),
        body: z.string().describe("2-4 sentences of substantive analysis"),
      }),
    )
    .min(3)
    .max(4)
    .describe("Deep-dive analysis sections"),
  competitors: z
    .array(
      z.object({
        name: z.string(),
        priceRange: z.string().describe("e.g. '$24 - $39'"),
        strength: z.string().describe("Their main advantage, max 8 words"),
        weakness: z.string().describe("A gap you could exploit, max 8 words"),
      }),
    )
    .min(2)
    .max(4),
  marketingIdeas: z
    .array(
      z.object({
        label: z.string().describe("Channel/format, e.g. 'TikTok Hook'"),
        text: z.string().describe("Ready-to-use marketing copy"),
      }),
    )
    .min(2)
    .max(4),
  insights: z
    .array(z.string())
    .min(3)
    .max(5)
    .describe("Punchy one-line strategic takeaways for the side panel"),
})

export type ResearchResult = z.infer<typeof researchResultSchema>

// ---- Opportunity Finder (list of product opportunities) ----
export const opportunitiesSchema = z.object({
  opportunities: z
    .array(
      z.object({
        product: z.string(),
        category: z.string(),
        score: z.number().int().min(0).max(100),
        demand: levelEnum,
        competition: levelEnum,
        margin: z.string().describe("e.g. '68%'"),
        trend: z.string().describe("e.g. '+42%'"),
      }),
    )
    .min(6)
    .max(8),
})
export type Opportunities = z.infer<typeof opportunitiesSchema>

// ---- Trend Discovery ----
export const trendsSchema = z.object({
  trends: z
    .array(
      z.object({
        name: z.string(),
        category: z.string(),
        growth: z.string().describe("e.g. '+128%'"),
        volume: z.string().describe("e.g. '210K/mo'"),
        stage: z.enum(["Emerging", "Rising", "Peaking", "Mature"]),
        summary: z.string().describe("One sentence on why it's moving"),
      }),
    )
    .min(5)
    .max(7),
})
export type Trends = z.infer<typeof trendsSchema>

// ---- Store X-Ray ----
export const storeReportSchema = z.object({
  storeName: z.string(),
  estMonthlyRevenue: z.string().describe("e.g. '$180K - $240K'"),
  estMonthlyVisits: z.string().describe("e.g. '1.2M'"),
  productCount: z.string().describe("e.g. '340'"),
  topProducts: z
    .array(
      z.object({
        name: z.string(),
        price: z.string(),
        estSales: z.string().describe("estimated monthly sales, e.g. '4.2K/mo'"),
      }),
    )
    .min(3)
    .max(5),
  strengths: z.array(z.string()).min(2).max(4),
  weaknesses: z.array(z.string()).min(2).max(4),
  summary: z.string().describe("2-3 sentence overview of the store's strategy"),
})
export type StoreReport = z.infer<typeof storeReportSchema>

// ---- Product Analyzer ----
export const analyzerSchema = z.object({
  productName: z.string(),
  viabilityScore: z.number().int().min(0).max(100),
  verdict: z.string().describe("Short verdict, 3-6 words"),
  pros: z.array(z.string()).min(3).max(5),
  cons: z.array(z.string()).min(3).max(5),
  suggestedPrice: z.string().describe("e.g. '$34.99'"),
  targetAudience: z.string().describe("One sentence on the ideal customer"),
  summary: z.string(),
})
export type Analyzer = z.infer<typeof analyzerSchema>

// ---- Marketing Generator ----
export const marketingSchema = z.object({
  productName: z.string(),
  assets: z
    .array(
      z.object({
        label: z.string().describe("Asset type, e.g. 'Facebook Ad Headline'"),
        text: z.string().describe("Ready-to-use copy"),
      }),
    )
    .min(4)
    .max(6),
})
export type Marketing = z.infer<typeof marketingSchema>
