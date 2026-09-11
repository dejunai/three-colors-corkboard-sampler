/**
 * Three Colors of Madness — Chapter One corkboard / notebook sampler
 * Self-contained; persists demo state to localStorage.
 */

(() => {
  "use strict";

  const STORAGE_KEY = "tcom-ch1-corkboard-sampler-v1";
  const SPINE_THRESHOLD = 3;

  /** @type {{id:string,tag:string,title:string,blurb:string}[]} */
  const CARDS = [
    {
      id: "rose_six",
      tag: "Scene",
      title: "Rose Garden — Six",
      blurb: "Six men in evening dress. Single cranial entry each. No exit wounds. No powder burns.",
    },
    {
      id: "birches_eight",
      tag: "Scene",
      title: "Birches — Woman & Boy",
      blurb: "Naomi Freeman and young son among the birches. Packed for elsewhere. Not destitute.",
    },
    {
      id: "official_six",
      tag: "Town",
      title: "Official Count: Six",
      blurb: "Department framing: six club members. The other two are a filing matter.",
    },
    {
      id: "file_eight",
      tag: "File",
      title: "Walter's Eight",
      blurb: "Your hand wrote EIGHT large. The triplicate still says eight against the town's six.",
    },
    {
      id: "ophion_club",
      tag: "Place",
      title: "Ophion Club",
      blurb: "Private society. Last Thursdays for over two years. Six chairs; one never signed a bill.",
    },
    {
      id: "wage_lay",
      tag: "Claim",
      title: "Unpaid Ophion Lay",
      blurb: "Wages owed a whaling ancestor of the Ophion. Documentation hidden; a mother came looking.",
    },
    {
      id: "maternal_talk",
      tag: "Witness",
      title: "Speaking Tenderly of Her",
      blurb: "Toward the end they stopped speaking of power. They spoke of a mother who would have them home.",
    },
    {
      id: "mother_shape",
      tag: "Shape",
      title: "Mother-Shape",
      blurb: "Benevolent maternal power — home, not dominion. The shape they sought. Not the thing that came.",
    },
    {
      id: "kessler_knife",
      tag: "Evidence",
      title: "Kessler's Boning Knife",
      blurb: "Wiped clean under a hedge root. Too clean for a butcher's honest night.",
    },
    {
      id: "watch_317",
      tag: "Unknown",
      title: "Watch Stopped 3:17",
      blurb: "Sixth body: club dress, maker filed smooth. No name in membership rolls.",
    },
    {
      id: "no_exit",
      tag: "Wound",
      title: "No Exit Wound",
      blurb: "The bullet arrived; it did not travel. Collars unscorched. Motif: a faint cough, afterward.",
    },
    {
      id: "behan_declined",
      tag: "Parish",
      title: "Behan Declined Twice",
      blurb: "Invited to sit with them; declined twice. A priest knows when a table is set for something else.",
    },
  ];

  /**
   * Canonical insight pairs (order-independent).
   * Each unlocks a quiet notebook realization and counts toward spine.
   */
  const INSIGHT_PAIRS = [
    {
      id: "ophion_wage",
      a: "ophion_club",
      b: "wage_lay",
      title: "Inheritance, split",
      text: "The club was built on insurance and memory of men they never mourned. She came for a lay unpaid — the other inheritance of the same wreck.",
    },
    {
      id: "six_eight",
      a: "official_six",
      b: "birches_eight",
      title: "Who gets counted",
      text: "Six is the report that holds. Eight is the truth the file keeps. Mother and son were easiest to disappear into the word transient.",
    },
    {
      id: "six_file",
      a: "rose_six",
      b: "file_eight",
      title: "Garden arithmetic",
      text: "Six in evening dress among the roses. Two more among the birches. Your pencil and Odell's do not agree — and only one of you is wrong on purpose.",
    },
    {
      id: "mother_entity",
      a: "maternal_talk",
      b: "mother_shape",
      title: "What they asked for",
      text: "They named it mother because they needed return, not a throne. Naming is not summoning. Summoning does not obey the name.",
    },
    {
      id: "knife_wound",
      a: "kessler_knife",
      b: "no_exit",
      title: "Not a shooting",
      text: "Wounds without travel. A knife wiped past honesty. Whatever finished them did not need the tools of men — or used men as the tool.",
    },
    {
      id: "sixth_blank",
      a: "watch_317",
      b: "ophion_club",
      title: "Load-bearing blank",
      text: "The sixth never signed, never used the front door. Some blanks in a case file are not oversights. This one holds the file open.",
    },
  ];

  /** Notebook entries; relatedCards drive corkboard highlight. */
  const ENTRIES_BASE = [
    {
      id: "e_scene",
      kind: "Scene",
      date: "Night of",
      title: "Rose garden, Ophion estate",
      body: "Six men in evening dress among the roses. Single cranial entries. No exit wounds. No powder burns. Among the birches: a woman and a boy — Naomi Freeman, and her young son. Town wants six. Your file: eight.",
      related: ["rose_six", "birches_eight", "file_eight", "no_exit"],
      coat: "both",
    },
    {
      id: "e_odell",
      kind: "Captain Odell",
      date: "Precinct",
      title: "Gas-main, abandoned",
      body: "Desk clear but for a draft headed GAS-MAIN — penciled, then left. He says: six members are dead; the other two are a filing matter. He is not asking you to invent a gas main. He is asking you not to invent a scandal.",
      related: ["official_six", "file_eight", "rose_six"],
      coat: "both",
    },
    {
      id: "e_almy",
      kind: "Mrs. Almy",
      date: "Boarding",
      title: "Names she will not let go",
      body: "She gives you Naomi. She gives you Ekon Freeman — the boy. She speaks of an unpaid Ophion lay, wages owed a whaling ancestor, papers a mother had located and hidden. She does not call them transients.",
      related: ["birches_eight", "wage_lay", "ophion_club"],
      coat: "both",
    },
    {
      id: "e_behan",
      kind: "Father Behan",
      date: "Parish",
      title: "Table set for something else",
      body: "They asked him twice to sit with them. He declined twice. Dr. Fenn insisted — twice — on burial beside the club rather than his wife. Toward the end they stopped speaking of power. They spoke, tenderly, of her.",
      related: ["behan_declined", "maternal_talk", "mother_shape"],
      coat: "both",
    },
    {
      id: "e_barman_uniform",
      kind: "Club barman",
      date: "Ophion",
      title: "Under the badge",
      body: "He polishes a glass already clean. With the badge in view he gives you nothing you could swear to. Last Thursdays, yes — over two years. Beyond that: he refills glasses. He does not invent meanings.",
      related: ["ophion_club", "watch_317"],
      coat: "uniform",
    },
    {
      id: "e_barman_plain",
      kind: "Club barman",
      date: "Ophion",
      title: "In the plain wool coat",
      body: "Without the badge he speaks softer. Six chairs. The sixth never signed a bill, never came by the front door. Kessler, more than once: She'll have us home. She's no different from any mother.",
      related: ["ophion_club", "maternal_talk", "mother_shape", "watch_317"],
      coat: "plain",
    },
    {
      id: "e_kessler",
      kind: "Evidence",
      date: "Bagged",
      title: "Boning knife; parcel ledger",
      body: "Kessler's knife under a hedge root — wiped clean. Widow: he carried a butcher-paper parcel into a private room; left without it. Shop money bought a chair among men who called him tradesman and less behind his back.",
      related: ["kessler_knife", "ophion_club"],
      coat: "both",
    },
    {
      id: "e_unknown",
      kind: "Unknown male",
      date: "Sixth",
      title: "Watch stopped at 3:17",
      body: "Club dress. Maker filed smooth off the plate. No name in membership rolls. The sixth declines every category: victim, suspect, witness, name. A blank that holds the file open.",
      related: ["watch_317", "ophion_club"],
      coat: "both",
    },
    {
      id: "e_cult",
      kind: "Names",
      date: "Membership",
      title: "Five named; one not",
      body: "Judge Absalom Wexford. Dr. Aldous Fenn. D.A. Miles Corliss. Josiah Pruitt. Otto Kessler. Sixth: UNKNOWN. They sought benevolent maternal power — home, not dominion.",
      related: ["ophion_club", "maternal_talk", "mother_shape", "watch_317"],
      coat: "both",
    },
    {
      id: "e_behan_ins",
      kind: "Behan",
      date: "Aside",
      title: "Insurance was not prophecy",
      body: "He will not sermonize the wreck. A great deal of insurance money followed the Ophion's loss decades back. The name, he says quietly, was classical education — not foresight. The name wasn't prophecy.",
      related: ["ophion_club", "wage_lay"],
      coat: "both",
    },
    {
      id: "e_motif",
      kind: "Note",
      date: "Margin",
      title: "Faint cough; no exit",
      body: "After the garden — a thin, wet cough you cannot place. No exit wound on any of the six. The profession requires a second hole. The skulls refuse it.",
      related: ["no_exit", "rose_six"],
      coat: "both",
    },
  ];

  /** @type {{coat:'uniform'|'plain', links:string[][], insights:string[], activeEntry:string|null}} */
  let state = {
    coat: "uniform",
    links: [],
    insights: [],
    activeEntry: null,
  };

  let selectedCardId = null;

  const els = {
    board: document.getElementById("board"),
    twine: document.getElementById("twine-layer"),
    entries: document.getElementById("notebook-entries"),
    insights: document.getElementById("insights"),
    spineReveal: document.getElementById("spine-reveal"),
    spineStatus: document.getElementById("spine-status"),
    linkStatus: document.getElementById("link-status"),
    coatUniform: document.getElementById("coat-uniform"),
    coatPlain: document.getElementById("coat-plain"),
    reset: document.getElementById("btn-reset"),
  };

  function pairKey(a, b) {
    return [a, b].sort().join("|");
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && typeof data === "object") {
        state.coat = data.coat === "plain" ? "plain" : "uniform";
        state.links = Array.isArray(data.links) ? data.links : [];
        state.insights = Array.isArray(data.insights) ? data.insights : [];
        state.activeEntry = data.activeEntry || null;
      }
    } catch (_) {
      /* ignore corrupt storage */
    }
  }

  function save() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          coat: state.coat,
          links: state.links,
          insights: state.insights,
          activeEntry: state.activeEntry,
        })
      );
    } catch (_) {
      /* private mode etc. */
    }
  }

  function findInsight(a, b) {
    const key = pairKey(a, b);
    return INSIGHT_PAIRS.find((p) => pairKey(p.a, p.b) === key) || null;
  }

  function hasLink(a, b) {
    const key = pairKey(a, b);
    return state.links.some(([x, y]) => pairKey(x, y) === key);
  }

  function cardById(id) {
    return CARDS.find((c) => c.id === id);
  }

  function renderCards() {
    els.board.innerHTML = "";
    CARDS.forEach((card) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card";
      btn.id = `card-${card.id}`;
      btn.setAttribute("role", "listitem");
      btn.dataset.cardId = card.id;
      btn.setAttribute(
        "aria-label",
        `${card.tag}: ${card.title}. ${card.blurb}`
      );
      btn.innerHTML = `
        <span class="card-pin" aria-hidden="true"></span>
        <span class="card-tag">${escapeHtml(card.tag)}</span>
        <span class="card-title">${escapeHtml(card.title)}</span>
        <span class="card-blurb">${escapeHtml(card.blurb)}</span>
      `;
      btn.addEventListener("click", () => onCardClick(card.id));
      els.board.appendChild(btn);
    });
    updateCardClasses();
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderEntries() {
    els.entries.innerHTML = "";
    ENTRIES_BASE.forEach((entry) => {
      const article = document.createElement("article");
      article.className = "entry";
      article.id = `entry-${entry.id}`;
      article.tabIndex = 0;
      article.dataset.entryId = entry.id;
      article.dataset.coat = entry.coat;
      article.setAttribute("role", "button");
      article.setAttribute("aria-pressed", "false");

      if (entry.coat !== "both" && entry.coat !== state.coat) {
        article.classList.add("coat-hidden");
      }

      article.innerHTML = `
        <div class="entry-meta">
          <span>${escapeHtml(entry.kind)}</span>
          <span>${escapeHtml(entry.date)}</span>
        </div>
        <h3 class="entry-title">${escapeHtml(entry.title)}</h3>
        <p class="entry-body">${escapeHtml(entry.body)}</p>
      `;

      const activate = () => onEntrySelect(entry.id);
      article.addEventListener("click", activate);
      article.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
      els.entries.appendChild(article);
    });
    syncEntryActive();
  }

  function onEntrySelect(entryId) {
    state.activeEntry = state.activeEntry === entryId ? null : entryId;
    save();
    syncEntryActive();
    updateCardClasses();
  }

  function syncEntryActive() {
    document.querySelectorAll(".entry").forEach((el) => {
      const on = el.dataset.entryId === state.activeEntry;
      el.classList.toggle("active", on);
      el.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function relatedForActive() {
    if (!state.activeEntry) return new Set();
    const entry = ENTRIES_BASE.find((e) => e.id === state.activeEntry);
    return new Set(entry ? entry.related : []);
  }

  function updateCardClasses() {
    const related = relatedForActive();
    const insightCardIds = new Set();
    state.insights.forEach((id) => {
      const p = INSIGHT_PAIRS.find((x) => x.id === id);
      if (p) {
        insightCardIds.add(p.a);
        insightCardIds.add(p.b);
      }
    });

    document.querySelectorAll(".card").forEach((el) => {
      const id = el.dataset.cardId;
      el.classList.toggle("selected", id === selectedCardId);
      el.classList.toggle("related", related.has(id));
      el.classList.toggle("linked-insight", insightCardIds.has(id));
    });
  }

  function onCardClick(cardId) {
    if (!selectedCardId) {
      selectedCardId = cardId;
      document.body.classList.add("linking");
      els.linkStatus.textContent = `Pin set on “${cardById(cardId).title}”. Choose a second card (Esc cancels).`;
      updateCardClasses();
      return;
    }

    if (selectedCardId === cardId) {
      clearSelection();
      return;
    }

    const a = selectedCardId;
    const b = cardId;
    clearSelection();

    if (hasLink(a, b)) {
      els.linkStatus.textContent = "Those pins already share twine.";
      drawTwine();
      return;
    }

    state.links.push([a, b]);
    const insight = findInsight(a, b);
    if (insight && !state.insights.includes(insight.id)) {
      state.insights.push(insight.id);
    }
    save();
    renderInsights();
    updateSpine();
    drawTwine();
    updateCardClasses();

    const titleA = cardById(a).title;
    const titleB = cardById(b).title;
    if (insight) {
      els.linkStatus.textContent = `Twine: ${titleA} ↔ ${titleB}. A quiet note enters the notebook.`;
      // Soft scroll to new insight
      const last = els.insights.lastElementChild;
      if (last) last.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
    } else {
      els.linkStatus.textContent = `Twine: ${titleA} ↔ ${titleB}.`;
    }
  }

  function clearSelection() {
    selectedCardId = null;
    document.body.classList.remove("linking");
    updateCardClasses();
    if (!state.links.length) {
      els.linkStatus.textContent = "No twine pinned yet.";
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function renderInsights() {
    els.insights.innerHTML = "";
    state.insights.forEach((id) => {
      const p = INSIGHT_PAIRS.find((x) => x.id === id);
      if (!p) return;
      const div = document.createElement("div");
      div.className = "insight-line";
      div.innerHTML = `<strong>Realization — ${escapeHtml(p.title)}</strong>${escapeHtml(p.text)}`;
      els.insights.appendChild(div);
    });
  }

  function updateSpine() {
    const n = state.insights.length;
    const capped = Math.min(n, SPINE_THRESHOLD);
    els.spineStatus.textContent =
      n >= SPINE_THRESHOLD
        ? `Spine: ${n} quiet links. The notebook turns a page of its own.`
        : `Spine: ${capped} of ${SPINE_THRESHOLD} quiet links.`;

    if (n >= SPINE_THRESHOLD) {
      const wasHidden = els.spineReveal.hidden;
      els.spineReveal.hidden = false;
      els.spineReveal.innerHTML = `
        <p class="tag">Notebook — unbidden</p>
        <p>They did not summon a mother.</p>
        <p>They summoned something and called it one.</p>
      `;
      if (wasHidden) {
        els.spineReveal.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "nearest",
        });
      }
    } else {
      els.spineReveal.hidden = true;
      els.spineReveal.innerHTML = "";
    }
  }

  function drawTwine() {
    const wrap = els.board.parentElement;
    const boardRect = wrap.getBoundingClientRect();
    const scrollLeft = wrap.scrollLeft;
    const scrollTop = wrap.scrollTop;

    // Size SVG to content
    const w = Math.max(wrap.clientWidth, els.board.scrollWidth);
    const h = Math.max(wrap.clientHeight, els.board.scrollHeight);
    els.twine.setAttribute("width", String(w));
    els.twine.setAttribute("height", String(h));
    els.twine.setAttribute("viewBox", `0 0 ${w} ${h}`);
    els.twine.innerHTML = "";

    state.links.forEach(([a, b]) => {
      const elA = document.getElementById(`card-${a}`);
      const elB = document.getElementById(`card-${b}`);
      if (!elA || !elB) return;

      const ra = elA.querySelector(".card-pin").getBoundingClientRect();
      const rb = elB.querySelector(".card-pin").getBoundingClientRect();
      const x1 = ra.left + ra.width / 2 - boardRect.left + scrollLeft;
      const y1 = ra.top + ra.height / 2 - boardRect.top + scrollTop;
      const x2 = rb.left + rb.width / 2 - boardRect.left + scrollLeft;
      const y2 = rb.top + rb.height / 2 - boardRect.top + scrollTop;

      // Slight sag for twine feel
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2 + Math.min(28, Math.hypot(x2 - x1, y2 - y1) * 0.08);

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`);
      path.classList.add("twine-path");
      if (findInsight(a, b) && state.insights.includes(findInsight(a, b).id)) {
        path.classList.add("insight");
      }
      els.twine.appendChild(path);
    });

    if (state.links.length && !selectedCardId) {
      els.linkStatus.textContent = `${state.links.length} twine connection${state.links.length === 1 ? "" : "s"} pinned.`;
    }
  }

  function setCoat(coat) {
    state.coat = coat;
    els.coatUniform.classList.toggle("active", coat === "uniform");
    els.coatPlain.classList.toggle("active", coat === "plain");
    els.coatUniform.setAttribute("aria-pressed", coat === "uniform" ? "true" : "false");
    els.coatPlain.setAttribute("aria-pressed", coat === "plain" ? "true" : "false");

    document.querySelectorAll(".entry").forEach((el) => {
      const need = el.dataset.coat;
      const hide = need !== "both" && need !== coat;
      el.classList.toggle("coat-hidden", hide);
    });

    // If active entry is hidden by coat, clear highlight
    if (state.activeEntry) {
      const entry = ENTRIES_BASE.find((e) => e.id === state.activeEntry);
      if (entry && entry.coat !== "both" && entry.coat !== coat) {
        state.activeEntry = null;
        syncEntryActive();
        updateCardClasses();
      }
    }
    save();
  }

  function resetAll() {
    state = { coat: "uniform", links: [], insights: [], activeEntry: null };
    selectedCardId = null;
    document.body.classList.remove("linking");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
    setCoat("uniform");
    syncEntryActive();
    renderInsights();
    updateSpine();
    updateCardClasses();
    drawTwine();
    els.linkStatus.textContent = "Board cleared. No twine pinned yet.";
  }

  function bind() {
    els.coatUniform.addEventListener("click", () => setCoat("uniform"));
    els.coatPlain.addEventListener("click", () => setCoat("plain"));
    els.reset.addEventListener("click", resetAll);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && selectedCardId) {
        clearSelection();
        els.linkStatus.textContent = state.links.length
          ? `${state.links.length} twine connection${state.links.length === 1 ? "" : "s"} pinned.`
          : "No twine pinned yet.";
      }
    });

    window.addEventListener("resize", () => drawTwine());
    els.board.parentElement.addEventListener("scroll", () => drawTwine(), { passive: true });
  }

  // boot
  load();
  renderCards();
  renderEntries();
  bind();
  setCoat(state.coat);
  renderInsights();
  updateSpine();
  updateCardClasses();
  // Twine after layout
  requestAnimationFrame(() => {
    drawTwine();
    requestAnimationFrame(drawTwine);
  });
})();
