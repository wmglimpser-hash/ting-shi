export const hours = [
  {
    name: "子",
    range: "23:00—01:00",
    element: "木",
    tone: "角",
    meridian: "足少阳胆经",
    mood: "深夜，山色入墨",
  },
  {
    name: "丑",
    range: "01:00—03:00",
    element: "木",
    tone: "角",
    meridian: "足厥阴肝经",
    mood: "夜深，万籁未明",
  },
  {
    name: "寅",
    range: "03:00—05:00",
    element: "金",
    tone: "商",
    meridian: "手太阴肺经",
    mood: "天将亮，气息初醒",
  },
  {
    name: "卯",
    range: "05:00—07:00",
    element: "金",
    tone: "商",
    meridian: "手阳明大肠经",
    mood: "晨光，露水未干",
  },
  {
    name: "辰",
    range: "07:00—09:00",
    element: "土",
    tone: "宫",
    meridian: "足阳明胃经",
    mood: "晨起，山风渐暖",
  },
  {
    name: "巳",
    range: "09:00—11:00",
    element: "土",
    tone: "宫",
    meridian: "足太阴脾经",
    mood: "日上，溪石有光",
  },
  {
    name: "午",
    range: "11:00—13:00",
    element: "火",
    tone: "徵",
    meridian: "手少阴心经",
    mood: "正午，光线丰沛",
  },
  {
    name: "未",
    range: "13:00—15:00",
    element: "火",
    tone: "徵",
    meridian: "手太阳小肠经",
    mood: "午后，风过长坡",
  },
  {
    name: "申",
    range: "15:00—17:00",
    element: "水",
    tone: "羽",
    meridian: "足太阳膀胱经",
    mood: "日斜，云影渐长",
  },
  {
    name: "酉",
    range: "17:00—19:00",
    element: "水",
    tone: "羽",
    meridian: "足少阴肾经",
    mood: "暮色，远钟将起",
  },
  {
    name: "戌",
    range: "19:00—21:00",
    element: "火",
    tone: "徵",
    meridian: "手厥阴心包经",
    mood: "入夜，灯火初上",
  },
  {
    name: "亥",
    range: "21:00—23:00",
    element: "火",
    tone: "徵",
    meridian: "手少阳三焦经",
    mood: "夜静，月行中天",
  },
];

export const tracks = [
  {
    id: 1,
    title: "松影初生",
    sub: "古琴 / 箫 / 埙",
    tone: "角",
    hour: "子时",
    duration: "02:53",
    length: 173,
    audioSrc: "/audio/01-stone-and-pine-at-midnight.mp3",
    coverSrc: "/art/covers/01.png",
    detail: "深夜山色入墨，琴声从松影之间刚刚生出。",
  },
  {
    id: 2,
    title: "埙息未明",
    sub: "埙 / 古琴 / 箫",
    tone: "角",
    hour: "丑时",
    duration: "02:53",
    length: 173,
    audioSrc: "/audio/02-earth-breathing-before-dawn.mp3",
    coverSrc: "/art/covers/02.png",
    detail: "黎明尚未抵达，埙声托住土色与缓慢呼吸。",
  },
  {
    id: 3,
    title: "窗隙见白",
    sub: "箫 / 笛 / 古琴",
    tone: "商",
    hour: "寅时",
    duration: "02:51",
    length: 171,
    audioSrc: "/audio/03-pale-ink-awakening.mp3",
    coverSrc: "/art/covers/03.png",
    detail: "墨蓝向青灰打开，第一束光从窗隙里显现。",
  },
  {
    id: 4,
    title: "露落清商",
    sub: "笛 / 箫 / 磬",
    tone: "商",
    hour: "卯时",
    duration: "02:55",
    length: 175,
    audioSrc: "/audio/04-morning-light-on-still-water.mp3",
    coverSrc: "/art/covers/04.png",
    detail: "露水从草叶落下，晨风清澈而有边界。",
  },
  {
    id: 5,
    title: "山腹承光",
    sub: "笙 / 埙 / 古琴",
    tone: "宫",
    hour: "辰时",
    duration: "02:54",
    length: 174,
    audioSrc: "/audio/05-shan-fu-cheng-guang.mp3",
    coverSrc: "/art/covers/05.png",
    detail: "山腹承住日光，声音回到一个温和的中心。",
  },
  {
    id: 6,
    title: "溪石温声",
    sub: "古琴 / 笙 / 箫",
    tone: "宫",
    hour: "巳时",
    duration: "02:52",
    length: 172,
    audioSrc: "/audio/06-warm-stones-in-the-current.mp3",
    coverSrc: "/art/covers/06.png",
    detail: "溪边石面渐暖，水声把稳定的气息带向远处。",
  },
  {
    id: 7,
    title: "日中有弦",
    sub: "琵琶 / 笛 / 古琴",
    tone: "徵",
    hour: "午时",
    duration: "02:55",
    length: 175,
    audioSrc: "/audio/07-sunlight-across-the-ridge.mp3",
    coverSrc: "/art/covers/07.png",
    detail: "正午光线丰沛，弦上的颗粒清晰而不喧闹。",
  },
  {
    id: 8,
    title: "坡风流金",
    sub: "琵琶 / 笛 / 古琴",
    tone: "徵",
    hour: "未时",
    duration: "02:55",
    length: 175,
    audioSrc: "/audio/08-jin-feng-fu-guo-shan-ji.mp3",
    coverSrc: "/art/covers/08.png",
    detail: "午后风过长坡，声音带着向前流动的金色。",
  },
  {
    id: 9,
    title: "云过深碧",
    sub: "箫 / 古琴 / 埙",
    tone: "羽",
    hour: "申时",
    duration: "02:53",
    length: 173,
    audioSrc: "/audio/09-lv-shui-wan-qing.mp3",
    coverSrc: "/art/covers/09.png",
    detail: "云影变长，光在深碧的水面上缓慢移动。",
  },
  {
    id: 10,
    title: "钟沉暮水",
    sub: "箫 / 磬 / 古琴",
    tone: "羽",
    hour: "酉时",
    duration: "02:54",
    length: 174,
    audioSrc: "/audio/10-where-the-bell-descends.mp3",
    coverSrc: "/art/covers/10.png",
    detail: "一声远钟沉入暮水，山形在薄雾中逐渐收拢。",
  },
  {
    id: 11,
    title: "灯影未冷",
    sub: "古琴 / 箫 / 琵琶",
    tone: "徵",
    hour: "戌时",
    duration: "02:55",
    length: 175,
    audioSrc: "/audio/11-beneath-the-flickering-wick.mp3",
    coverSrc: "/art/covers/11.png",
    detail: "灯影与夜色相接，火的温度仍在，却已向内收拢。",
  },
  {
    id: 12,
    title: "月行归寂",
    sub: "箫 / 古琴 / 埙",
    tone: "徵",
    hour: "亥时",
    duration: "02:53",
    length: 173,
    audioSrc: "/audio/12-moonlight-on-the-high-ridge.mp3",
    coverSrc: "/art/covers/12.png",
    detail: "月光穿过窗棂，最后的暖意回到一处安静中心。",
  },
];

