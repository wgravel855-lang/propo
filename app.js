/* ===========================================================================
   DROPGEN — app
   Ties the engine to a ChatGPT-style UI. State persists in localStorage.
   =========================================================================== */
(function () {
  "use strict";

  const { dropgenRespond, DROPGEN_SYSTEM_PROMPT } = window.DROPGEN;

  /* ---------- storage ---------- */
  const LS = {
    chats: "dropgen.chats.v1",
    active: "dropgen.active.v1",
    theme: "dropgen.theme.v1",
    provider: "dropgen.provider.v1",
    key: "dropgen.key.v1",
  };
  const store = {
    get(k, fallback) { try { const v = localStorage.getItem(k); return v == null ? fallback : JSON.parse(v); } catch { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
    raw(k, fallback) { try { return localStorage.getItem(k) ?? fallback; } catch { return fallback; } },
    rawSet(k, v) { try { localStorage.setItem(k, v); } catch {} },
    del(k) { try { localStorage.removeItem(k); } catch {} },
  };

  /* ---------- state ---------- */
  let chats = store.get(LS.chats, {});            // { id: { id, title, created, messages:[{role, text?, blocks?}], shown:[] } }
  let activeId = store.raw(LS.active, null);
  let provider = store.raw(LS.provider, "builtin"); // builtin | openai | anthropic
  let busy = false;

  /* ---------- elements ---------- */
  const $ = (id) => document.getElementById(id);
  const app = $("app");
  const welcome = $("welcome");
  const thread = $("thread");
  const messagesEl = $("messages");
  const dock = $("dock");
  const historyEl = $("history");
  const planLabel = $("planLabel");

  /* ---------- helpers ---------- */
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mdInline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  function saveChats() { store.set(LS.chats, chats); }

  function activeChat() { return activeId ? chats[activeId] : null; }

  function newChat(switchTo = true) {
    const id = uid();
    chats[id] = { id, title: "New chat", created: Date.now(), messages: [], shown: [] };
    if (switchTo) { activeId = id; store.rawSet(LS.active, id); }
    saveChats();
    return chats[id];
  }

  /* =========================================================================
     RENDER — assistant blocks -> DOM
     ========================================================================= */
  function gauge(score, label) {
    const r = 41, c = 2 * Math.PI * r, off = c * (1 - score / 100);
    return `
      <div class="gauge-card">
        <div class="gauge">
          <svg viewBox="0 0 92 92">
            <circle class="g-track" cx="46" cy="46" r="${r}"></circle>
            <circle class="g-fill" cx="46" cy="46" r="${r}"
              stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${c.toFixed(1)}"
              data-off="${off.toFixed(1)}"></circle>
          </svg>
          <div class="g-num"><span class="g-val" data-count="${score}">0</span><span class="g-cap">/ 100</span></div>
        </div>
        <div class="gauge-meta">
          <div class="gm-label">Winning Score</div>
          <div class="gm-verdict">${esc(label)}</div>
          <div class="gm-sub">DROPGEN's composite read on demand, competition, margin, and viral potential.</div>
        </div>
      </div>`;
  }

  function renderBlock(b) {
    switch (b.type) {
      case "text":
        return `<div class="blk blk-text">${mdInline(b.text)}</div>`;
      case "section":
        return `<div class="section-head"><span class="sec-ico">${b.icon}</span>${esc(b.title)}</div>`;
      case "product-header":
        return `<div class="blk product-header">
          <div class="ph-emoji">${b.emoji}</div>
          <div class="ph-text"><h3>📦 ${esc(b.name)}</h3><p>${esc(b.tagline)}</p></div>
        </div>`;
      case "winning-gauge":
        return `<div class="blk">${gauge(b.score, b.label)}</div>`;
      case "scores":
        return `<div class="blk scores">${b.scores.map((s) => `
          <div class="score-row">
            <span class="score-name">${esc(s.name)}</span>
            <span class="score-val">${s.value}/100</span>
            <div class="score-track"><div class="score-fill" data-w="${s.value}"></div></div>
          </div>`).join("")}</div>`;
      case "bullets":
        return `<ul class="blk bullets">${b.items.map((i) => `<li>${mdInline(i)}</li>`).join("")}</ul>`;
      case "kv":
        return `<div class="blk kv">${b.items.map((i) => `<div class="kv-item"><span class="kv-k">${esc(i.k)}:</span> <span class="kv-v">${mdInline(i.v)}</span></div>`).join("")}</div>`;
      case "competitors":
        return `<div class="blk dg-table">${b.rows.map((r) => `
          <div class="dg-row">
            <div class="dr-top"><span class="dr-name">${esc(r.who)}</span><span class="dr-price">${esc(r.price)}</span></div>
            <div class="dr-sub">Angle: ${esc(r.angle)}</div>
          </div>`).join("")}</div>`;
      case "suppliers":
        return `<div class="blk dg-table">${b.rows.map((r) => `
          <div class="dg-row">
            <div class="dr-top"><span class="dr-name">${esc(r.name)}</span><span class="dr-price">${esc(r.price)}</span></div>
            <div class="dr-meta"><span>⭐ ${esc(r.rating)}</span><span>🚚 ${esc(r.ship)}</span></div>
          </div>`).join("")}</div>`;
      case "profit": {
        const d = b.data;
        return `<div class="blk profit-card">
          <div class="profit-grid">
            <div class="profit-cell"><div class="pc-label">Supplier cost</div><div class="pc-val">${d.cost}</div></div>
            <div class="profit-cell"><div class="pc-label">Shipping</div><div class="pc-val">${d.ship}</div></div>
            <div class="profit-cell"><div class="pc-label">Landed cost</div><div class="pc-val">${d.landed}</div></div>
            <div class="profit-cell"><div class="pc-label">Recommended price</div><div class="pc-val">${d.sell}</div></div>
          </div>
          <div class="profit-foot">
            <span class="pf-label">Profit / unit · ${d.marginPct}% margin <span class="pf-mult">(${d.multiple}× markup)</span></span>
            <span class="pf-val">${d.profit}</span>
          </div>
        </div>`;
      }
      case "hooks":
        return `<ul class="blk bullets">${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
      case "quote":
        return `<div class="blk quote">${esc(b.text)}</div>`;
      case "script":
        return `<div class="blk script">${b.lines.map((l) => `
          <div class="script-line"><div class="sl-t">${esc(l.t)}</div><div class="sl-v">${esc(l.v)}</div></div>`).join("")}</div>`;
      case "picklist":
        return `<div class="blk picklist">${b.items.map((p) => `
          <button class="pick" data-prompt="${esc(p.prompt)}">
            <span class="pick-emoji">${p.emoji}</span>
            <span class="pick-body"><span class="pick-name">${esc(p.name)}</span><span class="pick-tag">${esc(p.tagline)}</span></span>
            <span class="pick-score"><span class="ps-num">${p.score}</span><span class="ps-cap">Score</span></span>
          </button>`).join("")}</div>`;
      case "actions":
        return `<div class="blk actions">${b.items.map((a) => `<button class="action-chip" data-prompt="${esc(a.prompt)}">${esc(a.label)}</button>`).join("")}</div>`;
      default:
        return "";
    }
  }

  function renderBlocksHTML(blocks) { return blocks.map(renderBlock).join(""); }

  /* animate gauges + bars inside a node */
  function animateMetrics(node) {
    node.querySelectorAll(".g-fill").forEach((el) => {
      requestAnimationFrame(() => { el.style.strokeDashoffset = el.dataset.off; });
    });
    node.querySelectorAll(".g-val").forEach((el) => {
      const target = +el.dataset.count; const dur = 900; const t0 = performance.now();
      function step(now) {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
    node.querySelectorAll(".score-fill").forEach((el) => {
      requestAnimationFrame(() => { el.style.width = el.dataset.w + "%"; });
    });
  }

  /* =========================================================================
     MESSAGE FLOW
     ========================================================================= */
  function appendUserMessage(text) {
    const div = document.createElement("div");
    div.className = "msg user fade-in";
    div.innerHTML = `<div class="bubble">${esc(text)}</div>`;
    messagesEl.appendChild(div);
    scrollDown();
  }

  function appendAssistantNode(innerHTML, animate = true) {
    const div = document.createElement("div");
    div.className = "msg assistant fade-in";
    div.innerHTML = `<div class="bubble-wrap"><div class="assistant-mark">D</div><div class="assistant-body">${innerHTML}</div></div>`;
    messagesEl.appendChild(div);
    if (animate) animateMetrics(div);
    scrollDown();
    return div;
  }

  function appendTyping() {
    const div = document.createElement("div");
    div.className = "msg assistant";
    div.innerHTML = `<div class="bubble-wrap"><div class="assistant-mark">D</div><div class="assistant-body"><div class="typing"><span></span><span></span><span></span></div></div></div>`;
    messagesEl.appendChild(div);
    scrollDown();
    return div;
  }

  function scrollDown() { thread.scrollTop = thread.scrollHeight; }

  function showThread() {
    welcome.hidden = true;
    thread.hidden = false;
    dock.hidden = false;
  }
  function showWelcome() {
    welcome.hidden = false;
    thread.hidden = true;
    dock.hidden = true;
  }

  /* render a whole chat (on switch / load) */
  function renderChat(chat) {
    messagesEl.innerHTML = "";
    if (!chat || chat.messages.length === 0) { showWelcome(); return; }
    showThread();
    for (const m of chat.messages) {
      if (m.role === "user") {
        const div = document.createElement("div");
        div.className = "msg user";
        div.innerHTML = `<div class="bubble">${esc(m.text)}</div>`;
        messagesEl.appendChild(div);
      } else {
        const html = m.blocks ? renderBlocksHTML(m.blocks) : `<div class="blk blk-text">${mdInline(m.text || "")}</div>`;
        const node = appendAssistantNode(html, false);
        // set final metric states without animation
        node.querySelectorAll(".g-fill").forEach((el) => (el.style.strokeDashoffset = el.dataset.off));
        node.querySelectorAll(".g-val").forEach((el) => (el.textContent = el.dataset.count));
        node.querySelectorAll(".score-fill").forEach((el) => (el.style.width = el.dataset.w + "%"));
      }
    }
    scrollDown();
  }

  /* the core send routine */
  async function send(text) {
    text = (text || "").trim();
    if (!text || busy) return;

    let chat = activeChat();
    if (!chat) chat = newChat();

    // first user line becomes the title
    if (chat.messages.length === 0) {
      chat.title = text.length > 38 ? text.slice(0, 38) + "…" : text;
    }

    showThread();
    appendUserMessage(text);
    chat.messages.push({ role: "user", text });
    saveChats();
    renderHistory();

    busy = true;
    setComposerEnabled(false);
    const typing = appendTyping();

    try {
      if (provider !== "builtin" && store.raw(LS.key, "")) {
        await liveAIRespond(chat, text, typing);
      } else {
        await builtinRespond(chat, text, typing);
      }
    } catch (err) {
      typing.remove();
      const msg = "Something broke on that request. " + (err && err.message ? err.message : "Try again, or switch back to the built-in engine in Settings.");
      const blocks = [{ type: "text", text: msg }];
      appendAssistantNode(renderBlocksHTML(blocks));
      chat.messages.push({ role: "assistant", blocks });
      saveChats();
    } finally {
      busy = false;
      setComposerEnabled(true);
      $("dockInput").focus();
    }
  }

  /* built-in engine path (with a small delay so the typing dots read naturally) */
  function builtinRespond(chat, text, typing) {
    return new Promise((resolve) => {
      const delay = 420 + Math.random() * 380;
      setTimeout(() => {
        const { blocks, shown } = dropgenRespond(text, chat.shown || []);
        typing.remove();
        appendAssistantNode(renderBlocksHTML(blocks));
        chat.messages.push({ role: "assistant", blocks });
        if (shown) { chat.shown = chat.shown || []; if (!chat.shown.includes(shown)) chat.shown.push(shown); }
        saveChats();
        resolve();
      }, delay);
    });
  }

  /* live AI path (OpenAI or Anthropic) — streams plain text, rendered as markdown-lite */
  async function liveAIRespond(chat, text, typing) {
    const key = store.raw(LS.key, "");
    const history = chat.messages
      .filter((m) => m.role === "user" || (m.role === "assistant" && m.text))
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.text || "" }));

    let full = "";
    typing.remove();
    const node = appendAssistantNode(`<div class="blk blk-text" id="streamTarget"></div>`, false);
    const target = node.querySelector("#streamTarget");

    if (provider === "openai") {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          stream: true,
          messages: [{ role: "system", content: DROPGEN_SYSTEM_PROMPT }, ...history],
        }),
      });
      if (!res.ok) throw new Error("OpenAI " + res.status + " — check your key/model.");
      full = await readSSE(res, (delta) => { target.innerHTML = mdLite(full += delta); scrollDown(); }, "openai");
    } else {
      // anthropic
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1500,
          stream: true,
          system: DROPGEN_SYSTEM_PROMPT,
          messages: history.length ? history : [{ role: "user", content: text }],
        }),
      });
      if (!res.ok) throw new Error("Anthropic " + res.status + " — check your key.");
      full = await readSSE(res, (delta) => { target.innerHTML = mdLite(full += delta); scrollDown(); }, "anthropic");
    }

    chat.messages.push({ role: "assistant", text: full });
    saveChats();
  }

  /* read a server-sent-events stream from either provider */
  async function readSSE(res, onDelta, kind) {
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "", acc = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop();
      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith("data:")) continue;
        const data = t.slice(5).trim();
        if (data === "[DONE]") continue;
        try {
          const j = JSON.parse(data);
          let delta = "";
          if (kind === "openai") delta = j.choices?.[0]?.delta?.content || "";
          else if (j.type === "content_block_delta") delta = j.delta?.text || "";
          if (delta) { acc += delta; onDelta(delta); }
        } catch { /* ignore keep-alive lines */ }
      }
    }
    return acc;
  }

  /* very small markdown for live AI output (headers, bold, bullets, line breaks) */
  function mdLite(s) {
    const lines = esc(s).split("\n");
    let html = "", inList = false;
    for (let line of lines) {
      line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      const bullet = line.match(/^\s*[-•*]\s+(.*)$/);
      if (bullet) {
        if (!inList) { html += '<ul class="bullets">'; inList = true; }
        html += `<li>${bullet[1]}</li>`;
        continue;
      }
      if (inList) { html += "</ul>"; inList = false; }
      if (/^[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/u.test(line.trim()) && line.trim().length < 60) {
        html += `<div class="section-head" style="margin:14px 0 8px">${line.trim()}</div>`;
      } else if (line.trim() === "") {
        html += "<div style='height:6px'></div>";
      } else {
        html += `<div class="blk-text" style="margin-bottom:6px">${line}</div>`;
      }
    }
    if (inList) html += "</ul>";
    return html;
  }

  /* =========================================================================
     SIDEBAR / HISTORY
     ========================================================================= */
  function renderHistory() {
    const ids = Object.values(chats).sort((a, b) => b.created - a.created).map((c) => c.id);
    if (ids.length === 0) { historyEl.innerHTML = `<div class="history-empty">No chats yet</div>`; return; }
    historyEl.innerHTML = ids.map((id) => {
      const c = chats[id];
      return `<button class="history-item ${id === activeId ? "active" : ""}" data-id="${id}">
        <span class="hi-title">${esc(c.title)}</span>
        <span class="hi-del" data-del="${id}" title="Delete">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </span>
      </button>`;
    }).join("");
  }

  function switchChat(id) {
    activeId = id;
    store.rawSet(LS.active, id);
    renderHistory();
    renderChat(chats[id]);
    closeNav();
  }

  function deleteChat(id) {
    delete chats[id];
    if (activeId === id) {
      activeId = null;
      store.del(LS.active);
      showWelcome();
      messagesEl.innerHTML = "";
    }
    saveChats();
    renderHistory();
  }

  /* =========================================================================
     THEME
     ========================================================================= */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    store.rawSet(LS.theme, t);
    // sun/moon icon swap
    const ico = $("themeIco");
    if (t === "dark") {
      ico.innerHTML = `<circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2.5v2.4M12 19.1v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`;
    } else {
      ico.innerHTML = `<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`;
    }
    // reflect in settings segment if open
    document.querySelectorAll("#themeSeg .seg-btn").forEach((b) => b.classList.toggle("active", b.dataset.themeVal === t));
  }

  /* =========================================================================
     NAV (mobile)
     ========================================================================= */
  function openNav() { app.classList.add("nav-open"); }
  function closeNav() { app.classList.remove("nav-open"); }

  /* =========================================================================
     COMPOSER WIRING
     ========================================================================= */
  function setComposerEnabled(on) {
    ["welcomeSend", "dockSend"].forEach((id) => { const b = $(id); if (b) b.disabled = !on; });
  }
  function autoGrow(el) { el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 200) + "px"; }

  function wireComposer(inputId, sendId) {
    const input = $(inputId), btn = $(sendId);
    input.addEventListener("input", () => autoGrow(input));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const v = input.value;
        input.value = ""; autoGrow(input);
        send(v);
      }
    });
    btn.addEventListener("click", () => {
      const v = input.value;
      input.value = ""; autoGrow(input);
      send(v);
    });
  }

  /* delegate clicks for chips / actions / picks / history */
  document.addEventListener("click", (e) => {
    const promptEl = e.target.closest("[data-prompt]");
    if (promptEl) { send(promptEl.dataset.prompt); return; }

    const del = e.target.closest("[data-del]");
    if (del) { e.stopPropagation(); deleteChat(del.dataset.del); return; }

    const hist = e.target.closest(".history-item");
    if (hist && !e.target.closest("[data-del]")) { switchChat(hist.dataset.id); return; }
  });

  /* =========================================================================
     SETTINGS MODAL
     ========================================================================= */
  const modalScrim = $("modalScrim");
  function openSettings() {
    closeSearch();           // never stack modals
    closeNav();
    // hydrate controls
    document.querySelectorAll("#providerSeg .seg-btn").forEach((b) => b.classList.toggle("active", b.dataset.prov === provider));
    document.querySelectorAll("#themeSeg .seg-btn").forEach((b) => b.classList.toggle("active", b.dataset.themeVal === (store.raw(LS.theme, "light"))));
    $("apiKeyInput").value = store.raw(LS.key, "");
    $("keyWarn").hidden = provider === "builtin";
    modalScrim.hidden = false;
  }
  function closeSettings() { modalScrim.hidden = true; }

  document.querySelectorAll("#themeSeg .seg-btn").forEach((b) =>
    b.addEventListener("click", () => applyTheme(b.dataset.themeVal)));

  document.querySelectorAll("#providerSeg .seg-btn").forEach((b) =>
    b.addEventListener("click", () => {
      provider = b.dataset.prov;
      document.querySelectorAll("#providerSeg .seg-btn").forEach((x) => x.classList.toggle("active", x === b));
      $("keyWarn").hidden = provider === "builtin";
    }));

  $("saveSettings").addEventListener("click", () => {
    store.rawSet(LS.provider, provider);
    const k = $("apiKeyInput").value.trim();
    if (k) store.rawSet(LS.key, k); else store.del(LS.key);
    updatePlanLabel();
    closeSettings();
  });

  $("clearAllBtn").addEventListener("click", () => {
    if (!confirm("Delete all saved chats from this browser?")) return;
    chats = {}; activeId = null;
    store.set(LS.chats, {}); store.del(LS.active);
    renderHistory(); showWelcome(); messagesEl.innerHTML = "";
    closeSettings();
  });

  function updatePlanLabel() {
    const hasKey = !!store.raw(LS.key, "");
    if (provider !== "builtin" && hasKey) {
      planLabel.textContent = provider === "openai" ? "Live · OpenAI" : "Live · Anthropic";
    } else {
      planLabel.textContent = "Built-in engine";
    }
  }

  /* =========================================================================
     SEARCH MODAL
     ========================================================================= */
  const searchScrim = $("searchScrim");
  function openSearch() {
    closeSettings();         // never stack modals
    closeNav();
    searchScrim.hidden = false;
    $("searchInput").value = "";
    renderSearch("");
    setTimeout(() => $("searchInput").focus(), 30);
  }
  function closeSearch() { searchScrim.hidden = true; }
  function renderSearch(q) {
    q = q.toLowerCase().trim();
    const list = Object.values(chats).sort((a, b) => b.created - a.created);
    const matches = list.filter((c) => {
      if (!q) return true;
      if (c.title.toLowerCase().includes(q)) return true;
      return c.messages.some((m) => (m.text || "").toLowerCase().includes(q));
    });
    const out = $("searchResults");
    if (matches.length === 0) { out.innerHTML = `<div class="search-empty">No matching chats.</div>`; return; }
    out.innerHTML = matches.map((c) => {
      const firstUser = c.messages.find((m) => m.role === "user");
      return `<button class="search-res-item" data-search-id="${c.id}">
        ${esc(c.title)}<div class="sr-snip">${esc(firstUser ? firstUser.text : "Empty chat")}</div>
      </button>`;
    }).join("");
  }
  $("searchInput").addEventListener("input", (e) => renderSearch(e.target.value));
  $("searchResults").addEventListener("click", (e) => {
    const it = e.target.closest("[data-search-id]");
    if (it) { closeSearch(); switchChat(it.dataset.searchId); }
  });

  /* =========================================================================
     BIND TOP-LEVEL UI
     ========================================================================= */
  $("newChatBtn").addEventListener("click", () => { newChat(); renderHistory(); showWelcome(); messagesEl.innerHTML = ""; $("welcomeInput").focus(); closeNav(); });
  $("searchBtn").addEventListener("click", openSearch);
  $("libraryBtn").addEventListener("click", () => { send("Show me the top winning products across every niche"); closeNav(); });
  $("settingsBtn").addEventListener("click", openSettings);
  $("modalClose").addEventListener("click", closeSettings);
  $("searchClose").addEventListener("click", closeSearch);
  modalScrim.addEventListener("click", (e) => { if (e.target === modalScrim) closeSettings(); });
  searchScrim.addEventListener("click", (e) => { if (e.target === searchScrim) closeSearch(); });
  $("themeBtn").addEventListener("click", () => applyTheme(store.raw(LS.theme, "light") === "dark" ? "light" : "dark"));
  $("collapseBtn").addEventListener("click", () => app.classList.toggle("collapsed"));
  $("menuBtn").addEventListener("click", openNav);
  $("scrim").addEventListener("click", closeNav);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeSettings(); closeSearch(); closeNav(); }
    if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openSearch(); }
  });

  /* =========================================================================
     INIT
     ========================================================================= */
  function init() {
    applyTheme(store.raw(LS.theme, "light"));
    updatePlanLabel();
    wireComposer("welcomeInput", "welcomeSend");
    wireComposer("dockInput", "dockSend");
    renderHistory();

    if (activeId && chats[activeId]) renderChat(chats[activeId]);
    else showWelcome();

    $("welcomeInput").focus();
  }

  init();
})();
