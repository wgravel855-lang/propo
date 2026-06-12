# DROPGEN

A minimal, ChatGPT-style AI assistant for **finding winning dropshipping products** and building profitable stores fast. Clean white + soft gray UI, rounded corners, calm and premium — with a one-tap dark mode that matches the classic ChatGPT look.

It ships as a **pure static site** — no build step, no dependencies, no backend required. The built-in research engine works fully offline.

---

## What it does

Ask it things like:

- "Find me a winning product"
- "Show me winning products in the health niche"
- "Full research on the galaxy projector"
- "Write a full TikTok ad script for PostureFix Pro"
- "Write landing page copy for [product]"
- "What's the best niche for a beginner?"

Every product comes back in a structured research format:

📦 Product · 🔥 Why it's winning · 📈 Validation scores (Winning / Demand / Competition / Saturation / Viral) · 🔍 Competitor analysis · 💰 Profit breakdown · 🚚 Supplier options · 🎥 TikTok hooks · 📝 Description · 🧩 Upsells & bundles — with a circular **Winning Score gauge** and animated score bars.

---

## Run it locally

It's just static files. Open `index.html` directly, or serve the folder:

```bash
# any of these works
python3 -m http.server 5173
# then visit http://localhost:5173
```

---

## Deploy on Vercel

**Option A — dashboard (easiest)**
1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Other**. Build command: *(leave empty)*. Output directory: *(leave empty / root)*.
4. Deploy. Done — Vercel serves the static files as-is.

**Option B — CLI**
```bash
npm i -g vercel
vercel        # follow prompts
vercel --prod # ship to production
```

No environment variables are needed for the built-in engine.

---

## Optional: connect a live AI

The built-in engine is great out of the box. For unlimited, fully-generative answers, open **Settings → Connect a live AI** and paste an OpenAI or Anthropic key. The DROPGEN persona and output format are sent as the system prompt automatically.

> ⚠️ **Security note:** a key entered here lives in the visitor's browser and is sent directly to the provider. That's fine for personal/local use, but on a **public** deployment anyone could read it. For a production store, route the call through a small serverless function (e.g. a Vercel Edge Function) that holds the key server-side, and have the front-end call that instead.

---

## Customize

Everything lives in four files:

| File | What's inside |
|------|---------------|
| `engine.js` | The product database (`PRODUCTS`), niche knowledge (`NICHES`), query routing, and the live-AI system prompt. **Add your own products here.** |
| `styles.css` | All design tokens at the top (`:root` for light, `[data-theme="dark"]` for dark). Change `--accent` to rebrand. |
| `index.html` | Layout shell — sidebar, composer, modals. |
| `app.js` | Chat state, rendering, localStorage persistence, settings, search. |

**Add a product:** copy any object in the `PRODUCTS` array in `engine.js`, change the fields, and give it a unique `id` and good `tags` (the words users might type). It'll be matched, scored, and rendered automatically.

**Rebrand the color:** change `--accent` (and `--accent-ink` / `--accent-soft`) in `styles.css`.

---

## Notes

- All scores, prices, and supplier figures are **research estimates for guidance**, not guarantees. Always validate before spending on ads.
- Chats persist in the browser via `localStorage`. "Clear all chats" in Settings wipes them.
- Marketing copy is intentionally benefit-led (not medical claims) to stay ad-platform compliant.