export const tones = [
  {
    name: "角",
    pinyin: "jué",
    element: "木",
    modernNote: "E4",
    pitchPool: "C4 D4 E4 G4 A4",
    colorName: "苔青",
    color: "#668f78",
    note: "清远 · 生发",
    theme: "wood",
  },
  {
    name: "徵",
    pinyin: "zhǐ",
    element: "火",
    modernNote: "G4",
    pitchPool: "C4 D4 E4 G4 A4",
    colorName: "微朱",
    color: "#b96952",
    note: "明亮 · 流动",
    theme: "fire",
  },
  {
    name: "宫",
    pinyin: "gōng",
    element: "土",
    modernNote: "C4",
    pitchPool: "C4 D4 E4 G4 A4",
    colorName: "沙金",
    color: "#ad8b55",
    note: "厚重 · 平和",
    theme: "earth",
  },
  {
    name: "商",
    pinyin: "shāng",
    element: "金",
    modernNote: "D4",
    pitchPool: "C4 D4 E4 G4 A4",
    colorName: "月白",
    color: "#869590",
    note: "清肃 · 空灵",
    theme: "metal",
  },
  {
    name: "羽",
    pinyin: "yǔ",
    element: "水",
    modernNote: "A4",
    pitchPool: "C4 D4 E4 G4 A4",
    colorName: "墨蓝",
    color: "#4d7180",
    note: "深远 · 含蓄",
    theme: "water",
  },
];

export const designStates = [
  {
    id: "growth",
    index: "01",
    name: "生发",
    subtitle: "向外生长",
    range: "05:00 — 09:00",
    trigger: "首次进入",
    description: "从一个声音的种子开始，逐步展开更多细节。",
    hint: "渐进显现 · 向上扩张",
    accent: "#698976",
  },
  {
    id: "flow",
    index: "02",
    name: "流行",
    subtitle: "顺势而行",
    range: "09:00 — 13:00",
    trigger: "连续聆听",
    description: "让曲目、时辰与导航沿同一条声流自然经过。",
    hint: "连续流动 · 手势导航",
    accent: "#667d84",
  },
  {
    id: "transform",
    index: "03",
    name: "化育",
    subtitle: "关系生成",
    range: "13:00 — 17:00",
    trigger: "切换五音",
    description: "把五音、时辰、情绪与场景重新组合成一次聆听。",
    hint: "卡片融合 · 关系重组",
    accent: "#9e8261",
  },
  {
    id: "converge",
    index: "04",
    name: "收敛",
    subtitle: "回到一处",
    range: "17:00 — 21:00",
    trigger: "进入专注",
    description: "收起多余信息，只留下声音、脉搏与正在发生的此刻。",
    hint: "界面减法 · 专注聆听",
    accent: "#c07a5d",
  },
  {
    id: "archive",
    index: "05",
    name: "收藏",
    subtitle: "向内保存",
    range: "21:00 — 05:00",
    trigger: "播放完成",
    description: "进入个人声音档案，保存那些值得再次相遇的时刻。",
    hint: "记忆层叠 · 安静持久",
    accent: "#8994a1",
  },
];

