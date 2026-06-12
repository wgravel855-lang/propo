/* ============================================================================
   DROPGEN ENGINE
   A client-side dropshipping research engine. No backend required.
   Returns structured "blocks" that app.js renders into cards.
   ========================================================================== */

/* ---------- Curated winning-product database -------------------------------
   Realistic archetypes across the highest-converting dropshipping niches.
   All numbers are research estimates, framed as guidance, not guarantees.
--------------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "posture-corrector",
    name: "PostureFix Pro",
    emoji: "🧍",
    category: "health",
    tags: ["posture", "back", "corrector", "brace", "support", "shoulder", "spine", "health", "office"],
    tagline: "Adjustable upper-back brace that pulls the shoulders into alignment.",
    why: [
      "Solves a painful, daily problem — desk workers feel the ache constantly.",
      "Instant before/after visual: shoulders snap back the moment it's worn.",
      "Broad audience: office workers, gamers, students, gym crowd, 25–55.",
      "Lightweight and flat-packs — cheap, fast shipping with no breakage risk.",
      "Evergreen, not seasonal — pain doesn't take a season off."
    ],
    scores: { winning: 86, demand: 88, competition: 64, saturation: 58, viral: 79, margin: 84 },
    competitors: [
      { who: "Generic Shopify one-product stores", price: "$34.99–$49.99", angle: "“Fix your posture in 2 weeks” + doctor-style authority" },
      { who: "Amazon listings", price: "$19.99–$29.99", angle: "Reviews + bundle with back stretcher" }
    ],
    compStrengths: "Strong UGC, easy demo content, trusted by a pain-driven buyer.",
    compWeaknesses: "Sizing complaints and returns; most stores skip a fit guide — your opening.",
    profit: { cost: 4.20, ship: 2.10, sell: 39.99, },
    suppliers: [
      { name: "AliExpress — Orthopedic Store", price: "$4.20", rating: "4.7★ (12k+ orders)", ship: "8–14 days (US)" },
      { name: "CJ Dropshipping", price: "$5.40", rating: "4.8★", ship: "6–10 days (US warehouse)" },
      { name: "Alibaba (bulk)", price: "$2.10 @ 500 units", rating: "Gold, 6 yrs", ship: "Sea/air freight" }
    ],
    hooks: [
      "POV: you've had bad posture for 10 years and fix it in one clip.",
      "The reason your upper back hurts every single day…",
      "I wore this for 14 days. Here's what happened to my posture.",
      "Stop telling people to “sit up straight.” Do this instead.",
      "Why every desk worker over 25 needs one of these."
    ],
    description: "Slouching all day is quietly wrecking your back. PostureFix Pro gently pulls your shoulders into their natural alignment, so standing tall stops being something you have to think about. Adjustable, breathable, and discreet under clothing — wear it 30 minutes a day and retrain the muscles that hold you upright. Your future spine will thank you.",
    upsells: [
      "Back & neck stretcher mat (+$24) — natural pairing, raises AOV fast.",
      "2-pack bundle “his & hers” (+$29) — easy upsell, near-zero extra ship cost.",
      "Posture e-book / 14-day program (+$9) — pure-margin digital add-on.",
      "Lumbar seat cushion (+$19) — completes the “fix your desk setup” bundle."
    ]
  },
  {
    id: "star-projector",
    name: "NovaGlow Galaxy Projector",
    emoji: "🌌",
    category: "home",
    tags: ["projector", "galaxy", "star", "nebula", "light", "room", "led", "aesthetic", "bedroom", "decor", "ambience"],
    tagline: "Star + nebula projector that turns any room into a galaxy.",
    why: [
      "Insanely scroll-stopping on video — the room transformation IS the ad.",
      "Emotional + aesthetic buy: teens, couples, streamers, parents.",
      "Tons of UGC already exists — easy to model proven content.",
      "Gift-friendly, which widens the buying window beyond impulse.",
      "Strong perceived value vs. its real cost — fat margins."
    ],
    scores: { winning: 82, demand: 90, competition: 71, saturation: 72, viral: 92, margin: 80 },
    competitors: [
      { who: "TikTok Shop sellers", price: "$25–$45", angle: "Dark room reveal + trending audio" },
      { who: "Branded stores (e.g. galaxy-themed)", price: "$49–$69", angle: "Premium bundle + remote/app control" }
    ],
    compStrengths: "Viral content engine, low-effort demos, broad gifting appeal.",
    compWeaknesses: "Getting crowded; differentiate with app control, music sync, or a premium bundle.",
    profit: { cost: 8.50, ship: 3.20, sell: 44.99 },
    suppliers: [
      { name: "AliExpress — Smart Lighting Store", price: "$8.50", rating: "4.8★ (30k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$10.10", rating: "4.7★", ship: "5–9 days (US)" },
      { name: "Temu wholesale", price: "$7.90", rating: "4.6★", ship: "10–16 days" }
    ],
    hooks: [
      "Turning my boring bedroom into a galaxy in 5 seconds…",
      "This $45 gadget made my room look like a $5k setup.",
      "Lights off. Watch what this does to the ceiling.",
      "Why every streamer's background looks insane now.",
      "Gift idea that makes you look like you tried way harder than you did."
    ],
    description: "Flip off the lights and your ceiling becomes a slow-drifting galaxy. NovaGlow layers crisp stars over moving nebula clouds in any color you want, with a remote and timer so it fades out after you fall asleep. Perfect for bedrooms, streaming setups, parties, or just turning a dull evening into something cinematic.",
    upsells: [
      "Bluetooth-speaker version (+$20) — music-synced lights, premium tier.",
      "Bundle with LED strip lights (+$18) — full “room glow-up” kit.",
      "Extra remote / app-control upgrade (+$12).",
      "Sunset lamp add-on (+$15) — same aesthetic buyer, easy attach."
    ]
  },
  {
    id: "neck-massager",
    name: "ReliefPulse Neck Massager",
    emoji: "💆",
    category: "health",
    tags: ["neck", "massager", "shoulder", "ems", "pulse", "pain", "tension", "relief", "tech neck", "health"],
    tagline: "EMS pulse massager that wraps the neck and melts tension.",
    why: [
      "“Tech neck” is exploding — phones created a permanent customer base.",
      "Visible relief reaction makes for high-converting UGC.",
      "Higher price point ($49–$69) with strong perceived medical value.",
      "Repeat-buy and gifting potential (parents, partners, coworkers).",
      "Compact, lightweight, ships cheap."
    ],
    scores: { winning: 80, demand: 85, competition: 68, saturation: 66, viral: 74, margin: 82 },
    competitors: [
      { who: "Health gadget stores", price: "$49–$79", angle: "“Chiropractor in your pocket” authority angle" },
      { who: "Amazon", price: "$29–$45", angle: "Reviews + heat-function bundle" }
    ],
    compStrengths: "Pain-driven urgency, strong testimonial content.",
    compWeaknesses: "Skeptical buyers — lean hard on demos, guarantees, and real reviews.",
    profit: { cost: 9.80, ship: 2.60, sell: 54.99 },
    suppliers: [
      { name: "AliExpress — Health Care Store", price: "$9.80", rating: "4.6★ (8k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$11.50", rating: "4.8★", ship: "6–10 days (US)" },
      { name: "Alibaba (bulk)", price: "$6.40 @ 300 units", rating: "Gold, 5 yrs", ship: "Air freight" }
    ],
    hooks: [
      "If your neck hurts from looking down at your phone, watch this.",
      "Chiropractor said this is the closest thing to a real adjustment.",
      "60 seconds of this vs. a $90 massage appointment.",
      "POV: 8 hours at a desk and then THIS.",
      "Your neck pain has a name. It's called your phone."
    ],
    description: "Hours hunched over a phone or laptop leave your neck locked up and aching. ReliefPulse wraps comfortably around your neck and uses gentle EMS pulses plus warmth to loosen the deep tension a quick stretch never reaches. Fifteen minutes resets your whole upper body — no appointment, no waiting room.",
    upsells: [
      "Heated eye massager (+$29) — same “relax and reset” buyer.",
      "Bundle with posture corrector (+$25) — “fix tech neck” kit.",
      "Replacement gel pads subscription (+$8/mo) — recurring revenue.",
      "Travel case (+$12)."
    ]
  },
  {
    id: "mini-blender",
    name: "BlendGo Portable Blender",
    emoji: "🥤",
    category: "kitchen",
    tags: ["blender", "smoothie", "portable", "kitchen", "protein", "shake", "usb", "rechargeable", "fitness", "gym"],
    tagline: "USB-rechargeable personal blender that blends in the cup.",
    why: [
      "Health/fitness wave keeps demand high year-round.",
      "Clean, satisfying demo content (blend → drink) converts well.",
      "Practical + giftable — wide audience from gym to office to travel.",
      "Strong AOV potential with bundles (protein, recipe guide).",
      "Compact and durable enough for cheap, low-return shipping."
    ],
    scores: { winning: 76, demand: 80, competition: 74, saturation: 70, viral: 72, margin: 76 },
    competitors: [
      { who: "Fitness-niche stores", price: "$29–$45", angle: "Gym/on-the-go convenience + recipe bundle" },
      { who: "Amazon (BlendJet-style)", price: "$25–$49", angle: "Brand trust + color variety" }
    ],
    compStrengths: "Established demand, lots of recipe content angles.",
    compWeaknesses: "Brand-name competition; win on price-to-value bundle and fresh creative.",
    profit: { cost: 7.30, ship: 3.40, sell: 34.99 },
    suppliers: [
      { name: "AliExpress — Kitchen Gadgets Store", price: "$7.30", rating: "4.7★ (20k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$8.90", rating: "4.8★", ship: "6–10 days (US)" },
      { name: "Temu wholesale", price: "$6.80", rating: "4.5★", ship: "10–16 days" }
    ],
    hooks: [
      "Making a smoothie in the back of an Uber because why not.",
      "The blender that lives in my gym bag.",
      "No kitchen? No problem. Watch this.",
      "Protein shake in 20 seconds, no clean-up.",
      "Things that live rent-free in my desk drawer: this."
    ],
    description: "Skip the bulky countertop blender and the pile of dishes. BlendGo blends your smoothie right in the cup you drink from, charges over USB, and tucks into a bag or desk drawer. Six blades, one button, fresh in twenty seconds — at the gym, the office, or 30,000 feet up.",
    upsells: [
      "Recipe e-book / 30 smoothie guide (+$7) — pure margin.",
      "Protein/superfood starter pack (+$19).",
      "Extra blending cup or lid (+$9).",
      "2-pack “matching set” (+$24)."
    ]
  },
  {
    id: "pet-hair-remover",
    name: "FurMagnet Pet Roller",
    emoji: "🐾",
    category: "pets",
    tags: ["pet", "dog", "cat", "hair", "fur", "remover", "roller", "cleaning", "lint", "couch", "furniture"],
    tagline: "Reusable self-cleaning roller that pulls fur off any fabric.",
    why: [
      "Pet niche = obsessed, high-LTV buyers who spend without flinching.",
      "Oddly-satisfying demo content performs incredibly on short video.",
      "Reusable angle beats disposable lint rollers — clear value story.",
      "Cheap to source, light to ship, near-zero returns.",
      "Year-round shedding = year-round demand."
    ],
    scores: { winning: 78, demand: 82, competition: 60, saturation: 55, viral: 81, margin: 85 },
    competitors: [
      { who: "Pet-niche stores", price: "$19–$29", angle: "Satisfying fur-pull demos + “never buy lint rollers again”" },
      { who: "Amazon (ChomChom-style)", price: "$24–$31", angle: "Brand + reviews" }
    ],
    compStrengths: "Endless satisfying content, loyal pet audience.",
    compWeaknesses: "Brand-name dominates Amazon — win on TikTok-native creative and bundles.",
    profit: { cost: 3.10, ship: 2.30, sell: 24.99 },
    suppliers: [
      { name: "AliExpress — Pet Clean Store", price: "$3.10", rating: "4.8★ (40k+ orders)", ship: "8–14 days" },
      { name: "CJ Dropshipping", price: "$4.30", rating: "4.7★", ship: "5–9 days (US)" },
      { name: "Alibaba (bulk)", price: "$1.70 @ 1000 units", rating: "Gold, 7 yrs", ship: "Sea/air" }
    ],
    hooks: [
      "How much fur my couch was hiding (gross).",
      "Throwing away my last lint roller forever.",
      "Cat owners: you NEED to see what this pulls out.",
      "The most satisfying 15 seconds of your day.",
      "Why I'll never buy sticky rollers again."
    ],
    description: "If you own a pet, you own fur on everything. FurMagnet rolls across couches, beds, and car seats and traps fur in a built-in chamber — just open and empty, no sticky sheets to refill, ever. One swipe and your furniture looks new again. Buy it once, use it forever.",
    upsells: [
      "Pet grooming glove (+$14) — same buyer, same problem.",
      "Car-seat cover for pets (+$24) — higher-ticket attach.",
      "2-pack “home + car” (+$18).",
      "Mini travel roller add-on (+$9)."
    ]
  },
  {
    id: "eye-massager",
    name: "VisionEase Heated Eye Massager",
    emoji: "👁️",
    category: "health",
    tags: ["eye", "massager", "heated", "sleep", "migraine", "relax", "headache", "tension", "spa", "health", "wellness"],
    tagline: "Heated compression eye mask that relieves strain and helps sleep.",
    why: [
      "Screen fatigue + migraines + sleep issues = three pain points in one.",
      "Premium “spa at home” positioning supports a high price.",
      "Strong gifting product (stress, sleep, self-care angles).",
      "Calm, aesthetic demos fit the wellness aesthetic perfectly.",
      "Compact, light, low return rate."
    ],
    scores: { winning: 75, demand: 78, competition: 62, saturation: 60, viral: 70, margin: 83 },
    competitors: [
      { who: "Wellness stores", price: "$49–$79", angle: "Sleep + migraine relief, self-care gifting" },
      { who: "Amazon", price: "$35–$55", angle: "Bluetooth music + reviews" }
    ],
    compStrengths: "High margin, strong gifting + self-care positioning.",
    compWeaknesses: "Needs trust-building; testimonials and a guarantee close the sale.",
    profit: { cost: 11.20, ship: 2.80, sell: 59.99 },
    suppliers: [
      { name: "AliExpress — Relax Health Store", price: "$11.20", rating: "4.7★ (9k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$13.40", rating: "4.8★", ship: "6–10 days (US)" },
      { name: "Alibaba (bulk)", price: "$7.90 @ 300 units", rating: "Gold, 6 yrs", ship: "Air freight" }
    ],
    hooks: [
      "If you stare at screens all day, your eyes need this.",
      "The 15-minute reset that knocks me out every night.",
      "Migraine starting? I do this before reaching for pills.",
      "Self-care that actually does something.",
      "POV: end of a long day, lights off, this on."
    ],
    description: "Your eyes carry the whole day — screens, stress, bad sleep. VisionEase wraps them in gentle heat and rhythmic compression that eases tension headaches, soothes tired eyes, and helps you wind down for real rest. Fifteen quiet minutes with built-in audio, and the day finally lets go.",
    upsells: [
      "Neck/shoulder massager bundle (+$29) — full relaxation kit.",
      "Weighted sleep mask add-on (+$15).",
      "Essential-oil sleep kit (+$12).",
      "Replacement covers subscription (+$6/mo)."
    ]
  },
  {
    id: "veggie-chopper",
    name: "ChopMaster Pro",
    emoji: "🔪",
    category: "kitchen",
    tags: ["chopper", "vegetable", "veggie", "kitchen", "slicer", "dicer", "food prep", "cooking", "onion", "salad"],
    tagline: "Multi-blade chopper that dices a full meal's veggies in seconds.",
    why: [
      "Cooking content is massive and the demo sells itself.",
      "Saves real time — clear, believable value proposition.",
      "Broad audience: home cooks, meal preppers, busy parents.",
      "Strong impulse price point with bundle headroom.",
      "Stacks flat for cheap shipping."
    ],
    scores: { winning: 73, demand: 79, competition: 76, saturation: 73, viral: 75, margin: 74 },
    competitors: [
      { who: "Kitchen-niche stores", price: "$29–$39", angle: "“Meal prep in half the time” + recipe content" },
      { who: "Amazon", price: "$22–$35", angle: "Reviews + accessory bundle" }
    ],
    compStrengths: "Self-evident demos, big cooking audience.",
    compWeaknesses: "Saturated on Amazon — TikTok-native creative + a tight bundle win.",
    profit: { cost: 6.10, ship: 3.60, sell: 32.99 },
    suppliers: [
      { name: "AliExpress — Kitchen Tools Store", price: "$6.10", rating: "4.7★ (25k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$7.80", rating: "4.8★", ship: "6–10 days (US)" },
      { name: "Temu wholesale", price: "$5.40", rating: "4.6★", ship: "10–16 days" }
    ],
    hooks: [
      "Meal prep just got stupidly easy.",
      "Watch me dice a whole onion without crying.",
      "Why I stopped buying pre-chopped veggies.",
      "POV: dinner prep in 4 minutes flat.",
      "The gadget that saved my weeknights."
    ],
    description: "Chopping vegetables is the most tedious part of cooking — so stop doing it the slow way. ChopMaster's swappable blades dice, slice, and shred a full meal's worth of produce in seconds, straight into a built-in catch container. Less knife work, less crying over onions, more actual cooking.",
    upsells: [
      "Recipe / meal-prep guide (+$7) — pure margin.",
      "Matching knife set or peeler (+$16).",
      "Extra blade pack (+$11).",
      "Food storage container set (+$14)."
    ]
  },
  {
    id: "cloud-slippers",
    name: "CloudStep Slippers",
    emoji: "☁️",
    category: "fashion",
    tags: ["slippers", "cloud", "shoes", "comfort", "foot", "fashion", "cozy", "recovery", "soft", "home"],
    tagline: "Ultra-cushioned pillow slippers people obsess over.",
    why: [
      "Pure impulse + comfort buy with huge gifting appeal.",
      "“Walking on a cloud” demo is dead simple and viral.",
      "Color/size variety drives multi-buys and AOV.",
      "Tons of proven UGC to model — low creative risk.",
      "Light, packable, cheap to ship globally."
    ],
    scores: { winning: 77, demand: 83, competition: 78, saturation: 75, viral: 84, margin: 78 },
    competitors: [
      { who: "TikTok Shop sellers", price: "$19–$29", angle: "Comfort ASMR + color variety + trending audio" },
      { who: "Branded comfort stores", price: "$29–$39", angle: "Premium feel + bundles" }
    ],
    compStrengths: "Massive proven virality, easy gifting, repeat color buys.",
    compWeaknesses: "Crowded — differentiate with branding, colors, and creator content.",
    profit: { cost: 4.90, ship: 3.10, sell: 26.99 },
    suppliers: [
      { name: "AliExpress — Comfort Shoes Store", price: "$4.90", rating: "4.8★ (50k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$6.20", rating: "4.7★", ship: "6–10 days (US)" },
      { name: "Temu wholesale", price: "$4.30", rating: "4.6★", ship: "10–16 days" }
    ],
    hooks: [
      "It genuinely feels like stepping on a marshmallow.",
      "My feet have never been this happy.",
      "Buying these in every color, no regrets.",
      "The slippers that broke TikTok, one year later.",
      "Gift these and become everyone's favorite person."
    ],
    description: "Imagine stepping onto a pillow with every stride. CloudStep slippers are molded from ultra-thick, squishy foam that cradles tired feet the second you slip them on — for lounging, recovery days, or padding around the house. Once you wear them, normal slippers feel like cardboard.",
    upsells: [
      "Buy 2 get 1 (+$22) — color variety drives it.",
      "Matching cozy socks (+$9).",
      "Outdoor/garden version (+$14).",
      "Gift-box packaging upgrade (+$6)."
    ]
  },
  {
    id: "neck-fan",
    name: "BreezeLoop Neck Fan",
    emoji: "🌬️",
    category: "gadgets",
    tags: ["fan", "neck", "portable", "cooling", "summer", "bladeless", "rechargeable", "outdoor", "travel", "heat"],
    tagline: "Hands-free bladeless neck fan for heat, travel, and workouts.",
    why: [
      "Heat waves create urgent, weather-driven demand spikes.",
      "Hands-free angle is genuinely useful — travel, sports, parents.",
      "Quick, clear demo content; easy to show the benefit.",
      "Good margins at a comfortable impulse price.",
      "Note: leans seasonal — plan inventory and ads around summer."
    ],
    scores: { winning: 71, demand: 80, competition: 66, saturation: 64, viral: 72, margin: 79 },
    competitors: [
      { who: "Gadget stores", price: "$25–$39", angle: "Summer/travel convenience, festival/outdoor angle" },
      { who: "Amazon", price: "$19–$32", angle: "Battery life + reviews" }
    ],
    compStrengths: "Strong seasonal urgency, clear use case.",
    compWeaknesses: "Seasonal demand swings — diversify creatives by use case (travel, sports, hot jobs).",
    profit: { cost: 6.70, ship: 3.30, sell: 32.99 },
    suppliers: [
      { name: "AliExpress — Cooling Store", price: "$6.70", rating: "4.6★ (15k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$8.10", rating: "4.7★", ship: "6–10 days (US)" },
      { name: "Temu wholesale", price: "$5.90", rating: "4.5★", ship: "10–16 days" }
    ],
    hooks: [
      "Surviving a heat wave hands-free.",
      "Why every theme-park day needs one of these.",
      "Outdoor workers: this changes everything.",
      "Travel hack nobody talks about.",
      "POV: it's 95°F and you came prepared."
    ],
    description: "When it's brutally hot, a handheld fan you have to hold is half a solution. BreezeLoop loops around your neck and pushes cool air at your face and neck hands-free — for commutes, theme parks, festivals, workouts, or hot job sites. Bladeless, quiet, and rechargeable, so you stay cool without lifting a finger.",
    upsells: [
      "Portable misting bottle (+$12) — summer combo.",
      "Cooling towel set (+$10).",
      "Power bank add-on (+$16).",
      "2-pack “family” (+$26)."
    ]
  },
  {
    id: "led-strip",
    name: "GlowSync LED Strips",
    emoji: "💡",
    category: "home",
    tags: ["led", "strip", "lights", "rgb", "room", "decor", "music", "app", "gaming", "aesthetic", "bedroom"],
    tagline: "Music-syncing app-controlled RGB strips for room makeovers.",
    why: [
      "Gen Z room-decor obsession keeps demand high and content endless.",
      "Music-sync + app control makes for hypnotic, viral demos.",
      "Cheap to source with strong perceived value.",
      "Cuttable lengths = upsell on longer kits.",
      "Light, flat, cheap to ship."
    ],
    scores: { winning: 74, demand: 86, competition: 80, saturation: 78, viral: 85, margin: 77 },
    competitors: [
      { who: "TikTok Shop sellers", price: "$15–$29", angle: "Room glow-up reveals + music sync" },
      { who: "Branded (Govee-style)", price: "$29–$49", angle: "App ecosystem + brand trust" }
    ],
    compStrengths: "Huge demand, endless content, easy bundling.",
    compWeaknesses: "Very saturated + strong brands — win on bundles, creators, and niche rooms (gaming, studio).",
    profit: { cost: 5.40, ship: 2.90, sell: 27.99 },
    suppliers: [
      { name: "AliExpress — Smart Lighting Store", price: "$5.40", rating: "4.7★ (35k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$6.80", rating: "4.8★", ship: "6–10 days (US)" },
      { name: "Temu wholesale", price: "$4.90", rating: "4.6★", ship: "10–16 days" }
    ],
    hooks: [
      "Room glow-up in under 60 seconds.",
      "Making my setup look insane for $28.",
      "The lights react to my music and I can't stop watching.",
      "Cheapest way to make any room look expensive.",
      "Gamers, your battlestation needs this."
    ],
    description: "Transform any room with a strip of light. GlowSync sticks anywhere, shifts through millions of colors from your phone, and pulses in time with your music. Behind a desk, around a bed frame, under cabinets — it's the cheapest upgrade that makes a space feel completely different.",
    upsells: [
      "Galaxy/star projector (+$22) — same aesthetic buyer.",
      "Longer 30ft kit upgrade (+$15).",
      "Smart plug / remote bundle (+$10).",
      "Sunset lamp add-on (+$14)."
    ]
  },
  {
    id: "blackhead-vacuum",
    name: "ClearPore Vacuum",
    emoji: "🧖",
    category: "beauty",
    tags: ["blackhead", "pore", "vacuum", "skin", "skincare", "beauty", "face", "acne", "cleansing", "spa"],
    tagline: "Suction pore cleaner with a satisfying before/after.",
    why: [
      "Beauty + “oddly satisfying” = a viral content goldmine.",
      "Visible before/after is the strongest converter there is.",
      "Younger skincare-obsessed audience buys on impulse.",
      "High margin, small and light to ship.",
      "Repeat tips/filters create accessory upsells."
    ],
    scores: { winning: 72, demand: 77, competition: 70, saturation: 68, viral: 83, margin: 81 },
    competitors: [
      { who: "Beauty-niche stores", price: "$29–$45", angle: "Before/after demos + skincare routine bundle" },
      { who: "Amazon", price: "$22–$36", angle: "Reviews + multiple suction heads" }
    ],
    compStrengths: "Strong before/after content, loyal skincare buyers.",
    compWeaknesses: "Misuse complaints — add a usage guide to cut returns and build trust.",
    profit: { cost: 7.60, ship: 2.50, sell: 36.99 },
    suppliers: [
      { name: "AliExpress — Beauty Tools Store", price: "$7.60", rating: "4.6★ (18k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$9.20", rating: "4.7★", ship: "6–10 days (US)" },
      { name: "Alibaba (bulk)", price: "$4.80 @ 500 units", rating: "Gold, 5 yrs", ship: "Air freight" }
    ],
    hooks: [
      "The most satisfying skincare video you'll watch today.",
      "What it actually pulls out of your pores (be warned).",
      "I tried the viral pore vacuum so you don't have to.",
      "Esthetician-level results at home.",
      "POV: nose strip era is over."
    ],
    description: "That gunk in your pores? Watch it disappear. ClearPore uses adjustable suction and swappable heads to lift blackheads and debris your cleanser can't reach, with a smooth, satisfying finish. Use it weekly for visibly clearer skin — no appointment, no nose strips, just results you can see.",
    upsells: [
      "Skincare starter set / toner (+$15).",
      "LED face mask add-on (+$29) — higher-ticket attach.",
      "Replacement head pack (+$9).",
      "Ice roller bundle (+$12)."
    ]
  },
  {
    id: "acupressure-mat",
    name: "ZenMat Acupressure Set",
    emoji: "🧘",
    category: "health",
    tags: ["acupressure", "mat", "back", "pain", "relax", "yoga", "stress", "sleep", "recovery", "wellness", "health"],
    tagline: "Spiked mat + pillow that releases back tension and stress.",
    why: [
      "Wellness + stress-relief niche has loyal, repeat buyers.",
      "Strong storytelling angle: stress, sleep, chronic pain.",
      "Higher AOV with the mat + pillow + bag bundle.",
      "Calming, aesthetic content fits the wellness feed.",
      "Rolls up — manageable to ship."
    ],
    scores: { winning: 70, demand: 74, competition: 58, saturation: 54, viral: 66, margin: 80 },
    competitors: [
      { who: "Wellness stores", price: "$39–$69", angle: "Stress + sleep + recovery storytelling" },
      { who: "Amazon", price: "$25–$45", angle: "Bundle + reviews" }
    ],
    compStrengths: "Loyal wellness buyers, strong narrative angles.",
    compWeaknesses: "Slower, education-driven sale — content must teach the benefit.",
    profit: { cost: 8.40, ship: 4.10, sell: 44.99 },
    suppliers: [
      { name: "AliExpress — Yoga Wellness Store", price: "$8.40", rating: "4.7★ (10k+ orders)", ship: "9–15 days" },
      { name: "CJ Dropshipping", price: "$10.10", rating: "4.8★", ship: "6–10 days (US)" },
      { name: "Alibaba (bulk)", price: "$5.60 @ 300 units", rating: "Gold, 6 yrs", ship: "Air/sea" }
    ],
    hooks: [
      "Lying on a bed of spikes to de-stress (it works).",
      "The 10-minute routine that knocks me out at night.",
      "Why I do this every day after work.",
      "Sounds painful. Feels incredible. Here's why.",
      "POV: cheaper than therapy, kind of."
    ],
    description: "Stress lives in your back and shoulders, and ZenMat draws it out. Lie back on thousands of gentle pressure points for ten minutes and feel the tension release, circulation rise, and your nervous system finally downshift. A nightly reset for sore muscles, stress, and restless sleep — rolls up to take anywhere.",
    upsells: [
      "Eye massager / sleep mask (+$25) — wind-down kit.",
      "Essential-oil set (+$12).",
      "Carry bag upgrade (+$8).",
      "Foam roller bundle (+$18)."
    ]
  }
];

/* ---------- Niche knowledge ----------------------------------------------- */
const NICHES = {
  health: {
    label: "Health & Pain Relief",
    verdict: "One of the strongest evergreen niches in dropshipping.",
    notes: [
      "Pain-driven buyers act fast and pay more — urgency is built in.",
      "Demos and testimonials carry the sale; lean on before/after + guarantees.",
      "Higher price points ($40–$70) hold, which protects your margins.",
      "Watch claims — keep copy benefit-led, not medical, to stay ad-compliant."
    ]
  },
  home: {
    label: "Home & Aesthetic Decor",
    verdict: "Viral-friendly and impulse-heavy — perfect for short video.",
    notes: [
      "The product transformation IS the ad — minimal creative effort.",
      "Gifting widens the buying window beyond pure impulse.",
      "Saturation is real on the top items — differentiate with bundles.",
      "Younger, aesthetic-driven audience; TikTok/Reels first."
    ]
  },
  kitchen: {
    label: "Kitchen & Cooking Gadgets",
    verdict: "Reliable, demo-driven, broad audience — solid for beginners.",
    notes: [
      "Self-evident demos make creative easy to produce.",
      "Time-saving value is believable and easy to sell.",
      "Tends toward saturation — win on fresh creative and bundles.",
      "Recipe guides are free-margin upsells that lift AOV."
    ]
  },
  pets: {
    label: "Pet Products",
    verdict: "High-LTV, obsessed buyers — one of the best long-term niches.",
    notes: [
      "Pet owners spend emotionally and repeat-buy.",
      "Satisfying/cute content performs exceptionally well.",
      "Lower competition on novel problem-solvers vs. mainstream items.",
      "Easy to build a real brand and email/SMS list here."
    ]
  },
  beauty: {
    label: "Beauty & Skincare",
    verdict: "Viral potential is huge, but trust and compliance matter.",
    notes: [
      "Before/after is the highest-converting content format, period.",
      "Younger audience buys on impulse from creators they trust.",
      "Add usage guides to cut returns and complaints.",
      "Consignable into routines/bundles for strong AOV."
    ]
  },
  gadgets: {
    label: "Tech & Gadgets",
    verdict: "Great for clear-benefit demos; mind seasonality and brands.",
    notes: [
      "Show the benefit in 3 seconds or lose the scroll.",
      "Some items are seasonal — plan ad spend and inventory around it.",
      "Brand-name competition exists; win on value bundles + creative.",
      "Accessory upsells (batteries, cases) lift margins."
    ]
  },
  fashion: {
    label: "Comfort & Fashion Accessories",
    verdict: "Pure impulse + gifting — fast-moving, color-variety driven.",
    notes: [
      "Color/size variety drives multi-item carts.",
      "Comfort ASMR and try-on content convert well.",
      "Crowded at the top — branding and creators separate winners.",
      "Bundles (2-for-1, matching sets) lift AOV cheaply."
    ]
  }
};

