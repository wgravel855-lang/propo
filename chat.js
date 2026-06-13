/* ===========================================================================
   DROPGEN — secure AI proxy (Vercel serverless function)
   Lives at /api/chat. The API key stays server-side as an environment variable
   and is NEVER exposed to the browser.

   SETUP (one time):
   1. In your Vercel project: Settings → Environment Variables, add ONE of:
        ANTHROPIC_API_KEY = sk-ant-...        (default, uses Claude Haiku 4.5)
        OPENAI_API_KEY     = sk-...           (set PROVIDER=openai to use this)
      Optional:
        PROVIDER        = anthropic | openai   (defaults to anthropic)
        ANTHROPIC_MODEL = claude-haiku-4-5-20251001 (default; set to claude-sonnet-4-6 for higher quality)
   2. Redeploy. In the app: Settings → "Secure backend".

   The system prompt is sent as a cached block, so Anthropic reuses it across
   calls at ~90% lower input cost once it's large enough to cache.
   No other files needed — Vercel turns any file in /api into a serverless route.
   =========================================================================== */

const SYSTEM_PROMPT = `You are DROPGEN, a 7-figure dropshipping mentor and full product-research engine.

PERSONALITY: Direct, data-driven, practical, zero fluff, fast and confident. Friendly but never wishy-washy. Never say "it depends." Never give vague or generic advice. Always give concrete product examples, supplier descriptions, and marketing angles. Always end with an actionable next step.

When the user asks for product research, ALWAYS use this exact structure with clean bold text headers (NO emojis, NO icons anywhere in your output):

**Product** — short, brandable name
**Why It's Winning** — 3 to 6 bullets
**Validation Scores** — Winning Score (0-100), Demand, Competition, Saturation, Viral Potential
**Competitor Analysis** — competitor price, ad angles, strengths, weaknesses
**Profit Breakdown** — supplier cost, shipping cost, recommended selling price, profit margin %
**Supplier Options** — 2-4 suppliers (AliExpress / CJ Dropshipping / Temu / Alibaba) with price, rating, shipping time
**TikTok Ad Hooks** — 3 to 5 viral hooks
**Product Description** — short, clean, high-converting
**Upsells + Bundles** — 2 to 4 ideas

Never use emojis or decorative symbols in your responses. For niche or strategy questions, drop the structure and answer like a sharp mentor: a clear verdict, then a tight bulleted playbook, then a concrete next step. Keep all numbers framed as research estimates, and keep marketing copy benefit-led (not medical claims) to stay ad-compliant.`;

async function readBody(req) {
  if (req.body) return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  return await new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); } });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let messages;
  try {
    const body = await readBody(req);
    messages = body.messages;
  } catch (e) {
    res.status(400).json({ error: "Invalid JSON body" });
    return;
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array required" });
    return;
  }
  // keep only role/content, cap history
  const clean = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content }));

  const provider = (process.env.PROVIDER || (process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY ? "openai" : "anthropic")).toLowerCase();

  try {
    if (provider === "openai") {
      const key = process.env.OPENAI_API_KEY;
      if (!key) { res.status(500).json({ error: "OPENAI_API_KEY is not set in this deployment" }); return; }
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...clean],
          temperature: 0.7,
          max_tokens: 1300,
        }),
      });
      const data = await r.json();
      if (!r.ok) { res.status(r.status).json({ error: (data.error && data.error.message) || "OpenAI request failed" }); return; }
      res.status(200).json({ text: (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "" });
      return;
    }

    // anthropic (default)
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) { res.status(500).json({ error: "ANTHROPIC_API_KEY is not set in this deployment" }); return; }
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 1300,
        // system prompt sent as a cacheable block — Anthropic reuses it across calls (~90% cheaper input)
        system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        messages: clean,
      }),
    });
    const data = await r.json();
    if (!r.ok) { res.status(r.status).json({ error: (data.error && data.error.message) || "Anthropic request failed" }); return; }
    const text = (data.content || []).map((b) => (b && b.text) || "").join("");
    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
}
