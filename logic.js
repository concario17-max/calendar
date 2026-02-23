// 줄바꿈 문자 정규화 함수
function normalizeNewlines(text) {
  return String(text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

// UTC 기준 날짜로 변환함
function toUtcDateOnly(y, m1, d) { return Date.UTC(y, m1 - 1, d); }

// 해당 날짜의 주기가 시작되는 UTC 날짜를 반환함
function getCycleStartUtc(targetDate) {
  const y = targetDate.getFullYear();
  const startThisYearUtc = toUtcDateOnly(y, CONFIG.START_MONTH, CONFIG.START_DAY);
  const targetUtc = toUtcDateOnly(y, targetDate.getMonth() + 1, targetDate.getDate());
  return (targetUtc < startThisYearUtc)
    ? toUtcDateOnly(y - 1, CONFIG.START_MONTH, CONFIG.START_DAY)
    : startThisYearUtc;
}

// 지정된 날짜가 주기 시작일로부터 며칠째인지 계산함
function calcDayIndex(targetDate) {
  const startUtc = getCycleStartUtc(targetDate);
  const targetUtc = toUtcDateOnly(targetDate.getFullYear(), targetDate.getMonth() + 1, targetDate.getDate());
  return Math.floor((targetUtc - startUtc) / 86400000);
}

// 일(Day) 인덱스를 기반으로 효(Yao) 번호를 계산함
function calcYaoNum(dayIndex) { return CONFIG.YAO_START + dayIndex; }

// 일(Day) 인덱스를 기반으로 괘(Gua) 번호를 계산함
function calcGuaNum(dayIndex) { return CONFIG.GUA_START + Math.floor(dayIndex / 6); }

// 해당 효 번호가 유효한 범위 내에 있는지 확인함
function inRange(dayIndex) { return dayIndex >= 0 && dayIndex < CONFIG.YAO_COUNT; }

// 번호가 매겨진 텍스트 블록 파싱 처리함
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

// 효(Yao) 텍스트를 파싱하여 부분별로 분할함 (제목, 요약, 본문)
function splitYao(block) {
  const b = normalizeNewlines(block);
  const lines = b.split("\n");
  let titleLine = (lines[0] || "").trim();

  // 첫 줄의 점(.)과 띄어쓰기 패턴을 찾아 제목과 내용 분리함 ("338. ... . 바파" 구조)
  titleLine = titleLine.replace(/^(\d+\.\s+.*?\.)\s+(.*)$/, "$1\n$2");

  const rest = lines.slice(1).join("\n").trim();
  const paras = rest.split(/\n\s*\n/g).map(s => s.trim()).filter(Boolean);
  return { titleLine, short: paras[0] || "", body: paras.slice(1).join("\n\n") };
}

// 괘(Gua) 텍스트를 파싱하여 부분별로 분할함 (헤더와 메타데이터)
function splitGua(block) {
  const b = normalizeNewlines(block);
  const lines = b.split("\n");
  let meta = lines.slice(1).join("\n").trim();
  // 괄호 앞의 들여쓰기 공간 제거함
  meta = meta.replace(/(^|\n)[ \t]+(?=\()/g, "$1");
  return { header: (lines[0] || "").trim(), meta };
}

// 요소 선택 유틸리티 함수
const el = (id) => document.getElementById(id);

// 방문할 이전/이후 이미지들 미리 로딩함
const preloadedSigils = new Set();
function preloadSigils(yaoNum) {
  const targets = [yaoNum, yaoNum - 1, yaoNum + 1, yaoNum + 7];
  targets.forEach(num => {
    if (num < CONFIG.YAO_START || num >= CONFIG.YAO_START + CONFIG.YAO_COUNT) return;
    if (preloadedSigils.has(num)) return;
    const img = new Image();
    img.src = `images/yao-${num}.png`;
    preloadedSigils.add(num);
  });
}

// 상징(Sigil) 이미지를 요소에 세팅함
function setSigil(yaoNum) {
  const box = el("sigil");
  const img = new Image();
  img.alt = `sigil ${yaoNum}`;
  img.className = "w-full h-full object-contain opacity-0 transition-opacity duration-500 ease-in-out";
  img.src = `images/yao-${yaoNum}.png`;

  // 이미지가 로드되었을 때 컨테이너에 삽입하고 부드럽게 나타나게 함 (깜빡임 방지용)
  img.onload = () => {
    box.innerHTML = "";
    box.appendChild(img);
    requestAnimationFrame(() => img.classList.remove("opacity-0"));
  };

  img.onerror = () => {
    box.innerHTML = "";
    const div = document.createElement("div");
    div.className = "fallback text-sm text-warm-gray-400 font-light italic";
    div.textContent = "해당 날짜는 비움";
    box.appendChild(div);
  };

  preloadSigils(yaoNum);
}

// 계산된 상수 정보 화면에 표시함 (디버그/개발 용도)
function setCalcChip(dayIndex) {
  const chip = el("calcChip");
  if (!chip) return;
  const yaoNum = calcYaoNum(dayIndex);
  const guaNum = calcGuaNum(dayIndex);
  chip.innerHTML = `dayIndex: <b>${dayIndex}</b> · yaoNum: <b>${yaoNum}</b> · guaNum: <b>${guaNum}</b>`;
}

// 내용이 없을 때 화면 포맷 초기화함
function renderEmpty() {
  el("guaHeader").textContent = "해당 날짜는 비움";
  el("guaMeta").textContent = "";
  el("yaoTitle").textContent = "-";
  el("yaoShort").textContent = "-";
  el("yaoBody").textContent = "-";
  el("sigil").innerHTML = `<div class="fallback text-sm text-warm-gray-400 font-light italic">해당 날짜는 비움</div>`;
}

// 실제 데이터를 DOM에 그림
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

// ===== Calendar of the Soul 로직 =====
// 숫자 사이의 공백 제거함
function cleanNumberSpaces(s) { return s.replace(/(\d)\s+(\d)/g, "$1$2"); }

// 날짜 범위 포맷 파싱 및 객체화함
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

// 월일을 연간 서수(Ordinal)로 변환 (윤년 무시)
function mdToOrdinal(m, d) {
  const dim = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let ord = 0;
  for (let i = 1; i < m; i++) ord += dim[i - 1];
  return ord + d;
}

// 대상 날짜가 범위 내에 존재하는지 확인함 (연도가 넘어가는 경우 포함 처리함)
function isInRangeMD(targetM, targetD, range) {
  const t = mdToOrdinal(targetM, targetD);
  const s = mdToOrdinal(range.start.m, range.start.d);
  const e = mdToOrdinal(range.end.m, range.end.d);
  if (s <= e) return t >= s && t <= e;
  return (t >= s) || (t <= e);
}

// 구절 제목 라인에서 몇 번째 주인지 의미 축약어 추출함
function extractWeeksLabel(titleLine) {
  const l = String(titleLine || "").trim();
  const m = l.match(/Weeks\s+(\d{1,2})\s+and\s+(\d{1,2})/i);
  if (m) return { label: `Weeks ${m[1]} & ${m[2]}`, a: +m[1], b: +m[2] };
  const m2 = l.match(/Weeks\s+(\d{1,2})/i);
  if (m2) return { label: `Weeks ${m2[1]}`, a: +m2[1], b: null };
  return { label: l || "노출", a: null, b: null };
}

// 영혼의 달력 그룹 단위로 파싱 분리함
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

// 각 그룹의 세부 내용을 처리 분해함
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
    // 위아래 공백 및 들여쓰기 처리함
    const bodyLines = lines.slice(h.idx + 1, end);
    const body = bodyLines.join("\n").replace(/^\s*\n+/, "").replace(/\n+\s*$/, "");
    sections.push({ week: h.week, range: h.range, text: body.trim() });
  }
  return sections;
}

// 영역이 비었음을 렌더링함
function renderSoulEmpty(message) {
  const badge = el("soulBadge");
  const body = el("soulBody");
  badge.classList.add("dim");
  badge.textContent = "해당 날짜는 비움";
  body.innerHTML = `<span class="text-warm-gray-400 font-bold whitespace-pre-wrap leading-relaxed">${message || "해당 날짜는 비움"}</span>`;
}

// 영혼의 달력 카드 DOM 생성 유틸리티 함수
function buildSoulCard(sec) {
  const card = document.createElement("div");
  // 다크모드 대응을 위한 메타디자인 적용함
  card.className = "space-y-4 bg-white/60 dark:bg-warm-gray-900/60 p-8 rounded-2xl border border-pale-blue-100 dark:border-warm-gray-800 h-full text-center transition-colors";

  const top = document.createElement("div");
  top.className = "flex justify-between items-baseline mb-2 gap-2";

  const spanWeek = document.createElement("div");
  spanWeek.className = "font-bold text-sm text-warm-gray-600 dark:text-warm-gray-300";
  spanWeek.textContent = `${sec.week}주`;

  const spanRange = document.createElement("div");
  spanRange.className = "text-xs text-warm-gray-400 dark:text-warm-gray-500 font-bold whitespace-nowrap uppercase tracking-widest";
  spanRange.textContent = sec.range;

  top.appendChild(spanWeek);
  top.appendChild(spanRange);

  const txt = document.createElement("div");
  txt.className = "whitespace-pre-wrap leading-relaxed text-[15px] font-serif text-warm-gray-800 dark:text-warm-gray-200 mt-4";
  txt.textContent = sec.text || "";

  card.appendChild(top);
  card.appendChild(txt);
  return card;
}

let SOUL_GROUPS = null;

// 특정 날짜에 대한 텍스트 렌더링 호출 컨트롤 함수
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

  const sections = parseWeekSectionsFromGroupBlock(hit.block);
  if (sections.length >= 2) {
    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 md:grid-cols-2 gap-6";
    // 불변성(Immutability) 규칙 적용: 배열 수정 방지하고 복사하여 루프 순회함
    [...sections].slice(0, 2).forEach(sec => {
      grid.appendChild(buildSoulCard(sec));
    });

    body.innerHTML = "";
    body.appendChild(grid);
    return;
  }

  body.innerHTML = `<span class="text-warm-gray-500 font-serif italic whitespace-pre-wrap leading-loose">해당 날짜는 비움</span>`;
}