/* ---------- Utilities ----------------------------------------------------- */
function scoreLabel(n) {
  if (n >= 85) return "Elite";
  if (n >= 75) return "Strong";
  if (n >= 65) return "Solid";
  if (n >= 55) return "Moderate";
  return "Risky";
}
function fmt(n) { return "$" + n.toFixed(2); }

function buildProfit(p) {
  const landed = p.profit.cost + p.profit.ship;
  const profit = p.profit.sell - landed;
  const marginPct = Math.round((profit / p.profit.sell) * 100);
  const multiple = (p.profit.sell / landed).toFixed(1);
  return {
    cost: fmt(p.profit.cost),
    ship: fmt(p.profit.ship),
    landed: fmt(landed),
    sell: fmt(p.profit.sell),
    profit: fmt(profit),
    marginPct,
    multiple
  };
}

/* Turn a product object into render-ready blocks ---------------------------- */
function productBlocks(p, intro) {
  const pr = buildProfit(p);
  const blocks = [];
  if (intro) blocks.push({ type: "text", text: intro });

  blocks.push({ type: "product-header", emoji: p.emoji, name: p.name, tagline: p.tagline });
  blocks.push({ type: "winning-gauge", score: p.scores.winning, label: scoreLabel(p.scores.winning) });

  blocks.push({ type: "section", icon: "🔥", title: "Why it's winning" });
  blocks.push({ type: "bullets", items: p.why });

  blocks.push({ type: "section", icon: "📈", title: "Validation scores" });
  blocks.push({ type: "scores", scores: [
    { name: "Demand", value: p.scores.demand },
    { name: "Competition (lower = easier)", value: p.scores.competition },
    { name: "Saturation (lower = fresher)", value: p.scores.saturation },
    { name: "Profit margin", value: p.scores.margin },
    { name: "Viral potential", value: p.scores.viral }
  ]});

  blocks.push({ type: "section", icon: "🔍", title: "Competitor analysis" });
  blocks.push({ type: "competitors", rows: p.competitors });
  blocks.push({ type: "kv", items: [
    { k: "Strengths", v: p.compStrengths },
    { k: "Weaknesses (your opening)", v: p.compWeaknesses }
  ]});

  blocks.push({ type: "section", icon: "💰", title: "Profit breakdown" });
  blocks.push({ type: "profit", data: pr });

  blocks.push({ type: "section", icon: "🚚", title: "Supplier options" });
  blocks.push({ type: "suppliers", rows: p.suppliers });

  blocks.push({ type: "section", icon: "🎥", title: "TikTok ad hooks" });
  blocks.push({ type: "hooks", items: p.hooks });

  blocks.push({ type: "section", icon: "📝", title: "Product description" });
  blocks.push({ type: "quote", text: p.description });

  blocks.push({ type: "section", icon: "🧩", title: "Upsells & bundles" });
  blocks.push({ type: "bullets", items: p.upsells });

  blocks.push({ type: "actions", items: [
    { label: "More products like this", prompt: `More winning products in the ${NICHES[p.category].label} niche` },
    { label: "Write the full ad script", prompt: `Write a full TikTok ad script for ${p.name}` },
    { label: "Build the landing page copy", prompt: `Write landing page copy for ${p.name}` }
  ]});

  return blocks;
}

