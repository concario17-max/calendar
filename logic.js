function normalizeNewlines(text) {
  return String(text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function toUtcDateOnly(y, m1, d) { return Date.UTC(y, m1 - 1, d); }

function getCycleStartUtc(targetDate) {
  const y = targetDate.getFullYear();
  const startThisYearUtc = toUtcDateOnly(y, CONFIG.START_MONTH, CONFIG.START_DAY);
  const targetUtc = toUtcDateOnly(y, targetDate.getMonth() + 1, targetDate.getDate());
  return (targetUtc < startThisYearUtc)
    ? toUtcDateOnly(y - 1, CONFIG.START_MONTH, CONFIG.START_DAY)
    : startThisYearUtc;
}

function calcDayIndex(targetDate) {
  const startUtc = getCycleStartUtc(targetDate);
  const targetUtc = toUtcDateOnly(targetDate.getFullYear(), targetDate.getMonth() + 1, targetDate.getDate());
  return Math.floor((targetUtc - startUtc) / 86400000);
}
function calcYaoNum(dayIndex) { return CONFIG.YAO_START + dayIndex; }
function calcGuaNum(dayIndex) { return CONFIG.GUA_START + Math.floor(dayIndex / 6); }
function inRange(dayIndex) { return dayIndex >= 0 && dayIndex < CONFIG.YAO_COUNT; }

function parseNumberedBlocks(text) {
  const t = normalizeNewlines(text);
  const re = /^(\d+)\.\s/mg;
  const starts = [];
  let m;
  while ((m = re.exec(t)) !== null) starts.push({ num: Number(m[1]), idx: m.index });
  const map = new Map();
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    const end = (i + 1 < starts.length) ? starts[i + 1].idx : t.length;
    map.set(start.num, t.slice(start.idx, end).trim());
  }
  return map;
}

function splitYao(block) {
  const b = normalizeNewlines(block);
  const lines = b.split("\n");
  const titleLine = (lines[0] || "").trim();
  const rest = lines.slice(1).join("\n").trim();
  const paras = rest.split(/\n\s*\n/g).map(s => s.trim()).filter(Boolean);
  return { titleLine, short: paras[0] || "", body: paras.slice(1).join("\n\n") };
}

function splitGua(block) {
  const b = normalizeNewlines(block);
  const lines = b.split("\n");
  let meta = lines.slice(1).join("\n").trim();
  // 괄호 앞 들여쓰기 제거: "\n    (..." -> "\n(..."
  meta = meta.replace(/(^|\n)[ \t]+(?=\()/g, "$1");
  return { header: (lines[0] || "").trim(), meta };
}

const el = (id) => document.getElementById(id);

const preloadedSigils = new Set();
function preloadSigils(yaoNum) {
  // Preload current, previous, next, and 1 week ahead
  const targets = [yaoNum, yaoNum - 1, yaoNum + 1, yaoNum + 7];
  targets.forEach(num => {
    if (num < CONFIG.YAO_START || num >= CONFIG.YAO_START + CONFIG.YAO_COUNT) return;
    if (preloadedSigils.has(num)) return;
    const img = new Image();
    img.src = `images/yao-${num}.png`;
    preloadedSigils.add(num);
  });
}

function setSigil(yaoNum) {
  const box = el("sigil");
  // Don't clear immediately to avoid flicker
  const img = new Image();
  img.alt = `sigil ${yaoNum}`;
  img.className = "opacity-0 transition-opacity duration-500 ease-in-out";
  img.src = `images/yao-${yaoNum}.png`;

  img.onload = () => {
    box.innerHTML = "";
    box.appendChild(img);
    // Request animation frame to ensure opacity-0 is rendered before removing it
    requestAnimationFrame(() => {
      img.classList.remove("opacity-0");
    });
  };

  img.onerror = () => {
    box.innerHTML = "";
    const div = document.createElement("div");
    div.className = "fallback text-sm text-warm-gray-400 font-light italic";
    div.innerHTML = `해당 날짜는 비움`;
    box.appendChild(div);
  };

  preloadSigils(yaoNum);
}

function setCalcChip(dayIndex) {
  const chip = document.getElementById("calcChip");
  if (!chip) return;
  const yaoNum = calcYaoNum(dayIndex);
  const guaNum = calcGuaNum(dayIndex);
  chip.innerHTML = `dayIndex: <b>${dayIndex}</b> · yaoNum: <b>${yaoNum}</b> · guaNum: <b>${guaNum}</b>`;
}

function renderEmpty(dayIndex, msg) {
  el("guaHeader").textContent = "해당 날짜는 비움";
  el("guaMeta").textContent = ""; // Hide technical range info
  el("yaoTitle").textContent = "-";
  el("yaoShort").textContent = "-";
  el("yaoBody").textContent = "-";
  el("sigil").innerHTML = `<div class="fallback text-sm text-warm-gray-400 font-light italic">해당 날짜는 비움</div>`;
}

function render(dayIndex, guaBlock, yaoBlock) {
  const g = splitGua(guaBlock);
  el("guaHeader").textContent = g.header;
  el("guaMeta").textContent = g.meta;

  const y = splitYao(yaoBlock);
  el("yaoTitle").textContent = y.titleLine;
  el("yaoShort").textContent = y.short || "(요약 없음)";
  el("yaoBody").textContent = y.body || "(상세 없음)";

  setSigil(calcYaoNum(dayIndex));
}

/* ===== Calendar of the Soul ===== */
function cleanNumberSpaces(s) { return s.replace(/(\d)\s+(\d)/g, "$1$2"); }

function parseDateSpec(specRaw) {
  const spec = cleanNumberSpaces(String(specRaw || "").trim())
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/\s*-\s*/g, "-");

  let m = spec.match(/^(\d{1,2})월\s*(\d{1,2})$/);
  if (m) return { start: { m: +m[1], d: +m[2] }, end: { m: +m[1], d: +m[2] } };

  m = spec.match(/^(\d{1,2})월\s*(\d{1,2})-(\d{1,2})$/);
  if (m) return { start: { m: +m[1], d: +m[2] }, end: { m: +m[1], d: +m[3] } };

  m = spec.match(/^(\d{1,2})월\s*(\d{1,2})-(\d{1,2})월\s*(\d{1,2})$/);
  if (m) return { start: { m: +m[1], d: +m[2] }, end: { m: +m[3], d: +m[4] } };

  return null;
}

function mdToOrdinal(m, d) {
  const dim = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let ord = 0;
  for (let i = 1; i < m; i++) ord += dim[i - 1];
  return ord + d;
}

function isInRangeMD(targetM, targetD, range) {
  const t = mdToOrdinal(targetM, targetD);
  const s = mdToOrdinal(range.start.m, range.start.d);
  const e = mdToOrdinal(range.end.m, range.end.d);
  if (s <= e) return t >= s && t <= e;
  return (t >= s) || (t <= e);
}

function extractWeeksLabel(titleLine) {
  const l = String(titleLine || "").trim();
  const m = l.match(/Weeks\s+(\d{1,2})\s+and\s+(\d{1,2})/i);
  if (m) return { label: `Weeks ${m[1]} & ${m[2]}`, a: +m[1], b: +m[2] };
  const m2 = l.match(/Weeks\s+(\d{1,2})/i);
  if (m2) return { label: `Weeks ${m2[1]}`, a: +m2[1], b: null };
  return { label: l || "노출", a: null, b: null };
}

function parseSoulGroups(text) {
  const t = normalizeNewlines(text);
  const lines = t.split("\n");
  const isGroupTitle = (line) => /CoTS\s+Verses\s+for\s+Weeks/i.test(String(line || "").trim());
  const isDateLine = (line) => {
    const l = String(line || "").trim();
    if (!l.includes("(") || !l.includes(")")) return false;
    const inside = l.slice(l.indexOf("(") + 1, l.lastIndexOf(")"));
    return /월/.test(inside);
  };

  const titleIdxs = [];
  for (let i = 0; i < lines.length; i++) if (isGroupTitle(lines[i])) titleIdxs.push(i);

  const groups = [];
  for (let i = 0; i < titleIdxs.length; i++) {
    const start = titleIdxs[i];
    const end = (i + 1 < titleIdxs.length) ? titleIdxs[i + 1] : lines.length;

    const titleLine = String(lines[start]).trim();
    const block = lines.slice(start, end).join("\n").trim();

    const ranges = [];
    for (let j = start; j < end; j++) {
      if (!isDateLine(lines[j])) continue;
      const l = String(lines[j]).trim();
      const inside = l.slice(l.indexOf("(") + 1, l.lastIndexOf(")"));
      const range = parseDateSpec(inside);
      if (range) ranges.push(range);
    }

    const wk = extractWeeksLabel(titleLine);
    groups.push({ titleLine, weeksLabel: wk.label, weekA: wk.a, weekB: wk.b, ranges, block });
  }
  return groups;
}

/* ✅ 그룹 블록에서 "44 주 (2월 2-8)" 같은 섹션을 분리해서 2칸으로 그리기 */
function parseWeekSectionsFromGroupBlock(block) {
  const t = normalizeNewlines(block);
  const lines = t.split("\n");

  const headerRe = /^\s*(\d{1,2})\s*주\s*\(([^)]+)\)\s*$/;
  const heads = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(headerRe);
    if (m) heads.push({ idx: i, week: +m[1], range: m[2].trim() });
  }
  if (heads.length === 0) return [];

  const sections = [];
  for (let i = 0; i < heads.length; i++) {
    const h = heads[i];
    const end = (i + 1 < heads.length) ? heads[i + 1].idx : lines.length;
    const bodyLines = lines.slice(h.idx + 1, end);
    // 앞뒤 공백 줄 정리
    const body = bodyLines.join("\n").replace(/^\s*\n+/, "").replace(/\n+\s*$/, "");
    sections.push({ week: h.week, range: h.range, text: body.trim() });
  }
  return sections;
}