let GUA_MAP = null, YAO_MAP = null;

// 설정된 날짜 데이터 반영함
function applyDate(dateObj) {
  const dayIndex = calcDayIndex(dateObj);
  setCalcChip(dayIndex);

  if (!inRange(dayIndex)) {
    renderEmpty();
  } else {
    const yaoBlock = YAO_MAP.get(calcYaoNum(dayIndex));
    const guaBlock = GUA_MAP.get(calcGuaNum(dayIndex));

    if (!yaoBlock || !guaBlock) renderEmpty();
    else render(dayIndex, guaBlock, yaoBlock);
  }

  renderSoulForDate(dateObj);

  // 일기장 저장을 위한 현재 날짜 글로벌 적용함
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  currentDateStr = `${y}-${m}-${d}`;
}

// 커스텀 달력 픽커 관리 로직
let pickerDate = new Date();

function toggleDatePicker() {
  const picker = el("customDatePicker");
  if (picker.classList.contains("hidden")) {
    picker.classList.remove("hidden");

    // 초기화 및 표시 범위 확정 로직
    const current = getDateFromInput();
    if (current) {
      pickerDate = new Date(current);
      // 버그 방지를 위해 무조건 1일로 맞춤
      pickerDate.setDate(1);
    }
    renderCalendar();
  } else {
    picker.classList.add("hidden");
  }
}