/* ---------- Query routing -------------------------------------------------- */
function findProduct(q) {
  const s = q.toLowerCase();
  let best = null, bestHits = 0;
  for (const p of PRODUCTS) {
    let hits = 0;
    for (const t of p.tags) if (s.includes(t)) hits += 1;
    if (s.includes(p.name.toLowerCase())) hits += 5;
    if (hits > bestHits) { bestHits = hits; best = p; }
  }
  return bestHits >= 1 ? best : null;
}

function detectNiche(q) {
  const s = q.toLowerCase();
  const map = {
    health: ["health", "pain", "wellness", "massage", "posture", "sleep", "recovery"],
    home: ["home", "decor", "room", "bedroom", "aesthetic", "light", "ambience"],
    kitchen: ["kitchen", "cook", "food", "blender", "chopper", "meal"],
    pets: ["pet", "dog", "cat", "fur", "animal"],
    beauty: ["beauty", "skin", "skincare", "face", "pore", "makeup"],
    gadgets: ["gadget", "tech", "fan", "cooling", "electronic"],
    fashion: ["fashion", "slipper", "shoe", "comfort", "clothing", "apparel", "accessor"]
  };
  for (const [niche, words] of Object.entries(map)) {
    if (words.some(w => s.includes(w))) return niche;
  }
  return null;
}

