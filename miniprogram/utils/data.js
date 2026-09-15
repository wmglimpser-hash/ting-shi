const stems = "甲乙丙丁戊己庚辛壬癸";
const branches = "子丑寅卯辰巳午未申酉戌亥";

const hours = [
  { name: "子", range: "23:00—01:00", element: "木", tone: "角", meridian: "足少阳胆经", mood: "深夜，山色入墨" },
  { name: "丑", range: "01:00—03:00", element: "木", tone: "角", meridian: "足厥阴肝经", mood: "夜深，万籁未明" },
  { name: "寅", range: "03:00—05:00", element: "金", tone: "商", meridian: "手太阴肺经", mood: "天将亮，气息初醒" },
  { name: "卯", range: "05:00—07:00", element: "金", tone: "商", meridian: "手阳明大肠经", mood: "晨光，露水未干" },
  { name: "辰", range: "07:00—09:00", element: "土", tone: "宫", meridian: "足阳明胃经", mood: "晨起，山风渐暖" },
  { name: "巳", range: "09:00—11:00", element: "土", tone: "宫", meridian: "足太阴脾经", mood: "日上，溪石有光" },
  { name: "午", range: "11:00—13:00", element: "火", tone: "徵", meridian: "手少阴心经", mood: "正午，光线丰沛" },
  { name: "未", range: "13:00—15:00", element: "火", tone: "徵", meridian: "手太阳小肠经", mood: "午后，风过长坡" },
  { name: "申", range: "15:00—17:00", element: "水", tone: "羽", meridian: "足太阳膀胱经", mood: "日斜，云影渐长" },
  { name: "酉", range: "17:00—19:00", element: "水", tone: "羽", meridian: "足少阴肾经", mood: "暮色，远钟将起" },
  { name: "戌", range: "19:00—21:00", element: "火", tone: "徵", meridian: "手厥阴心包经", mood: "入夜，灯火初上" },
  { name: "亥", range: "21:00—23:00", element: "火", tone: "徵", meridian: "手少阳三焦经", mood: "夜静，月行中天" },
];

const tracks = [
  [1, "松影初生", "古琴 / 箫 / 埙", "角", "子时", "02:53", 173, "深夜山色入墨，琴声从松影之间刚刚生出。", "01-stone-and-pine-at-midnight.mp3"],
  [2, "埙息未明", "埙 / 古琴 / 箫", "角", "丑时", "02:53", 173, "黎明尚未抵达，埙声托住土色与缓慢呼吸。", "02-earth-breathing-before-dawn.mp3"],
  [3, "窗隙见白", "箫 / 笛 / 古琴", "商", "寅时", "02:51", 171, "墨蓝向青灰打开，第一束光从窗隙里显现。", "03-pale-ink-awakening.mp3"],
  [4, "露落清商", "笛 / 箫 / 磬", "商", "卯时", "02:55", 175, "露水从草叶落下，晨风清澈而有边界。", "04-morning-light-on-still-water.mp3"],
  [5, "山腹承光", "笙 / 埙 / 古琴", "宫", "辰时", "02:54", 174, "山腹承住日光，声音回到一个温和的中心。", "05-shan-fu-cheng-guang.mp3"],
  [6, "溪石温声", "古琴 / 笙 / 箫", "宫", "巳时", "02:52", 172, "溪边石面渐暖，水声把稳定的气息带向远处。", "06-warm-stones-in-the-current.mp3"],
  [7, "日中有弦", "琵琶 / 笛 / 古琴", "徵", "午时", "02:55", 175, "正午光线丰沛，弦上的颗粒清晰而不喧闹。", "07-sunlight-across-the-ridge.mp3"],
  [8, "坡风流金", "琵琶 / 笛 / 古琴", "徵", "未时", "02:55", 175, "午后风过长坡，声音带着向前流动的金色。", "08-jin-feng-fu-guo-shan-ji.mp3"],
  [9, "云过深碧", "箫 / 古琴 / 埙", "羽", "申时", "02:53", 173, "云影变长，光在深碧的水面上缓慢移动。", "09-lv-shui-wan-qing.mp3"],
  [10, "钟沉暮水", "箫 / 磬 / 古琴", "羽", "酉时", "02:54", 174, "一声远钟沉入暮水，山形在薄雾中逐渐收拢。", "10-where-the-bell-descends.mp3"],
  [11, "灯影未冷", "古琴 / 箫 / 琵琶", "徵", "戌时", "02:55", 175, "灯影与夜色相接，火的温度仍在，却已向内收拢。", "11-beneath-the-flickering-wick.mp3"],
  [12, "月行归寂", "箫 / 古琴 / 埙", "徵", "亥时", "02:53", 173, "月光穿过窗棂，最后的暖意回到一处安静中心。", "12-moonlight-on-the-high-ridge.mp3"],
].map(([id, title, sub, tone, hour, duration, length, detail, audioFile]) => ({
  id,
  title,
  sub,
  tone,
  hour,
  duration,
  length,
  detail,
  audioSrc: `/assets/audio/${audioFile}`,
}));