function renderSoulEmpty(message) {
  const badge = el("soulBadge");
  const body = el("soulBody");
  badge.classList.add("dim");
  badge.textContent = "해당 날짜는 비움";
  body.innerHTML = `<span class="text-warm-gray-400 font-bold whitespace-pre-wrap leading-relaxed">${message || "해당 날짜는 비움"}</span>`;
}

let SOUL_GROUPS = null;

function renderSoulForDate(dateObj) {
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();
  const badge = el("soulBadge");
  const body = el("soulBody");

  if (!SOUL_GROUPS || SOUL_GROUPS.length === 0) {
    renderSoulEmpty("해당 날짜는 비움");
    return;
  }

  const hit = SOUL_GROUPS.find(g => g.ranges.some(r => isInRangeMD(m, d, r)));
  if (!hit) {
    renderSoulEmpty("해당 날짜는 비움");
    return;
  }

  badge.classList.remove("dim");
  badge.textContent = hit.weeksLabel;

  // split into 2 columns if possible
  const sections = parseWeekSectionsFromGroupBlock(hit.block);
  if (sections.length >= 2) {
    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 gap-6"; // Changed to single column with larger gap

    // Keep only first two sections for 2칸 레이아웃 (필요하면 더 확장 가능)
    for (const s of sections.slice(0, 2)) {
      const card = document.createElement("div");
      // Updated styling to match the upper "Detailed Context" box
      card.className = "space-y-4 bg-white/40 p-8 rounded-2xl border border-pale-blue-100 h-full text-center";

      const top = document.createElement("div");
      top.className = "flex justify-between items-baseline mb-2 gap-2";

      const t = document.createElement("div");
      t.className = "font-bold text-sm text-warm-gray-600";
      t.textContent = `${s.week}주`;

      const r = document.createElement("div");
      r.className = "text-xs text-warm-gray-400 font-bold whitespace-nowrap";
      r.textContent = s.range;

      top.appendChild(t);
      top.appendChild(r);

      const txt = document.createElement("div");
      txt.className = "whitespace-pre-wrap leading-relaxed text-sm text-warm-gray-600";
      txt.textContent = s.text || "";

      card.appendChild(top);
      card.appendChild(txt);
      grid.appendChild(card);
    }

    body.innerHTML = "";
    body.appendChild(grid);
    return;
  }

  // fallback: show whole group as pre-wrapped text
  body.innerHTML = `<span class="text-warm-gray-400 font-light italic whitespace-pre-wrap leading-relaxed">해당 날짜는 비움</span>`;
}