function topByNiche(niche, n = 3) {
  return PRODUCTS
    .filter(p => p.category === niche)
    .sort((a, b) => b.scores.winning - a.scores.winning)
    .slice(0, n);
}

function nicheBlocks(niche) {
  const info = NICHES[niche];
  const picks = topByNiche(niche, 3);
  const blocks = [];
  blocks.push({ type: "text", text: `**${info.label}** — ${info.verdict}` });
  blocks.push({ type: "section", icon: "🧠", title: "What you need to know" });
  blocks.push({ type: "bullets", items: info.notes });
  blocks.push({ type: "section", icon: "🏆", title: "Top picks in this niche right now" });
  blocks.push({ type: "picklist", items: picks.map(p => ({
    emoji: p.emoji, name: p.name, score: p.scores.winning,
    tagline: p.tagline, prompt: `Full research on ${p.name}`
  }))});
  blocks.push({ type: "actions", items: picks.map(p => ({
    label: `${p.emoji} ${p.name}`, prompt: `Full research on ${p.name}`
  }))});
  return blocks;
}

/* Generic "find me a winner" -> highest winning score not yet shown ---------- */
function topOverall(n = 3) {
  return [...PRODUCTS].sort((a, b) => b.scores.winning - a.scores.winning).slice(0, n);
}