export const formatClock = (date) =>
  date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const heavenlyStems = "甲乙丙丁戊己庚辛壬癸";
const earthlyBranches = "子丑寅卯辰巳午未申酉戌亥";

const lunarDayText = (value) => {
  const day = Number(value);
  if (!day) return value;
  if (day <= 10) return `初${"一二三四五六七八九十"[day - 1]}`;
  if (day < 20) return `十${"一二三四五六七八九"[day - 11]}`;
  if (day === 20) return "二十";
  if (day < 30) return `廿${"一二三四五六七八九"[day - 21]}`;
  return "三十";
};

const fallbackGanzhiYear = (year) =>
  `${heavenlyStems[((year - 4) % 10 + 10) % 10]}${earthlyBranches[((year - 4) % 12 + 12) % 12]}年`;

const ganzhiAt = (index) =>
  `${heavenlyStems[index % 10]}${earthlyBranches[index % 12]}`;

const getGanzhiPillars = (date) => {
  const year = date.getFullYear();
  const solarYear = date < new Date(year, 1, 4) ? year - 1 : year;
  const yearIndex = ((solarYear - 4) % 60 + 60) % 60;
  const yearStem = yearIndex % 10;
  const yinMonthStems = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const monthBoundaries = [
    [2, 4, 2],
    [3, 6, 3],
    [4, 5, 4],
    [5, 5, 5],
    [6, 5, 6],
    [7, 7, 7],
    [8, 7, 8],
    [9, 7, 9],
    [10, 8, 10],
    [11, 7, 11],
    [12, 7, 0],
    [1, 5, 1],
  ];
  let currentMonth = { date: new Date(year - 1, 11, 7), branch: 0 };
  monthBoundaries.forEach(([month, day, branch]) => {
    const boundary = new Date(year, month - 1, day);
    if (boundary <= date && boundary > currentMonth.date) {
      currentMonth = { date: boundary, branch };
    }
  });
  const monthOffset = (currentMonth.branch - 2 + 12) % 12;
  const monthStem = (yinMonthStems[yearStem] + monthOffset) % 10;

  const pillarDate = new Date(date);
  if (pillarDate.getHours() >= 23) pillarDate.setDate(pillarDate.getDate() + 1);
  let y = pillarDate.getFullYear();
  let m = pillarDate.getMonth() + 1;
  const d = pillarDate.getDate();
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const century = Math.floor(y / 100);
  const correction = 2 - century + Math.floor(century / 4);
  const julianDay =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    d +
    correction -
    1524.5;
  const dayIndex = (Math.floor(julianDay + 0.5) + 49) % 60;
  const dayStem = dayIndex % 10;
  const ziHourStems = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  const hourBranch = Math.floor(((date.getHours() + 1) % 24) / 2);
  const hourStem = (ziHourStems[dayStem] + hourBranch) % 10;

  return {
    year: `${ganzhiAt(yearIndex)}年`,
    month: `${heavenlyStems[monthStem]}${earthlyBranches[currentMonth.branch]}月`,
    day: `${ganzhiAt(dayIndex)}日`,
    hour: `${heavenlyStems[hourStem]}${earthlyBranches[hourBranch]}时`,
  };
};

export function getCalendarMeta(date) {
  const gregorian = `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}月${String(date.getDate()).padStart(2, "0")}日`;
  const weekday = new Intl.DateTimeFormat("zh-CN", {
    weekday: "long",
  }).format(date);
  const pillars = getGanzhiPillars(date);
  let lunar = "农历日期";
  let ganzhiYear = pillars.year || fallbackGanzhiYear(date.getFullYear());

  try {
    const parts = new Intl.DateTimeFormat("zh-CN-u-ca-chinese", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).formatToParts(date);
    const month = parts.find((part) => part.type === "month")?.value;
    const day = parts.find((part) => part.type === "day")?.value;
    const yearName = parts.find((part) => part.type === "yearName")?.value;
    if (month && day) lunar = `农历${month}${lunarDayText(day)}`;
    if (yearName && !pillars.year) ganzhiYear = `${yearName}年`;
  } catch {
    // Older browsers can fall back to the stable Gregorian and hour labels.
  }

  return {
    gregorian,
    weekday,
    lunar,
    ganzhiYear,
    hourPillar: pillars.hour,
    ganzhi: `${pillars.year} · ${pillars.month} · ${pillars.day} · ${pillars.hour}`,
  };
}

export function getCurrentHour() {
  const now = new Date();
  const hour = now.getHours();
  const index = hour === 23 ? 0 : Math.floor((hour + 1) / 2);
  return { data: hours[index], index, now };
}

export function getTimeState(date) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 9) return designStates[0];
  if (hour >= 9 && hour < 13) return designStates[1];
  if (hour >= 13 && hour < 17) return designStates[2];
  if (hour >= 17 && hour < 21) return designStates[3];
  return designStates[4];
}