let GUA_MAP = null, YAO_MAP = null;

function applyDate(dateObj) {
  const dayIndex = calcDayIndex(dateObj);
  setCalcChip(dayIndex);

  if (!inRange(dayIndex)) {
    renderEmpty(dayIndex);
  } else {
    const yaoNum = calcYaoNum(dayIndex);
    const guaNum = calcGuaNum(dayIndex);
    const yaoBlock = YAO_MAP.get(yaoNum);
    const guaBlock = GUA_MAP.get(guaNum);

    if (!yaoBlock || !guaBlock) {
      renderEmpty(dayIndex, "해당 날짜는 비움");
    } else {
      render(dayIndex, guaBlock, yaoBlock);
    }
  }

  renderSoulForDate(dateObj);

  // Update global date string for Journal
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  currentDateStr = `${y}-${m}-${d}`;
}

// Custom Date Picker Logic
let pickerDate = new Date(); // Tracks the month currently displayed in the picker

function toggleDatePicker() {
  const picker = document.getElementById("customDatePicker");
  if (picker.classList.contains("hidden")) {
    picker.classList.remove("hidden");

    // Initialize picker view with current selected date
    const current = getDateFromInput();
    if (current) {
      pickerDate = new Date(current);
      // Reset to 1st of month to avoid issues
      pickerDate.setDate(1);
    }
    renderCalendar();
  } else {
    picker.classList.add("hidden");
  }
}