// 달력 월 단위 변환 유발 버튼 동작
function changeMonth(offset) {
  pickerDate.setMonth(pickerDate.getMonth() + offset);
  renderCalendar();
}

// 달력 날짜 컴포넌트 렌더링함
function renderCalendar() {
  const grid = el("pickerGrid");
  const monthYear = el("pickerMonthYear");
  if (!grid || !monthYear) return;
  grid.innerHTML = "";

  const y = pickerDate.getFullYear();
  const m = pickerDate.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthYear.textContent = `${monthNames[m]} ${y}`;

  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const selected = getDateFromInput();
  const [selectedY, selectedM, selectedD] = selected ? [selected.getFullYear(), selected.getMonth(), selected.getDate()] : [-1, -1, -1];

  for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement("div"));

  for (let d = 1; d <= daysInMonth; d++) {
    const btn = document.createElement("button");
    btn.textContent = d;
    btn.className = "w-8 h-8 rounded-full flex items-center justify-center transition-colors text-warm-gray-600 dark:text-warm-gray-400 hover:bg-elegant-gold hover:text-white dark:hover:text-ray-dark";

    if (y === selectedY && m === selectedM && d === selectedD) {
      btn.className = "w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-elegant-gold text-white font-bold";
    }

    btn.onclick = () => handleDateClick(y, m, d);
    grid.appendChild(btn);
  }
}