/* Broad library view across all niches -------------------------------------- */
function topOverallBlocks(shownIds = []) {
  const picks = topOverall(8);
  const blocks = [];
  blocks.push({ type: "text", text: "**Top winning products right now**, ranked by composite winning score across every niche. Tap any one for full research." });
  blocks.push({ type: "section", icon: "🏆", title: "The shortlist" });
  blocks.push({ type: "picklist", items: picks.map(p => ({
    emoji: p.emoji, name: p.name, score: p.scores.winning,
    tagline: `${NICHES[p.category].label} · ${p.tagline}`, prompt: `Full research on ${p.name}`
  }))});
  return blocks;
}

/* Marketing asset generators ------------------------------------------------ */
function adScriptBlocks(p) {
  return [
    { type: "text", text: `Here's a 30-second TikTok ad script for **${p.name}** — hook hard, show the product fast, close with urgency.` },
    { type: "section", icon: "🎬", title: "Full ad script (UGC style)" },
    { type: "script", lines: [
      { t: "0:00 — Hook", v: p.hooks[0] },
      { t: "0:03 — Problem", v: `Quick, relatable shot of the problem ${p.name} solves. Talk to camera, raw and real.` },
      { t: "0:08 — Reveal", v: `Show ${p.name} in action. Let the demo do the talking — this is your money shot.` },
      { t: "0:15 — Proof", v: `Reaction + a benefit line: "${p.why[0]}"` },
      { t: "0:22 — Objection", v: `Handle the obvious doubt fast (price, "does it work", quality). Keep it casual.` },
      { t: "0:27 — CTA", v: `"Link in bio — they keep selling out." Add scarcity + a soft discount.` }
    ]},
    { type: "section", icon: "🎯", title: "3 alternate hooks to test" },
    { type: "bullets", items: p.hooks.slice(1, 4) },
    { type: "actions", items: [
      { label: "Landing page copy", prompt: `Write landing page copy for ${p.name}` },
      { label: "Full product research", prompt: `Full research on ${p.name}` }
    ]}
  ];
}

