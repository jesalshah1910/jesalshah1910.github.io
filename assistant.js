/* Ask-about-my-work assistant — fully client-side, no API key, works on static hosting.
   Answers are curated from Jesal's real work. To upgrade to a live Claude-backed chat,
   see the note in the README — it requires a small serverless backend to hold the API key. */
(function () {
  const KB = [
    { k: ["cac", "clarity", "accurate", "16", "87", "model", "accuracy"],
      a: "CAC (Calculated Accurate Clarity) was about rebuilding trust in an AI prediction experts had stopped believing. The platform predicts a polished stone's clarity grade from a scan of the rough, but it was correct only ~16% of the time, so planners reverted to manual judgment. Jesal led the fix across India and Israel — driving production-data collection, planner validation, and customer-feedback analysis, then translating planner behaviour into engineering requirements. Clarity correctness rose to 87%." },
    { k: ["package", "picker", "solution", "27000", "27,000", "optimization", "kapan", "combinations"],
      a: "The Package Solution Picker is a decision-support tool Jesal built that scores and ranks 27,000+ cutting-plan combinations across an entire package (up to ~1,900 stones). It uses independent yield/value scoring weights, 23 configurable filters, a default-vs-optimised comparison, and manual override with undo. It cut package planning time by roughly 95% and earned Global CEO approval for customer deployment. Screenshots of the tool are on its case-study page." },
    { k: ["multiplan", "mvp", "configurable", "shape", "customer research"],
      a: "MVP MultiPlan is an in-progress initiative Jesal is leading. The challenge: different manufacturing customers optimize for different things (weight, shape, clarity), so the planning logic has to be configurable without overwhelming planners. She's running customer research across major clients and designing the configuration primitives for shape combinations, clarity priorities, weight optimization, and inclusion strategies." },
    { k: ["who", "about", "background", "summary", "jesal"],
      a: "Jesal Shah is a Product Manager with 5+ years across enterprise B2B platforms, decision-support tools, and AI-assisted workflows. She specializes in optimization systems — modeling complex expert trade-offs into software people trust — and works across teams in India and Israel at Sarine Technologies." },
    { k: ["experience", "years", "role", "sarine", "rachna", "newway"],
      a: "Jesal currently leads optimization and decision-support products at Sarine Technologies. Earlier she founded and ran Rachna Systems (a digital-services business serving 3,000+ clients) and was an Associate Product Manager at NewWay Software. The through-line: turning messy operational workflows into scalable products." },
    { k: ["skill", "stack", "tools", "ai", "prompt", "figma", "jira"],
      a: "Core strengths: systems and trade-off thinking, customer research, decision-support UX, requirements and specs, and AI-assisted workflows. Toolkit includes Jira, Confluence, Notion, Figma, Power BI, and AI prototyping with Claude." },
    { k: ["yield", "value", "trade", "tradeoff", "optimize"],
      a: "Yield-vs-value is the central trade-off in Jesal's domain: a heavier polished stone (yield) isn't always the most valuable one (value), because quality grade shifts the price. Her tools let users set how aggressively to chase each, then optimize within hard constraints — which is the transferable shape of most enterprise optimization problems." },
    { k: ["contact", "hire", "email", "linkedin", "available", "reach"],
      a: "Jesal is open to product roles in optimization systems, AI workflows, and enterprise SaaS. You can reach her at Jesal.shah1910@gmail.com or via LinkedIn (linkedin.com/in/jesalshah19)." },
  ];

  const FALLBACK = "Good question — I can speak to Jesal's three main projects (CAC, the Package Solution Picker, and MVP MultiPlan), her background, her skills, or how to get in touch. Try one of the suggestions below, or rephrase your question.";

  function answer(q) {
    const s = q.toLowerCase();
    let best = null, score = 0;
    for (const item of KB) {
      const hits = item.k.filter(kw => s.includes(kw)).length;
      if (hits > score) { score = hits; best = item; }
    }
    return score > 0 ? best.a : FALLBACK;
  }

  const launch = document.createElement("button");
  launch.id = "asst-launch";
  launch.textContent = "Ask about my work";
  document.body.appendChild(launch);

  const panel = document.createElement("div");
  panel.id = "asst-panel";
  panel.innerHTML = `
    <div class="asst-head">
      <div><div class="t">Ask about my work</div><div class="sub">Guided assistant</div></div>
      <button id="asst-close" aria-label="Close">&times;</button>
    </div>
    <div class="asst-body" id="asst-body">
      <div class="asst-msg bot">Hi — I can answer questions about Jesal's product work. What would you like to know?</div>
    </div>
    <div class="asst-chips" id="asst-chips"></div>
    <div class="asst-input">
      <input id="asst-q" type="text" placeholder="Type a question…" autocomplete="off">
      <button id="asst-send">&rarr;</button>
    </div>`;
  document.body.appendChild(panel);

  const body = panel.querySelector("#asst-body");
  const input = panel.querySelector("#asst-q");
  const chipsWrap = panel.querySelector("#asst-chips");

  const chips = ["Tell me about CAC", "What is the Package Solution Picker?", "What are her strengths?", "How do I contact her?"];
  chips.forEach(c => {
    const b = document.createElement("button");
    b.className = "asst-chip"; b.textContent = c;
    b.onclick = () => ask(c);
    chipsWrap.appendChild(b);
  });

  function add(text, who) {
    const m = document.createElement("div");
    m.className = "asst-msg " + who; m.textContent = text;
    body.appendChild(m); body.scrollTop = body.scrollHeight;
  }
  function ask(q) {
    if (!q.trim()) return;
    add(q, "user");
    setTimeout(() => add(answer(q), "bot"), 250);
    input.value = "";
  }

  launch.onclick = () => { panel.classList.add("open"); launch.style.display = "none"; input.focus(); };
  panel.querySelector("#asst-close").onclick = () => { panel.classList.remove("open"); launch.style.display = "block"; };
  panel.querySelector("#asst-send").onclick = () => ask(input.value);
  input.addEventListener("keydown", e => { if (e.key === "Enter") ask(input.value); });
})();