function changeMonth(offset) {
  // Update pickerDate month
  pickerDate.setMonth(pickerDate.getMonth() + offset);
  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById("pickerGrid");
  const monthYear = document.getElementById("pickerMonthYear");
  if (!grid || !monthYear) return;

  grid.innerHTML = "";

  const y = pickerDate.getFullYear();
  const m = pickerDate.getMonth();

  // Update Header
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  monthYear.textContent = `${monthNames[m]} ${y}`;

  // Days Calculation
  const firstDay = new Date(y, m, 1).getDay(); // 0(Sun) - 6(Sat)
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  // Values for comparison to highlight selected date
  const selected = getDateFromInput();
  const selectedY = selected ? selected.getFullYear() : -1;
  const selectedM = selected ? selected.getMonth() : -1;
  const selectedD = selected ? selected.getDate() : -1;

  // Empty slots for days before 1st
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    grid.appendChild(emptyDiv);
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const btn = document.createElement("button");
    btn.textContent = d;
    btn.className = "w-8 h-8 rounded-full flex items-center justify-center transition-colors text-warm-gray-600 hover:bg-elegant-gold hover:text-white";

    // Highlight if selected
    if (y === selectedY && m === selectedM && d === selectedD) {
      btn.className = "w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-elegant-gold text-white font-bold";
    }

    // Use closure or bind to pass correct date
    btn.onclick = () => handleDateClick(y, m, d);
    grid.appendChild(btn);
  }
}