function landingBlocks(p) {
  const pr = buildProfit(p);
  return [
    { type: "text", text: `Landing page copy for **${p.name}**, structured to convert cold traffic.` },
    { type: "section", icon: "🏷️", title: "Hero" },
    { type: "kv", items: [
      { k: "Headline", v: p.tagline },
      { k: "Subhead", v: p.why[0] },
      { k: "CTA button", v: `Get ${p.name} — ${pr.sell}` }
    ]},
    { type: "section", icon: "✅", title: "Benefit bullets" },
    { type: "bullets", items: p.why },
    { type: "section", icon: "📝", title: "Product story" },
    { type: "quote", text: p.description },
    { type: "section", icon: "🛡️", title: "Objection handling" },
    { type: "bullets", items: [
      "“Does it actually work?” → Lead with the demo video + real reviews.",
      "“Is it worth the price?” → Anchor against the alternative (appointments, replacements, brand-name pricing).",
      "“What if I don't like it?” → 30-day money-back guarantee removes the risk.",
      "“How long is shipping?” → Set expectations up front; offer a faster shipping upgrade."
    ]},
    { type: "section", icon: "🧩", title: "Upsells at checkout" },
    { type: "bullets", items: p.upsells },
    { type: "actions", items: [
      { label: "Write the ad script", prompt: `Write a full TikTok ad script for ${p.name}` },
      { label: "Full product research", prompt: `Full research on ${p.name}` }
    ]}
  ];
}