// 달력 날짜 클릭 시 동작
function handleDateClick(y, m, d) {
  const newDate = new Date(y, m, d);
  setDateInput(newDate);
  applyDate(newDate);
  el("customDatePicker").classList.add("hidden");
}

// 입력 박스에 날짜 설정함
function setDateInput(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  el("dateInput").value = `${y}-${m}-${d}`;
  if (el("dateDisplay")) {
    el("dateDisplay").textContent = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    if (el("dateDisplaySub")) el("dateDisplaySub").textContent = dateObj.toISOString().split('T')[0];
  }
}

// 입력폼으로부터 날짜 객체 도출함
function getDateFromInput() {
  const v = el("dateInput").value;
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d);
}

let currentDateStr = "";

// 자동으로 적절한 명상 질문을 분석 도출하는 헬퍼 함수
function generateGuidedQuestion(yaoTitle) {
  let cleanTitle = yaoTitle.split("(")[0];
  // 앞쪽 주역 번호 패턴 삭제함
  cleanTitle = cleanTitle.replace(/^\d+\.\s*/, "");
  // 모든 중국어 한자 제거 유도함
  cleanTitle = cleanTitle.replace(/[\u3000-\u303F\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]+/g, "");
  cleanTitle = cleanTitle.replace(/[.]/g, "").trim();

  if (!cleanTitle) cleanTitle = yaoTitle.split("(")[0].trim();

  const questions = [
    `"${cleanTitle}"의 상징을 묵상하며, 오늘 당신의 상황과 어떻게 연결될까요?`,
    `"${cleanTitle}"의 지혜가 오늘 당신이 마주한 과제에 어떤 통찰을 줄 수 있을까요?`,
    `오늘 하루, "${cleanTitle}"의 가르침을 어떻게 행동으로 옮길 수 있을까요?`,
    `"${cleanTitle}"의 관점에서 보았을 때, 내면에서 변화가 필요한 부분은 무엇인가요?`
  ];
  return questions[Math.floor(Math.random() * questions.length)];
}

// 일기장 열람 및 쓰기 모달 팝업 컨트롤 함수
function openJournal() {
  const modal = el("journalModal");
  const dateEl = el("journalDate");
  const questionEl = el("journalQuestion");

  const dateObj = new Date(currentDateStr);
  dateEl.textContent = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const savedKey = `journal_${currentDateStr}`;
  const savedQuestionKey = `journal_q_${currentDateStr}`;
  const savedQuestion = localStorage.getItem(savedQuestionKey);

  if (savedQuestion) {
    questionEl.textContent = savedQuestion;
  } else {
    questionEl.textContent = generateGuidedQuestion(el("yaoTitle").textContent);
  }

  el("journalEntry").value = localStorage.getItem(savedKey) || "";
  modal.classList.remove("hidden");
}

function closeJournal() {
  el("journalModal").classList.add("hidden");
}