function handleDateClick(y, m, d) {
  const newDate = new Date(y, m, d);
  setDateInput(newDate); // Updates hidden input and display text
  applyDate(newDate);    // Updates app content

  // Close picker
  document.getElementById("customDatePicker").classList.add("hidden");
}

function setDateInput(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  el("dateInput").value = `${y}-${m}-${d}`;
  if (el("dateDisplay")) {
    const opts = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    el("dateDisplay").textContent = dateObj.toLocaleDateString('en-US', opts);
    if (el("dateDisplaySub")) el("dateDisplaySub").textContent = dateObj.toISOString().split('T')[0];
  }
}

function getDateFromInput() {
  const v = el("dateInput").value;
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Journal Feature
let currentDateStr = "";

function openJournal() {
  const modal = document.getElementById("journalModal");
  const dateEl = document.getElementById("journalDate");
  const questionEl = document.getElementById("journalQuestion");
  const entryEl = document.getElementById("journalEntry");

  // Format Date for Header
  const dateObj = new Date(currentDateStr);
  const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = dateObj.toLocaleDateString('en-US', dateOpts);

  // Check if there is a saved question for this date
  const savedKey = `journal_${currentDateStr}`;
  const savedQuestionKey = `journal_q_${currentDateStr}`;
  const savedQuestion = localStorage.getItem(savedQuestionKey);

  if (savedQuestion) {
    questionEl.textContent = savedQuestion;
  } else {
    // Generate Guided Question using Yao Title (Specific Line/Entity)
    const yaoTitle = document.getElementById("yaoTitle").textContent;

    // Clean Title Logic:
    // 1. Remove everything after "(" (e.g., "(3/336)...") if present
    let cleanTitle = yaoTitle.split("(")[0];
    // 2. Remove leading number pattern (e.g., "336. ")
    cleanTitle = cleanTitle.replace(/^\d+\.\s*/, "");
    // 3. Remove all Chinese characters (e.g., "上九 ... 凶")
    cleanTitle = cleanTitle.replace(/[\u3000-\u303F\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]+/g, "");
    // 4. Remove leftover punctuation (e.g., ".") and trim spaces
    cleanTitle = cleanTitle.replace(/[.]/g, "").trim();

    // Fallback: if empty, use original (highly unlikely but safe)
    if (!cleanTitle) cleanTitle = yaoTitle.split("(")[0].trim();

    const questions = [
      `"${cleanTitle}"의 상징을 묵상하며, 오늘 당신의 상황과 어떻게 연결될까요?`,
      `"${cleanTitle}"의 지혜가 오늘 당신이 마주한 과제에 어떤 통찰을 줄 수 있을까요?`,
      `오늘 하루, "${cleanTitle}"의 가르침을 어떻게 행동으로 옮길 수 있을까요?`,
      `"${cleanTitle}"의 관점에서 보았을 때, 내면에서 변화가 필요한 부분은 무엇인가요?`
    ];
    // Simple random selection for variety
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    questionEl.textContent = randomQ;
  }

  // Load saved entry
  entryEl.value = localStorage.getItem(savedKey) || "";

  // Show Modal
  modal.classList.remove("hidden");
}

function closeJournal() {
  document.getElementById("journalModal").classList.add("hidden");
}

function saveJournal() {
  const entry = document.getElementById("journalEntry").value;
  const question = document.getElementById("journalQuestion").textContent;

  if (!currentDateStr) return;

  const savedKey = `journal_${currentDateStr}`;
  const savedQuestionKey = `journal_q_${currentDateStr}`;

  localStorage.setItem(savedKey, entry);
  localStorage.setItem(savedQuestionKey, question);

  // Visual feedback with Custom Toast
  closeJournal();
  showToast("성공적으로 저장되었습니다");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toastMessage");
  if (message) msgEl.textContent = message;

  toast.classList.remove("hidden");
  // Small delay to allow display:block to apply before opacity transition
  setTimeout(() => {
    toast.classList.remove("opacity-0");
  }, 10);

  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 500); // 500ms duration matches css duration-500
  }, 3000);
}