/* General tactical advice (no product match) -------------------------------- */
function adviceBlocks(q) {
  return [
    { type: "text", text: "Here's the straight answer, then exactly what to do next." },
    { type: "section", icon: "🎯", title: "The playbook" },
    { type: "bullets", items: [
      "Pick ONE niche and go deep — scattered stores die. Health, pets, and home are the strongest starting points.",
      "Validate before you commit: look for a problem-solver with a clear before/after and an existing trail of viral content to model.",
      "Price for a 3x+ markup over your landed cost (product + shipping). Under that, paid ads eat your margin alive.",
      "Make TikTok-native UGC, not polished ads. Raw, fast, problem-first content wins.",
      "Test cheap and kill fast: 3–5 creatives, small budgets, scale only what gets cheap clicks and a sale."
    ]},
    { type: "section", icon: "🚀", title: "Want me to find you a product?" },
    { type: "text", text: "Tell me a niche (health, pets, home, kitchen, beauty, gadgets, fashion) or just say “find me a winning product” and I'll run full research." },
    { type: "actions", items: [
      { label: "Find me a winning product", prompt: "Find me a winning product" },
      { label: "Best niche for beginners", prompt: "What's the best niche for a beginner dropshipper?" },
      { label: "Health niche products", prompt: "Show me winning products in the health niche" }
    ]}
  ];
}