const tones = [
  { name: "角", pinyin: "jué", element: "木", colorName: "苔青", color: "#668f78", note: "清远 · 生发" },
  { name: "徵", pinyin: "zhǐ", element: "火", colorName: "微朱", color: "#b96952", note: "明亮 · 流动" },
  { name: "宫", pinyin: "gōng", element: "土", colorName: "沙金", color: "#ad8b55", note: "厚重 · 平和" },
  { name: "商", pinyin: "shāng", element: "金", colorName: "月白", color: "#869590", note: "清肃 · 空灵" },
  { name: "羽", pinyin: "yǔ", element: "水", colorName: "墨蓝", color: "#4d7180", note: "深远 · 含蓄" },
];

const states = [
  { id: "growth", name: "生发", subtitle: "向外生长", range: "05:00 — 09:00", title: "一声入耳，万象徐开", desc: "从一粒声音种子，生出今日的听觉旅程。", hint: "渐进显现 · 向上扩张" },
  { id: "flow", name: "流行", subtitle: "顺势而行", range: "09:00 — 13:00", title: "顺势而行，声声相续", desc: "让音乐在时间里流动，越听越懂你。", hint: "连续流动 · 手势导航" },
  { id: "transform", name: "化育", subtitle: "关系生成", range: "13:00 — 17:00", title: "万物和鸣，由你组合", desc: "选择此刻的状态，让音乐为你而生。", hint: "卡片融合 · 关系重组" },
  { id: "converge", name: "收敛", subtitle: "回到一处", range: "17:00 起", title: "归于一心，声入深处", desc: "减少干扰，让声音成为唯一的陪伴。", hint: "界面减法 · 专注聆听" },
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function getGanzhi(date) {
  const year = date.getFullYear();
  const solarYear = date < new Date(year, 1, 4) ? year - 1 : year;
  const yearIndex = ((solarYear - 4) % 60 + 60) % 60;
  const monthBoundaries = [[2, 4, 2], [3, 6, 3], [4, 5, 4], [5, 5, 5], [6, 5, 6], [7, 7, 7], [8, 7, 8], [9, 7, 9], [10, 8, 10], [11, 7, 11], [12, 7, 0], [1, 5, 1]];
  let month = { date: new Date(year - 1, 11, 7), branch: 0 };
  monthBoundaries.forEach(([m, d, branch]) => {
    const boundary = new Date(year, m - 1, d);
    if (boundary <= date && boundary > month.date) month = { date: boundary, branch };
  });
  const yearStem = yearIndex % 10;
  const monthStart = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0][yearStem];
  const monthStem = (monthStart + (month.branch - 2 + 12) % 12) % 10;
  const shifted = new Date(date);
  if (shifted.getHours() >= 23) shifted.setDate(shifted.getDate() + 1);
  let y = shifted.getFullYear();
  let m = shifted.getMonth() + 1;
  const d = shifted.getDate();
  if (m <= 2) { y -= 1; m += 12; }
  const century = Math.floor(y / 100);
  const correction = 2 - century + Math.floor(century / 4);
  const jdn = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + correction - 1524.5;
  const dayIndex = (Math.floor(jdn + 0.5) + 49) % 60;
  const hourBranch = Math.floor(((date.getHours() + 1) % 24) / 2);
  const hourStart = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8][dayIndex % 10];
  const hourStem = (hourStart + hourBranch) % 10;
  return {
    year: stems[yearIndex % 10] + branches[yearIndex % 12] + "年",
    month: stems[monthStem] + branches[month.branch] + "月",
    day: stems[dayIndex % 10] + branches[dayIndex % 12] + "日",
    hour: stems[hourStem] + branches[hourBranch] + "时",
  };
}

function lunarLabel(date) {
  try {
    const formatter = new Intl.DateTimeFormat("zh-CN-u-ca-chinese", { month: "long", day: "numeric" });
    const parts = formatter.formatToParts(date);
    const month = parts.find((item) => item.type === "month");
    const day = parts.find((item) => item.type === "day");
    return month && day ? `农历${month.value}${day.value}` : "农历日期";
  } catch (error) {
    return "农历日期";
  }
}

function getCalendarMeta(date) {
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const pillars = getGanzhi(date);
  return {
    gregorian: `${date.getFullYear()}年${pad(date.getMonth() + 1)}月${pad(date.getDate())}日`,
    weekday: weekdays[date.getDay()],
    lunar: lunarLabel(date),
    ganzhi: `${pillars.year} · ${pillars.month} · ${pillars.day} · ${pillars.hour}`,
    yearPillar: pillars.year,
    monthPillar: pillars.month,
    dayPillar: pillars.day,
    hourPillar: pillars.hour,
  };
}

function getCurrent(date = new Date()) {
  const hour = date.getHours();
  const index = hour === 23 ? 0 : Math.floor((hour + 1) / 2);
  let stateIndex = 3;
  if (hour >= 5 && hour < 9) stateIndex = 0;
  else if (hour >= 9 && hour < 13) stateIndex = 1;
  else if (hour >= 13 && hour < 17) stateIndex = 2;
  else if (hour >= 17 && hour < 21) stateIndex = 3;
  return { date, hour: hours[index], state: states[stateIndex] };
}

module.exports = { hours, tracks, tones, states, getCurrent, getCalendarMeta };