function downloadJournalToday() {
  const entry = document.getElementById("journalEntry").value;
  const dateText = document.getElementById("journalDate").textContent;
  const question = document.getElementById("journalQuestion").textContent;

  // Add BOM for UTF-8 compatibility
  const content = `\uFEFF날짜: ${dateText}\n\n성찰 질문:\n${question}\n\n나의 기록:\n------------------\n${entry}`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SimSang_Journal_${currentDateStr}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadJournalAll() {
  // Add BOM for UTF-8 compatibility
  let allContent = "\uFEFFSimSang Journal Archive\n=======================\n\n";
  const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Get all keys and filter for journals (exclude journal_q_)
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // Explicitly exclude journal_q_ keys
    if (key.startsWith("journal_") && !key.startsWith("journal_q_")) {
      keys.push(key);
    }
  }

  // Sort keys by date descending (newest first)
  keys.sort().reverse();

  if (keys.length === 0) {
    showToast("저장된 기록이 없습니다");
    return;
  }

  keys.forEach(key => {
    // key format: journal_YYYY-MM-DD
    const dateStr = key.replace("journal_", "");
    const entry = localStorage.getItem(key);
    const dateObj = new Date(dateStr);
    const dateDisplay = dateObj.toLocaleDateString('ko-KR', dateOpts);

    // Attempt to load saved question
    const savedQuestionKey = `journal_q_${dateStr}`;
    const question = localStorage.getItem(savedQuestionKey) || "";

    allContent += `[${dateDisplay} (${dateStr})]\n`;
    if (question) {
      allContent += `성찰 질문: ${question}\n\n`;
    }
    allContent += `나의 기록:\n${entry}\n`;
    allContent += `----------------------------------------\n\n`;
  });

  const blob = new Blob([allContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SimSang_Journal_All.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function init() {
  try {
    GUA_MAP = parseNumberedBlocks(GUA_TEXT);
    YAO_MAP = parseNumberedBlocks(YAO_TEXT);
    SOUL_GROUPS = parseSoulGroups(SOUL_TEXT);

    const today = new Date();
    setDateInput(today);
    // applyDate called via setDateInput triggers? No, setDateInput just sets value. 
    // We need to ensure applyDate is called and updates currentDateStr.
    applyDate(today);
    el("err").textContent = "";
    el("err").classList.add("hidden");

    // Smooth reveal after everything is ready
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  } catch (e) {
    el("err").textContent = e?.message || String(e);
    el("err").classList.remove("hidden");
    // Ensure page is visible even if there's an error
    document.body.style.opacity = "1";
  }
}

// 날짜 선택: 변경 즉시 반영
el("dateInput").addEventListener("change", () => {
  const d = getDateFromInput();
  if (!d) return;
  el("err").textContent = "";
  el("err").classList.add("hidden");
  applyDate(d);
});

// Enter 키도 동일하게 반영(선택)
el("dateInput").addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    const d = getDateFromInput();
    if (!d) return;
    el("err").textContent = "";
    el("err").classList.add("hidden");
    applyDate(d);
  }
});

el("btnToday").addEventListener("click", () => {
  const today = new Date();
  setDateInput(today);
  el("err").textContent = "";
  el("err").classList.add("hidden");
  applyDate(today);
});

// Close picker when clicking outside
document.addEventListener("click", (e) => {
  const picker = document.getElementById("customDatePicker");
  const triggerDiv = document.querySelector("div[onclick='toggleDatePicker()']");
  const triggerInput = document.getElementById("dateInput");

  // If picker is open
  if (picker && !picker.classList.contains("hidden")) {
    // If click is NOT inside picker AND NOT on the Select Date trigger
    if (!isClickInsidePicker && !isClickOnTriggerDiv) {
      picker.classList.add("hidden");
    }
  }
});

init();