/* ---------- Main entry: returns blocks for a user query -------------------- */
function dropgenRespond(query, shownIds = []) {
  const q = (query || "").trim();
  const s = q.toLowerCase();

  // Marketing-asset intents (check before generic product match)
  const prodForAsset = findProduct(q);
  if (prodForAsset && /(ad script|ad copy|tiktok script|script|ugc)/.test(s)) {
    return { blocks: adScriptBlocks(prodForAsset), shown: prodForAsset.id };
  }
  if (prodForAsset && /(landing page|landing|page copy|website copy|sales page)/.test(s)) {
    return { blocks: landingBlocks(prodForAsset), shown: prodForAsset.id };
  }

  // Niche-overview intent: a niche keyword + "browse" phrasing -> overview w/ picks
  const niche = detectNiche(q);
  const overviewPhrasing = /(niche|products in|product in|best in|top.*(product|pick)|show me.*product|ideas|what.*sell|across (every|all)|browse|explore|category)/.test(s);
  if (niche && overviewPhrasing) {
    return { blocks: nicheBlocks(niche), shown: null };
  }

  // "Show me top products across every niche" -> a broad picklist
  if (/(top|best).*(product|winner)|across (every|all)|every niche|all niches/.test(s) && !prodForAsset) {
    return { blocks: topOverallBlocks(shownIds), shown: null };
  }

  // Direct product match -> full research
  if (prodForAsset) {
    return { blocks: productBlocks(prodForAsset), shown: prodForAsset.id };
  }

  // "Find me a winner" generic
  if (/(winning product|find.*(product|winner)|what.*sell|best product|profitable product|product idea)/.test(s)) {
    const pick = topOverall(6).find(p => !shownIds.includes(p.id)) || topOverall(1)[0];
    const intro = "Here's a strong pick to run right now — high winning score, clear problem-solver, healthy margin. Full research below.";
    return { blocks: productBlocks(pick, intro), shown: pick.id };
  }

  // Niche detected without overview phrasing -> still give the niche overview
  if (niche) {
    return { blocks: nicheBlocks(niche), shown: null };
  }

  // Beginner / strategy questions
  if (/(beginner|start|how do i|where do i|first store|new to|advice|strategy|tips|margin|pricing|saturat|validat|competitor|supplier|ad|tiktok|facebook|trend)/.test(s)) {
    return { blocks: adviceBlocks(q), shown: null };
  }

  // Greeting / unknown -> friendly capability nudge (mentor voice)
  if (s.length < 4 || /^(hi|hey|hello|yo|sup|help|gm)\b/.test(s)) {
    return { blocks: [
      { type: "text", text: "Let's make money. I find winning products, validate demand, scope suppliers, and build the marketing to sell them." },
      { type: "actions", items: [
        { label: "Find me a winning product", prompt: "Find me a winning product" },
        { label: "Best niche for beginners", prompt: "What's the best niche for a beginner dropshipper?" },
        { label: "Show me health products", prompt: "Show me winning products in the health niche" }
      ]}
    ], shown: null };
  }

  // Fallback -> treat as advice but acknowledge
  return {
    blocks: [
      { type: "text", text: `I can research that. I work best when you point me at a **product**, a **niche** (health, pets, home, kitchen, beauty, gadgets, fashion), or a **task** (ad script, landing page, profit math). Here's the general playbook in the meantime:` },
      ...adviceBlocks(q).slice(1)
    ],
    shown: null
  };
}

/* System prompt used when the user connects a live AI key ------------------- */
const DROPGEN_SYSTEM_PROMPT = `You are DROPGEN, a 7-figure dropshipping mentor and full product-research engine.

PERSONALITY: Direct, data-driven, practical, zero fluff, fast and confident. Friendly but never wishy-washy. Never say "it depends." Never give vague or generic advice. Always give concrete product examples, supplier descriptions, and marketing angles. Always end with an actionable next step.

When the user asks for product research, ALWAYS use this exact structure with these emoji headers:

📦 [Product Name] — short, brandable
🔥 Why It's Winning — 3 to 6 bullets
📈 Validation Scores — Winning Score (0-100), Demand Score, Competition Score, Saturation Score, Viral Potential
🔍 Competitor Analysis — competitor price, ad angles, strengths, weaknesses
💰 Profit Breakdown — supplier cost, shipping cost, recommended selling price, profit margin %
🚚 Supplier Options — 2-4 suppliers (AliExpress / CJ Dropshipping / Temu / Alibaba) with price, rating, shipping time
🎥 TikTok Ad Hooks — 3 to 5 viral hooks
📝 Product Description — short, clean, high-converting
🧩 Upsells + Bundles — 2 to 4 ideas

For niche or strategy questions, drop the structure and answer like a sharp mentor: a clear verdict, then a tight bulleted playbook, then a concrete next step. Keep all numbers framed as research estimates, and keep marketing copy benefit-led (not medical claims) to stay ad-compliant.`;

window.DROPGEN = { dropgenRespond, DROPGEN_SYSTEM_PROMPT, PRODUCTS, NICHES };
