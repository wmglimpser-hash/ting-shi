import React, { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";
import {
  designStates,
  tones,
  tracks,
  hours,
  getCalendarMeta,
} from "./listeningData";

const chapters = {
  growth: {
    title: "一声入耳，万象徐开",
    desc: "从一粒声音种子，生出今日的听觉旅程。",
    english: "THE ART OF BEGINNING",
    principle: "木意 · 生长与舒展",
    motion: ["声音种子", "向外扩散", "内容浮现"],
  },
  flow: {
    title: "顺势而行，声声相续",
    desc: "让音乐在时间里流动，越听越懂你。",
    english: "THE ART OF FLOWING",
    principle: "火意 · 传递与流动",
    motion: ["声音相接", "波形流动", "顺势而行"],
  },
  transform: {
    title: "万物和鸣，由你组合",
    desc: "选择此刻的状态，让音乐为你而生。",
    english: "THE ART OF BECOMING",
    principle: "土意 · 承载与化育",
    motion: ["选择模块", "重新组合", "生成新声"],
  },
  converge: {
    title: "归于一心，声入深处",
    desc: "减少干扰，让声音成为唯一的陪伴。",
    english: "THE ART OF FOCUSING",
    principle: "金意 · 秩序与收敛",
    motion: ["呼吸律动", "注意聚拢", "进入沉浸"],
  },
  archive: {
    title: "声有所归，记忆长存",
    desc: "每一次聆听，都成为生活的一部分。",
    english: "THE ART OF KEEPING",
    principle: "水意 · 蓄积与收藏",
    motion: ["留住此刻", "收纳存储", "形成记忆"],
  },
};

const momentSources = {
  角: {
    quote: "肝在音为角，在声为呼。",
    note: "木意向上，声音从幽微处展开。",
  },
  徵: {
    quote: "心在音为徵，在声为笑。",
    note: "火意相通，声音带着明亮的流动。",
  },
  宫: {
    quote: "脾在音为宫，在声为歌。",
    note: "土意承载，声音回到稳定的中心。",
  },
  商: {
    quote: "肺在音为商，在声为哭。",
    note: "金意清肃，声音留下边界与余韵。",
  },
  羽: {
    quote: "肾在音为羽，在声为呻。",
    note: "水意深藏，声音向内收拢。",
  },
};
const nav = [
  { id: "now", label: "此刻" },
  { id: "listen", label: "听" },
  { id: "source", label: "源" },
];
const timeText = (value) =>
  `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(Math.floor(value % 60)).padStart(2, "0")}`;

export function SiteHeader({ page, onNavigate, current, state }) {
  const calendar = getCalendarMeta(current?.now || new Date());
  return (
    <header className="site-header">
      <button
        className="brand"
        onClick={() => onNavigate("now")}
        aria-label="听时，返回此刻"
      >
        听时<span>在时间里，听见自己</span>
      </button>
      <nav className="desktop-nav" aria-label="主导航">
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            aria-current={page === item.id ? "page" : undefined}
            className={page === item.id ? "active" : ""}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="calendar-note" aria-label="当前日期与干支时间">
        <strong>{calendar.gregorian}</strong>
        <span>
          {calendar.weekday} · {calendar.lunar}
        </span>
        <small>
          {calendar.ganzhi}
          {state ? <em> · {state.name}</em> : null}
        </small>
      </div>
    </header>
  );
}

export function BottomNav({ page, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="移动端主导航">
      {nav.map((item) => (
        <button
          key={item.id}
          aria-current={page === item.id ? "page" : undefined}
          className={page === item.id ? "active" : ""}
          onClick={() => onNavigate(item.id)}
        >
          {item.label}
          <i />
        </button>
      ))}
    </nav>
  );
}

function MomentLyric({ current, state, selectedTone, selectedTrack }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const calendar = getCalendarMeta(current?.now || new Date());
  const currentTone =
    tones.find((item) => item.name === current.data.tone) || tones[0];
  const source = momentSources[current.data.tone] || momentSources.角;
  const chapter = chapters[state.id];
  const lines = useMemo(
    () => [
      {
        eyebrow: "此刻 · 时辰",
        title: `${current.data.name}时 · ${current.data.range}`,
        detail: `${current.data.mood} · ${calendar.hourPillar}`,
        marker: "TIME",
      },
      {
        eyebrow: "五行 · 五音",
        title: `${current.data.element} · ${current.data.tone}`,
        detail: `${currentTone.colorName} · ${currentTone.note} · ${current.data.meridian}`,
        marker: "MODE",
      },
      {
        eyebrow: "此刻理念",
        title: chapter.principle,
        detail: `${chapter.title} · ${chapter.desc}`,
        marker: state.name,
      },
      {
        eyebrow: "古籍片段",
        title: source.quote,
        detail: `${source.note} · 《黄帝内经 · 素问》`,
        marker: "SOURCE",
      },
      {
        eyebrow: "推荐聆听",
        title: selectedTrack.title,
        detail: `${selectedTrack.detail} · ${selectedTrack.sub}`,
        marker: "LISTEN",
      },
    ],
    [
      calendar.hourPillar,
      chapter.desc,
      chapter.principle,
      chapter.title,
      current.data,
      currentTone.colorName,
      currentTone.note,
      selectedTrack.detail,
      selectedTrack.sub,
      selectedTrack.title,
      source.note,
      source.quote,
      state.name,
    ],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [current.data.name, current.data.range, selectedTone, state.id]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % lines.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="desktop-moment-verse" aria-label="此刻信息导览">
      <div className="moment-verse-rail" aria-hidden="true">
        <span className="moment-verse-index">{state.index}</span>
        <span className="moment-verse-rail-line" />
      </div>
      <div className="moment-verse-stage">
        <div className="moment-verse-topline">
          <span>NOW / {calendar.gregorian}</span>
          <span>{calendar.ganzhi}</span>
        </div>
        <div className="moment-verse-lines" role="log" aria-live="polite">
          {lines.map((line, index) => (
            <button
              type="button"
              key={`${line.marker}-${line.title}`}
              className={`moment-verse-line ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-current={index === activeIndex ? "step" : undefined}
              aria-hidden={index === activeIndex ? undefined : true}
              tabIndex={index === activeIndex ? 0 : -1}
            >
              <span className="moment-verse-line-meta">
                {line.eyebrow}
              </span>
              <span className="moment-verse-line-copy">
                <strong>{line.title}</strong>
                <small>{line.detail}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="moment-verse-progress" aria-hidden="true">
          {lines.map((line, index) => (
            <i
              key={line.marker}
              className={index === activeIndex ? "active" : ""}
            />
          ))}
        </div>
      </div>
      <aside className="moment-verse-context">
        <span className="moment-verse-context-label">当前关系</span>
        <strong>{current.data.name}时</strong>
        <span>{current.data.element} · {current.data.tone}音</span>
        <small>{current.data.mood}</small>
        <span
          className="moment-verse-color"
          style={{ backgroundColor: currentTone.color }}
          aria-label={`${currentTone.colorName}色`}
        />
      </aside>
    </div>
  );
}

function RoundButton({ playing, onClick, large = false, label }) {
  return (
    <button
      className={"round-play " + (large ? "large" : "")}
      aria-label={label || (playing ? "暂停当前声音" : "播放当前声音")}
      onClick={onClick}
    >
      <Icon name={playing ? "pause" : "play"} size={large ? 25 : 17} />
    </button>
  );
}

function Cover({ variant = 0, square = false, src, playing = false }) {
  return (
    <span
      aria-hidden="true"
      className={`cover cover-${variant % 5} ${square ? "square" : ""} ${playing ? "playing" : ""}`}
    >
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      ) : null}
      <i />
      <b />
    </span>
  );
}

function Wave({ playing, bars = 65 }) {
  return (
    <div
      className={"sound-wave " + (playing ? "playing" : "")}
      aria-hidden="true"
    >
      {Array.from({ length: bars }, (_, i) => (
        <i
          key={i}
          style={{
            "--height": `${12 + Math.abs(Math.sin(i * 1.31) * Math.cos(i * 0.19)) * 88}%`,
            "--delay": `${(i % 9) * -0.17}s`,
          }}
        />
      ))}
    </div>
  );
}

function Progress({ track, progress, setProgress }) {
  return (
    <div className="playback-progress">
      <span>{timeText(progress)}</span>
      <input
        aria-label="播放进度"
        type="range"
        min="0"
        max={track.length}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        style={{ "--progress": `${(progress / track.length) * 100}%` }}
      />
      <span>{track.duration}</span>
    </div>
  );
}

function TonePicker({ selectedTone, onToneChange, compact = false }) {
  return (
    <div
      className={"five-tones " + (compact ? "compact" : "")}
      aria-label="五音五色"
    >
      {tones.map((tone) => (
        <button
          key={tone.name}
          aria-label={`${tone.name}音 · ${tone.element} · ${tone.colorName}`}
          aria-pressed={selectedTone === tone.name}
          className={selectedTone === tone.name ? "active" : ""}
          onClick={() => onToneChange(tone.name)}
          style={{ "--tone-color": tone.color }}
        >
          <i />
          <strong>{tone.name}</strong>
          <span>
            {tone.element} · {tone.colorName}
          </span>
        </button>
      ))}
    </div>
  );
}

function TrackRow({
  item,
  selectedTrack,
  isPlaying,
  onTrack,
  index,
  dark = false,
}) {
  const selected = item.id === selectedTrack.id;
  return (
    <button
      className={`listening-row ${dark ? "dark" : ""} ${selected ? "selected" : ""} ${selected && isPlaying ? "playing" : ""}`}
      onClick={() => onTrack(item)}
      aria-label={`${selected && isPlaying ? "暂停" : "播放"}${item.title}`}
    >
      <Cover variant={index} src={item.coverSrc} playing={selected && isPlaying} />
      <span className="row-copy">
        <strong>{item.title}</strong>
        <small>
          {item.hour} · {item.sub}
        </small>
      </span>
      <span className="row-duration">{item.duration}</span>
      <span className="row-action">
        <Icon name={selected && isPlaying ? "pause" : "play"} size={14} />
      </span>
    </button>
  );
}

function HourDial({ current }) {
  return (
    <div
      className="hour-dial"
      aria-label={`当前${current.data.name}时，${current.data.element}，${current.data.tone}音`}
    >
      <div className="dial-center">
        <span>{current.data.name}时</span>
        <small>
          {current.data.element} · {current.data.tone}
        </small>
      </div>
      {hours.map((hour, i) => (
        <span
          key={hour.name}
          className={"dial-hour " + (i === current.index ? "active" : "")}
          style={{ "--angle": `${i * 30}deg` }}
        >
          {hour.name}
        </span>
      ))}
      <i />
    </div>
  );
}

function Growth(props) {
  const {
    current,
    track,
    isPlaying,
    onPlay,
    onFocus,
    onNavigate,
    onPreview,
    onFavorite,
    savedTracks,
  } = props;
  const hour = current.now.getHours();
  const greeting =
    hour >= 5 && hour < 11
      ? "早上好"
      : hour >= 11 && hour < 18
        ? "午后好"
        : "夜安";
  return (
    <section className="scene growth-scene">
      <div className="scene-top">
        <span>
          听时<span className="scene-top-note">今日初声</span>
        </span>
        <button onClick={() => onNavigate("listen")} aria-label="探索音乐库">
          <Icon name="search" size={18} />
        </button>
      </div>
      <div className="growth-body">
        <div className="growth-welcome">
          <span className="overline">A MOMENT TO BEGIN</span>
          <h2>
            {greeting}，<br />
            从一段好声音
            <br />
            开始。
          </h2>
          <p>让声音，唤醒今日的自己。</p>
          <span className="small-rule" />
          <span className="current-meta">
            {current.data.name}时 / {current.data.range}
          </span>
        </div>
        <div className="seed-stage">
          <div
            className={"seed-rings " + (isPlaying ? "playing" : "")}
            aria-hidden="true"
          >
            {Array.from({ length: 8 }, (_, i) => (
              <i key={i} style={{ "--i": i }} />
            ))}
          </div>
          <button
            className="sound-seed"
            aria-label={isPlaying ? "暂停声音种子" : "点开声音种子"}
            onClick={onPlay}
          >
            <Icon name={isPlaying ? "pause" : "play"} size={20} />
          </button>
          <span className="seed-caption">
            {isPlaying ? "声音正在生长" : "点开一粒声音"}
            <small>
              {track.title} · {track.tone}音
            </small>
          </span>
        </div>
        <div className="growth-clock">
          <HourDial current={current} />
          <span className="vertical-poem">一声入耳 · 万象徐开</span>
        </div>
      </div>
      <div className="growth-bottom">
        {[
          {
            label: "今日推荐",
            sub: "从此刻出发",
            icon: "spark",
            action: () => onNavigate("listen"),
          },
          {
            label: "顺时唤醒",
            sub: "让声音流动",
            icon: "volume",
            action: () => onPreview("flow"),
          },
          {
            label: "身心平衡",
            sub: "回到一处",
            icon: "focus",
            action: onFocus,
          },
          {
            label: savedTracks.some((item) => item.id === track.id)
              ? "此刻已保存"
              : "留住此刻",
            sub: "收进声音记忆",
            icon: "bookmark",
            action: onFavorite,
          },
        ].map((item) => (
          <button key={item.label} onClick={item.action}>
            <span className="intent-icon">
              <Icon name={item.icon} size={18} />
            </span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.sub}</small>
            </span>
            <Icon name="arrow" size={16} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Flow(props) {
  const { track, isPlaying, onPlay, onFocus, onTrack, onNavigate } = props;
  const upcoming = [
    track,
    ...tracks.filter((item) => item.id !== track.id),
  ].slice(0, 4);
  return (
    <section className="scene flow-scene">
      <div className="river-pane">
        <div className="river-image" />
        <div className="scene-top">
          <span>
            听时<span className="scene-top-note">声音如流</span>
          </span>
          <button onClick={onFocus} aria-label="进入专注">
            <Icon name="focus" size={18} />
          </button>
        </div>
        <div className="river-copy">
          <span className="overline">LET THE SOUND FIND ITS WAY</span>
          <h2>继续聆听</h2>
          <p>流动的声音，陪伴此刻。</p>
        </div>
        <div className={`river-player ${isPlaying ? "playing" : ""}`}>
          <Cover variant={track.id} src={track.coverSrc} playing={isPlaying} />
          <span>
            <strong>{track.title}</strong>
            <small>
              {track.sub} · {track.tone}音
            </small>
          </span>
          <RoundButton playing={isPlaying} onClick={onPlay} />
        </div>
        <div className="river-wave">
          <Wave playing={isPlaying} bars={90} />
        </div>
        <span className="river-caption">
          声声相续，自成一程。<small>CONTINUOUS LISTENING / 02</small>
        </span>
      </div>
      <div className="flow-queue">
        <div className="queue-heading">
          <span className="overline">YOUR SOUND JOURNEY</span>
          <h3>
            顺着声音，
            <br />
            慢慢走。
          </h3>
          <p>此刻之后，还有一段好声音。</p>
        </div>
        {upcoming.map((item, i) => (
          <TrackRow
            key={item.id}
            item={item}
            selectedTrack={track}
            isPlaying={isPlaying}
            onTrack={onTrack}
            index={i}
          />
        ))}
        <button className="text-link" onClick={() => onNavigate("listen")}>
          探索全部声音
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </section>
  );
}

const intentions = [
  { name: "专注", sub: "沉浸当下", art: "focus", tone: "商" },
  { name: "工作", sub: "保持节奏", art: "work", tone: "角" },
  { name: "阅读", sub: "进入心流", art: "read", tone: "宫" },
  { name: "放松", sub: "舒缓身心", art: "rest", tone: "羽" },
];

function Transform(props) {
  const { selectedTone, onToneChange, onTrack, onNavigate, isPlaying, track } =
    props;
  const [intent, setIntent] = useState("专注");
  const [category, setCategory] = useState("场景");
  const [selection, setSelection] = useState("专注");
  const candidates = tracks.filter((item) => item.tone === selectedTone);
  const result = candidates.length
    ? candidates[
        intentions.findIndex((item) => item.name === intent) % candidates.length
      ] || candidates[0]
    : track;
  const choices =
    category === "场景"
      ? intentions
      : category === "情绪"
        ? ["平静", "明朗", "舒展", "安宁"].map((name, i) => ({
            ...intentions[i],
            name,
          }))
        : category === "时段"
          ? ["晨间", "日中", "午后", "夜晚"].map((name, i) => ({
              ...intentions[i],
              name,
            }))
          : tones.map((tone, i) => ({
              name: tone.name + "音",
              sub: tone.element + " · " + tone.colorName,
              art: intentions[i % 4].art,
              tone: tone.name,
            }));
  return (
    <section className="scene transform-scene">
      <div className="scene-top">
        <span>
          听时<span className="scene-top-note">此刻，由你组合</span>
        </span>
        <button onClick={() => onNavigate("listen")} aria-label="打开声音索引">
          <Icon name="search" size={18} />
        </button>
      </div>
      <div className="transform-body">
        <div className="selection-pane">
          <div className="category-tabs" aria-label="组合维度">
            {["场景", "五音", "情绪", "时段"].map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="intention-grid" key={category}>
            {choices.map((item, i) => (
              <button
                key={item.name}
                className={`intention-card intention-${item.art} ${selection === item.name ? "active" : ""}`}
                aria-pressed={selection === item.name}
                onClick={() => {
                  setIntent(intentions[i % 4].name);
                  setSelection(item.name);
                  onToneChange(item.tone);
                }}
              >
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.sub}</small>
                </span>
                <i className="selection-tick">
                  {selection === item.name ? "✓" : "+"}
                </i>
              </button>
            ))}
          </div>
        </div>
        <div className="combination-pane">
          <span className="overline">A SOUND OF YOUR OWN</span>
          <h2>
            万物和鸣，
            <br />
            由你组合。
          </h2>
          <p>为此刻的自己，调一段合适的声音。</p>
          <div className="combination-tags">
            <span>{selection}</span>
            <b>＋</b>
            <span>{selectedTone}音</span>
            <b>＝</b>
            <span>此刻</span>
          </div>
          <div
            className={`generated-track ${
              isPlaying && track.id === result.id ? "playing" : ""
            }`}
            key={result.id + selection}
          >
            <span className="overline">为你组合的声音</span>
            <div>
              <Cover
                variant={result.id}
                src={result.coverSrc}
                playing={isPlaying && track.id === result.id}
                square
              />
              <span>
                <strong>{result.title}</strong>
                <small>
                  {selection} · {selectedTone}音 · {result.hour}
                </small>
              </span>
              <RoundButton
                playing={isPlaying && track.id === result.id}
                onClick={() => onTrack(result)}
                label={`试听组合：${result.title}`}
              />
            </div>
            <Wave playing={isPlaying && track.id === result.id} bars={42} />
          </div>
          <TonePicker
            selectedTone={selectedTone}
            onToneChange={onToneChange}
            compact
          />
        </div>
      </div>
    </section>
  );
}

function FocusOrb() {
  return (
    <div className="focus-orbit" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <svg viewBox="0 0 240 240">
        <defs>
          <radialGradient id="stone-light" cx="32%" cy="25%" r="75%">
            <stop offset="0" stopColor="#aaa08e" />
            <stop offset=".4" stopColor="#615b51" />
            <stop offset=".78" stopColor="#292a25" />
            <stop offset="1" stopColor="#0d100e" />
          </radialGradient>
          <filter id="stone-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".28"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feColorMatrix in="noise" type="saturate" values="0" />
            <feComposite in2="SourceGraphic" operator="in" />
            <feBlend in2="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
        <circle
          cx="120"
          cy="120"
          r="108"
          fill="url(#stone-light)"
          filter="url(#stone-grain)"
        />
      </svg>
      <span className="orbit-top" />
      <span className="orbit-bottom" />
    </div>
  );
}

function Converge(props) {
  const {
    track,
    isPlaying,
    onPlay,
    onSkip,
    onFavorite,
    savedTracks,
    progress,
    setProgress,
  } = props;
  const [breathing, setBreathing] = useState(true);
  const saved = savedTracks.some((item) => item.id === track.id);
  return (
    <section
      className={"scene converge-scene " + (breathing ? "breathing" : "")}
    >
      <div className="scene-top">
        <span>
          听时<span className="scene-top-note">专注于此刻</span>
        </span>
        <button
          className="breath-toggle"
          onClick={() => setBreathing((value) => !value)}
          aria-pressed={breathing}
        >
          <span className="tiny-dot" />
          呼吸动效 {breathing ? "开" : "关"}
        </button>
      </div>
      <div className="focus-body">
        <div className="orb-space">
          <span className="orb-annotation">INHALE · EXHALE</span>
          <FocusOrb />
          <span className="orb-caption">声音之外，一切都慢下来。</span>
        </div>
        <div className="focus-content">
          <span className="overline">BE HERE. BE STILL.</span>
          <h2>心之所向</h2>
          <p>让此刻，更专注。</p>
          <span className="focus-track">
            {track.title}
            <small>
              {track.sub} / {track.tone}音
            </small>
          </span>
          <div className="focus-controls">
            <button aria-label="上一首" onClick={() => onSkip(-1)}>
              <span className="previous-icon">▸</span>
            </button>
            <RoundButton large playing={isPlaying} onClick={onPlay} />
            <button aria-label="下一首" onClick={() => onSkip(1)}>
              ▸
            </button>
          </div>
          <Progress
            track={track}
            progress={progress}
            setProgress={setProgress}
          />
          <button
            className={"focus-save " + (saved ? "saved" : "")}
            onClick={onFavorite}
            aria-pressed={saved}
          >
            <Icon name="heart" size={18} />
            {saved ? "已留住此刻" : "留住此刻"}
          </button>
        </div>
      </div>
      <div className="focus-foot">
        <span>一呼，一吸，一段声音。</span>
        <span>FOCUS / 04</span>
      </div>
    </section>
  );
}

function Archive(props) {
  const { savedTracks, track, onTrack, isPlaying, onPlay, onFavorite } = props;
  const [filter, setFilter] = useState("全部");
  const sampleTracks = tracks.slice(8, 12);
  const allItems = savedTracks.length ? savedTracks : sampleTracks;
  const items =
    filter === "已收藏"
      ? savedTracks
      : filter === "夜间"
        ? allItems.filter((item) =>
            ["子时", "丑时", "戌时", "亥时"].includes(item.hour),
          )
        : allItems;
  return (
    <section className="scene archive-scene">
      <div className="archive-background" />
      <div className="scene-top">
        <span>
          听时<span className="scene-top-note">声音有归处</span>
        </span>
        <span className="archive-count">
          {String(savedTracks.length).padStart(2, "0")} 段个人收藏
        </span>
      </div>
      <div className="archive-body">
        <div className="archive-intro">
          <span className="overline">YOUR PERSONAL SOUND ARCHIVE</span>
          <h2>我的声音收藏</h2>
          <p>
            时光会流转，
            <br />
            你听过的每一段声音，都有回响。
          </p>
          <div className="memory-stack" aria-hidden="true">
            <div />
            <div />
            <div>
              <Cover
                square
                variant={track.id}
                src={track.coverSrc}
                playing={isPlaying}
              />
              <span>
                听时<small>声有所归 / 05</small>
              </span>
            </div>
          </div>
          <button className="archive-add" onClick={onFavorite}>
            <Icon name="bookmark" size={16} />
            {savedTracks.some((item) => item.id === track.id)
              ? "此刻已入藏"
              : "将此刻收入收藏"}
            <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="archive-records">
          <div className="archive-filters">
            {["全部", "已收藏", "夜间"].map((item) => (
              <button
                key={item}
                className={item === filter ? "active" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={item === filter}
              >
                {item}
              </button>
            ))}
            <span>
              {savedTracks.length || filter === "已收藏"
                ? "个人声音档案"
                : "精选收藏示例"}
            </span>
          </div>
          <div className="archive-rows" key={filter}>
            {items.length ? (
              items
                .slice(0, 5)
                .map((item, i) => (
                  <TrackRow
                    key={item.id}
                    item={item}
                    selectedTrack={track}
                    onTrack={onTrack}
                    isPlaying={isPlaying}
                    index={i + 2}
                    dark
                  />
                ))
            ) : (
              <div className="archive-empty">
                <Icon name="bookmark" size={28} />
                <h3>这里，等一段值得留下的声音。</h3>
                <button onClick={onFavorite}>
                  收藏当前声音 <Icon name="arrow" size={16} />
                </button>
              </div>
            )}
          </div>
          <div className={`archive-mini-player ${isPlaying ? "playing" : ""}`}>
            <Cover
              variant={track.id}
              src={track.coverSrc}
              playing={isPlaying}
              square
            />
            <span>
              <strong>{track.title}</strong>
              <small>
                {isPlaying ? "正在聆听" : "上次停留的声音"} · {track.tone}音
              </small>
            </span>
            <RoundButton playing={isPlaying} onClick={onPlay} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function NowPage(props) {
  const {
    state,
    baseState,
    current,
    selectedTrack,
    selectedTone,
    onToneChange,
    previewState,
    eventLabel,
    onPreview,
    onReset,
  } = props;
  const chapter = chapters[state.id];
  const tone = tones.find((item) => item.name === selectedTone) || tones[0];
  const Scene = {
    growth: Growth,
    flow: Flow,
    transform: Transform,
    converge: Converge,
    archive: Archive,
  }[state.id];
  return (
    <main
      className={`now-page chapter-${state.id}`}
      style={{
        "--accent": tone.color,
        "--tone-hue": {
          wood: "0deg",
          fire: "-65deg",
          earth: "-32deg",
          metal: "0deg",
          water: "38deg",
        }[tone.theme],
        "--tone-saturation": tone.theme === "metal" ? ".3" : ".85",
      }}
    >
      <header className="chapter-heading">
        <MomentLyric
          current={current}
          state={state}
          selectedTone={selectedTone}
          selectedTrack={selectedTrack}
        />
        <div className="chapter-title">
          <span className="chapter-number">{state.index}</span>
          <h1>{state.name}</h1>
        </div>
        <div className="chapter-caption">
          <h2>{chapter.title}</h2>
          <p>{chapter.desc}</p>
        </div>
        <div className="chapter-context">
          <span>{state.range}</span>
          <small>
            {previewState ? "正在预览" : eventLabel ? "因你而变" : "此刻时态"}
            <b>
              {previewState
                ? state.name
                : eventLabel || current.data.name + "时"}
            </b>
          </small>
          <select
            className="state-select"
            aria-label="切换首页形态"
            value={previewState || ""}
            onChange={(event) =>
              event.target.value
                ? onPreview(event.target.value)
                : onReset()
            }
          >
            <option value="">随时间 · {baseState?.name || "此刻"}</option>
            {designStates.map((item) => (
              <option key={item.id} value={item.id}>
                预览 · {item.name}
              </option>
            ))}
          </select>
        </div>
      </header>
      <div className="scene-transition" key={state.id}>
        <Scene {...props} track={selectedTrack} />
      </div>
      {state.id !== "transform" && (
        <div className="tone-dock">
          <span className="tone-current">
            <i style={{ backgroundColor: tone.color }} />
            <strong>{tone.name}音</strong>
            <small>
              {tone.element} · {tone.colorName}
            </small>
          </span>
          <details className="tone-menu">
            <summary>调一段此刻</summary>
            <TonePicker
              selectedTone={selectedTone}
              onToneChange={onToneChange}
              compact
            />
          </details>
        </div>
      )}
      <footer className="editorial-footer">
        <span>听时 — 让时间，成为音乐的一部分。</span>
      </footer>
    </main>
  );
}