// 명상 작성물 스토리지 기록 함수
function saveJournal() {
  if (!currentDateStr) return;
  const entry = el("journalEntry").value;
  const question = el("journalQuestion").textContent;

  localStorage.setItem(`journal_${currentDateStr}`, entry);
  localStorage.setItem(`journal_q_${currentDateStr}`, question);

  closeJournal();
  showToast("성공적으로 저장되었습니다");
}

// 화면 상단 토스트 메시지 표현 애니메이션
function showToast(message) {
  const toast = el("toast");
  if (message) el("toastMessage").textContent = message;

  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.remove("opacity-0"), 10);
  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.classList.add("hidden"), 500);
  }, 3000);
}

// 개별 단건 일기를 로컬 PC에 TXT 보관 용도 다운로드함
function downloadJournalToday() {
  const entry = el("journalEntry").value;
  const content = `\uFEFF날짜: ${el("journalDate").textContent}\n\n성찰 질문:\n${el("journalQuestion").textContent}\n\n나의 기록:\n------------------\n${entry}`;
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

// 전체 일기 포맷팅 유틸리티 함수
function formatJournalEntry(dateDisplay, dateStr, question, entry) {
  let result = `[${dateDisplay} (${dateStr})]\n`;
  if (question) result += `성찰 질문: ${question}\n\n`;
  result += `나의 기록:\n${entry}\n`;
  result += `----------------------------------------\n\n`;
  return result;
}

// 로컬 전체 기록 파일화 통합 배포
function downloadJournalAll() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("journal_") && !key.startsWith("journal_q_")) keys.push(key);
  }

  // 최신순으로 정렬하기 위해 복사본 생성 후 역순 정렬함 (불변성 원칙 준수)
  const sortedKeys = [...keys].sort().reverse();

  if (sortedKeys.length === 0) {
    showToast("저장된 기록이 없습니다");
    return;
  }

  let allContent = "\uFEFFSimSang Journal Archive\n=======================\n\n";
  sortedKeys.forEach(key => {
    const dateStr = key.replace("journal_", "");
    const dateObj = new Date(dateStr);
    const dateDisplay = dateObj.toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const question = localStorage.getItem(`journal_q_${dateStr}`) || "";
    allContent += formatJournalEntry(dateDisplay, dateStr, question, localStorage.getItem(key));
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

// 파싱 및 UI 최초 렌더 셋 동작 관리함
function init() {
  try {
    GUA_MAP = parseNumberedBlocks(GUA_TEXT);
    YAO_MAP = parseNumberedBlocks(YAO_TEXT);
    SOUL_GROUPS = parseSoulGroups(SOUL_TEXT);

    const today = new Date();
    setDateInput(today);
    applyDate(today);
    el("err").textContent = "";
    el("err").classList.add("hidden");

    setTimeout(() => document.body.style.opacity = "1", 100);
  } catch (e) {
    el("err").textContent = e?.message || String(e);
    el("err").classList.remove("hidden");
    document.body.style.opacity = "1";
  }
}

// 이벤트 핸들러 선언 영역임 (클릭, 날짜폼 수정 대응)
el("dateInput").addEventListener("change", () => {
  const d = getDateFromInput();
  if (!d) return;
  el("err").classList.add("hidden");
  applyDate(d);
});

el("dateInput").addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    const d = getDateFromInput();
    if (!d) return;
    el("err").classList.add("hidden");
    applyDate(d);
  }
});

el("btnToday").addEventListener("click", () => {
  const today = new Date();
  setDateInput(today);
  el("err").classList.add("hidden");
  applyDate(today);
});

// 달력 영역 백그라운드 클릭 시의 모달 소멸 제어함
document.addEventListener("click", (e) => {
  const picker = el("customDatePicker");
  const triggerDiv = document.querySelector("div[onclick='toggleDatePicker()']");

  if (picker && !picker.classList.contains("hidden")) {
    const isInsidePicker = picker.contains(e.target);
    const isTrigger = triggerDiv && triggerDiv.contains(e.target);
    if (!isInsidePicker && !isTrigger) {
      picker.classList.add("hidden");
    }
  }
});

init();
