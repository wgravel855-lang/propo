export type Level = "Low" | "Medium" | "High"

export type Opportunity = {
  id: string
  name: string
  category: string
  score: number
  demand: Level
  competition: Level
  momentum: number
  margin: string
  price: string
}

export const opportunities: Opportunity[] = [
  {
    id: "op-1",
    name: "Portable Neck Fan",
    category: "Personal Cooling",
    score: 92,
    demand: "High",
    competition: "Low",
    momentum: 38,
    margin: "62%",
    price: "$24.90",
  },
  {
    id: "op-2",
    name: "Magnetic Resistance Bands",
    category: "Fitness",
    score: 88,
    demand: "High",
    competition: "Medium",
    momentum: 24,
    margin: "58%",
    price: "$34.00",
  },
  {
    id: "op-3",
    name: "Collagen Coffee Creamer",
    category: "Wellness",
    score: 84,
    demand: "High",
    competition: "Medium",
    momentum: 19,
    margin: "71%",
    price: "$29.50",
  },
  {
    id: "op-4",
    name: "Smart Posture Corrector",
    category: "Health Tech",
    score: 79,
    demand: "Medium",
    competition: "Low",
    momentum: 31,
    margin: "55%",
    price: "$39.99",
  },
  {
    id: "op-5",
    name: "Reusable Silicone Food Bags",
    category: "Kitchen",
    score: 74,
    demand: "Medium",
    competition: "High",
    momentum: 8,
    margin: "48%",
    price: "$19.00",
  },
  {
    id: "op-6",
    name: "LED Sunset Projector",
    category: "Home Decor",
    score: 71,
    demand: "Medium",
    competition: "High",
    momentum: 12,
    margin: "64%",
    price: "$27.40",
  },
]

export type Store = {
  id: string
  name: string
  niche: string
  strength: number
  weakness: number
  opportunity: number
  monthlyVisits: string
}

export const stores: Store[] = [
  {
    id: "st-1",
    name: "Aurora Active",
    niche: "Athleisure",
    strength: 81,
    weakness: 34,
    opportunity: 67,
    monthlyVisits: "420K",
  },
  {
    id: "st-2",
    name: "HomeGlow Co.",
    niche: "Home Decor",
    strength: 64,
    weakness: 52,
    opportunity: 78,
    monthlyVisits: "190K",
  },
  {
    id: "st-3",
    name: "PureRoot Wellness",
    niche: "Supplements",
    strength: 73,
    weakness: 41,
    opportunity: 61,
    monthlyVisits: "310K",
  },
]

export type Trend = {
  id: string
  name: string
  growth: number
  status: "Surging" | "Rising" | "Steady" | "Cooling"
  spark: number[]
}

export const trends: Trend[] = [
  { id: "tr-1", name: "Portable Cooling", growth: 142, status: "Surging", spark: [12, 18, 22, 30, 41, 52, 68] },
  { id: "tr-2", name: "Functional Beverages", growth: 87, status: "Rising", spark: [20, 24, 28, 33, 40, 48, 57] },
  { id: "tr-3", name: "Recovery Wearables", growth: 64, status: "Rising", spark: [30, 33, 38, 42, 47, 51, 58] },
  { id: "tr-4", name: "Sustainable Kitchen", growth: 12, status: "Steady", spark: [40, 41, 42, 43, 44, 45, 46] },
  { id: "tr-5", name: "Sunset Lighting", growth: -8, status: "Cooling", spark: [60, 57, 54, 52, 49, 47, 44] },
]

export type SavedItem = {
  id: string
  name: string
  type: "Product" | "Store" | "Trend"
  score: number
  savedAt: string
}

export const savedItems: SavedItem[] = [
  { id: "sv-1", name: "Portable Neck Fan", type: "Product", score: 92, savedAt: "2 days ago" },
  { id: "sv-2", name: "Aurora Active", type: "Store", score: 67, savedAt: "4 days ago" },
  { id: "sv-3", name: "Functional Beverages", type: "Trend", score: 87, savedAt: "1 week ago" },
  { id: "sv-4", name: "Magnetic Resistance Bands", type: "Product", score: 88, savedAt: "1 week ago" },
]

export const aiInsights = {
  emerging: [
    "Portable cooling searches up 142% in the last 90 days",
    "Functional creamers gaining traction with the wellness segment",
    "Recovery wearables expanding beyond athletes into office workers",
  ],
  related: ["Cooling towels", "Electrolyte powders", "Compression sleeves"],
  warnings: [
    "Reusable kitchen bags are saturated — 40+ established sellers",
    "Sunset projectors trending down, avoid heavy ad spend",
  ],
  recommendations: [
    "Bundle neck fans with cooling towels for higher AOV",
    "Target office workers for recovery wearables, not just gyms",
    "Lead with margin story on collagen creamer landing pages",
  ],
}
