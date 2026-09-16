import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  hours,
  tracks,
  tones,
  sourceTexts,
  designStates,
  getCurrentHour,
  getTimeState,
} from "./listeningData";
import Icon from "./Icon";
import NowPage, { SiteHeader, BottomNav } from "./HomeExperience";

function ToneTabs({ selectedTone, onToneChange }) {
  return (
    <div className="tone-tabs" role="tablist" aria-label="按五音浏览">
      <button
        type="button"
        role="tab"
        aria-selected={selectedTone === "全部"}
        className={selectedTone === "全部" ? "active" : ""}
        onClick={() => onToneChange("全部")}
      >
        全部
      </button>
      {tones.map((tone) => (
        <button
          key={tone.name}
          type="button"
          role="tab"
          aria-selected={selectedTone === tone.name}
          className={selectedTone === tone.name ? "active" : ""}
          onClick={() => onToneChange(tone.name)}
        >
          <strong>{tone.name}</strong>
          <small>
            <i
              className="tone-swatch"
              style={{ backgroundColor: tone.color }}
            />
            {tone.colorName} / {tone.pinyin}
          </small>
        </button>
      ))}
    </div>
  );
}

function ListenPage({
  selectedTone,
  onToneChange,
  selectedTrack,
  onTrack,
  isPlaying,
  audioError,
  onNavigate,
}) {
  const visibleTracks = useMemo(
    () =>
      selectedTone === "全部"
        ? tracks
        : tracks.filter((track) => track.tone === selectedTone),
    [selectedTone],
  );
  const activeTone = tones.find((tone) => tone.name === selectedTone);
  const toneClass =
    selectedTone === "全部"
      ? "tone-theme-all"
      : "tone-theme-" + activeTone.theme;
  const handleCardPointerMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--pointer-x", `${x}%`);
    card.style.setProperty("--pointer-y", `${y}%`);
  };
  const resetCardPointer = (event) => {
    event.currentTarget.style.removeProperty("--pointer-x");
    event.currentTarget.style.removeProperty("--pointer-y");
  };
  return (
    <main className={"listen-page page-shell paper-page " + toneClass}>
      <div className="page-heading" data-reveal>
        <div>
          <span className="eyebrow">02 / 声音索引</span>
          <h1>听</h1>
        </div>
        <p>
          五音不是分类标签，
          <br />
          是十二个时刻的不同气息。
        </p>
      </div>
      <ToneTabs selectedTone={selectedTone} onToneChange={onToneChange} />
      <section className="tone-story" data-reveal>
        <div className="tone-story-orb">
          <span>{selectedTone === "全部" ? "五音" : selectedTone}</span>
          <i />
        </div>
        <div>
          <span className="eyebrow">
            {selectedTone === "全部"
              ? "TWELVE MOMENTS"
              : "THE " + selectedTone + " MODE"}
          </span>
          <h2>
            {selectedTone === "全部"
              ? "从此刻出发，听见一天的起伏。"
              : activeTone.element + " · " + activeTone.note}
          </h2>
          <p>
            {selectedTone === "全部"
              ? "每个时辰有一首主题声音。它们共享一套五声音阶，也各自保留属于天色、风与地形的细微不同。"
              : "以" +
                selectedTone +
                "音为中心的五声音阶，不追求西式终止感，只让旋律在" +
                activeTone.note.split(" · ")[0] +
                "之间往返。"}
          </p>
          <div className="tone-color-note">
            <i
              style={{
                backgroundColor:
                  selectedTone === "全部" ? "#789087" : activeTone.color,
              }}
            />
            <span>
              五色 ·{" "}
              {selectedTone === "全部" ? "随音流转" : activeTone.colorName}
            </span>
          </div>
        </div>
      </section>
      <section className="track-library" data-reveal>
        <div className="library-title">
          <span>时辰曲目</span>
          <span>{visibleTracks.length.toString().padStart(2, "0")} 首声音</span>
        </div>
        {visibleTracks.map((track, index) => (
          <button
            className={
              "track-card " +
              (selectedTrack.id === track.id ? "selected " : "") +
              (selectedTrack.id === track.id && isPlaying ? "playing" : "")
            }
            key={track.id}
            onClick={() => onTrack(track)}
            onPointerMove={handleCardPointerMove}
            onPointerLeave={resetCardPointer}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(index, 8) * 55}ms` }}
          >
            <span className="track-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`track-art ${
                selectedTrack.id === track.id && isPlaying ? "playing" : ""
              }`}
            >
              {track.coverSrc ? (
                <img
                  src={track.coverSrc}
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
            <span className="track-info">
              <strong>{track.title}</strong>
              <small>
                {track.hour} · {track.sub}
              </small>
            </span>
            <span className="track-tone">{track.tone}</span>
            <span className="track-duration">{track.duration}</span>
            <span className="track-action">
              {selectedTrack.id === track.id && isPlaying ? (
                <Icon name="pause" size={16} />
              ) : (
                <Icon name="play" size={16} />
              )}
            </span>
          </button>
        ))}
      </section>
      <div className="listen-footer">
        <span>
          <Icon name="volume" size={16} />
          {audioError || "正式音频 · 十二时辰曲库"}
        </span>
        <button onClick={() => onNavigate("source")}>
          了解五音关系 <Icon name="arrow" size={15} />
        </button>
      </div>
    </main>
  );
}

function SourceTextCard({ item, open, onToggle, style }) {
  const panelId = `source-text-panel-${item.id}`;
  return (
    <article
      className={`source-text-card ${open ? "is-open" : ""}`}
      style={style}
    >
      <button
        className="source-text-trigger"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="source-text-index">{item.index}</span>
        <span className="source-text-heading">
          <small>{item.concept}</small>
          <strong>{item.title}</strong>
        </span>
        <span className="source-text-source">{item.source}</span>
        <span className="source-text-toggle" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div className="source-text-body" id={panelId}>
          <div className="source-text-quote">
            {item.quoteLines ? (
              item.quoteLines.map((line) => <p key={line}>{line}</p>)
            ) : (
              <p>{item.quote}</p>
            )}
          </div>
          <div className="source-text-foot">
            <p>{item.note}</p>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="source-text-link"
            >
              查看原典 <Icon name="arrow" size={14} />
            </a>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function SourcePage({ onNavigate }) {
  const [openSource, setOpenSource] = useState(sourceTexts[0].id);
  const [sourceFilter, setSourceFilter] = useState("全部");
  const sourceFilters = [
    "全部",
    ...Array.from(new Set(sourceTexts.map((item) => item.concept))),
  ];
  const visibleSourceTexts =
    sourceFilter === "全部"
      ? sourceTexts
      : sourceTexts.filter((item) => item.concept === sourceFilter);

  useEffect(() => {
    if (!visibleSourceTexts.some((item) => item.id === openSource)) {
      setOpenSource(visibleSourceTexts[0]?.id || null);
    }
  }, [openSource, visibleSourceTexts]);

  return (
    <main className="source-page page-shell paper-page">
      <div className="page-heading source-heading">
        <div>
          <span className="eyebrow">03 / 关系与出处</span>
          <h1>源</h1>
        </div>
        <p>
          只呈现古人如何理解。
          <br />
          不替你判断，也不替你解释。
        </p>
      </div>
      <section className="source-hero" data-reveal>
        <div className="source-seal">
          <span>时</span>
          <small>听时</small>
        </div>
        <div className="source-hero-copy">
          <span className="eyebrow">一条关系，从子时开始</span>
          <h2>时间 → 经脉 → 五行 → 五音</h2>
          <p>
            同一个时辰，可以从不同的传统系统观察。听时选择“经脉视角”作为当前声音入口，同时把其他关系并列呈现，让知识的来源和推演路径保持可见。
          </p>
        </div>
      </section>
      <section className="relation-card" data-reveal>
        <div className="relation-top">
          <span>关系图 · 静态阅读</span>
          <span>四层概念</span>
        </div>
        <div className="relation-chain">
          <div>
            <span className="chain-index">01</span>
            <strong>十二时辰</strong>
            <small>时间秩序</small>
          </div>
          <span className="chain-arrow">→</span>
          <div>
            <span className="chain-index">02</span>
            <strong>经脉</strong>
            <small>子午流注 · 行气</small>
          </div>
          <span className="chain-arrow">→</span>
          <div>
            <span className="chain-index">03</span>
            <strong>五行</strong>
            <small>相生相应 · 属性</small>
          </div>
          <span className="chain-arrow">→</span>
          <div className="relation-last">
            <span className="chain-index">04</span>
            <strong>五音</strong>
            <small>宫商角徵羽 · 声音</small>
          </div>
        </div>
      </section>
      <section
        className="source-library"
        aria-labelledby="source-library-title"
        data-reveal
      >
        <div className="source-library-heading">
          <div>
            <span className="eyebrow">原文 · 静置文库</span>
            <h2 id="source-library-title">古籍原文</h2>
            <p>
              这一组文字不随当前时辰变化，按需展开。先读原文，再决定它与你的此刻如何相遇。
            </p>
          </div>
          <span className="source-library-count">
            {String(visibleSourceTexts.length).padStart(2, "0")} TEXTS
          </span>
        </div>
        <div className="source-filters" aria-label="古籍主题筛选">
          {sourceFilters.map((filter) => (
            <button
              key={filter}
              className={sourceFilter === filter ? "active" : ""}
              aria-pressed={sourceFilter === filter}
              onClick={() => setSourceFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="source-text-grid">
          {visibleSourceTexts.map((item, index) => (
            <SourceTextCard
              key={item.id}
              item={item}
              open={openSource === item.id}
              style={{ "--reveal-delay": `${index * 65}ms` }}
              onToggle={() =>
                setOpenSource((currentId) =>
                  currentId === item.id ? null : item.id,
                )
              }
            />
          ))}
        </div>
      </section>
      <section className="source-reading" data-reveal>
        <div className="reading-label">
          <span>短读</span>
          <span>READING 01</span>
        </div>
        <div className="reading-copy">
          <h2>子时与胆，为什么在这里相遇？</h2>
          <p>
            在纳子法的时辰体系中，子时所对应的是足少阳胆经。胆与肝相表里，在五行关系中同属木；木与角音相应，于是听时把这一条关系作为子时的声音入口。
          </p>
          <blockquote>
            “肝在音为角……在声为呼。”<cite>——《黄帝内经 · 素问》</cite>
          </blockquote>
          <small className="reading-note">
            以上为传统文献关系的简要整理；不同典籍、不同推演体系之间或有差异。
          </small>
        </div>
      </section>
      <button className="back-to-listen" onClick={() => onNavigate("listen")}>
        <span>回到声音索引</span>
        <Icon name="arrow" size={17} />
      </button>
    </main>
  );
}

function PlayerWave({ playing, progressPercent = 0 }) {
  const barCount = 34;
  return (
    <div className={"global-player-wave " + (playing ? "playing" : "")} aria-hidden="true">
      <span className="global-player-wave-baseline" />
      {Array.from({ length: barCount }, (_, index) => (
        <i
          key={index}
          className={index / Math.max(1, barCount - 1) * 100 <= progressPercent ? "is-past" : ""}
          style={{
            "--bar-height": `${24 + (0.24 + Math.sin((index + 1) / barCount * Math.PI) * 0.54 + Math.abs(Math.sin(index * 1.19)) * 0.22) * 62}%`,
            "--bar-opacity": `${0.5 + Math.abs(Math.sin(index * 0.72)) * 0.5}`,
            "--bar-delay": `${(index % 8) * -0.13}s`,
            "--bar-index": index,
          }}
        />
      ))}
      <span
        className="global-player-wave-playhead"
        style={{ left: `${Math.min(100, Math.max(0, progressPercent))}%` }}
      />
    </div>
  );
}

const loopLabels = {
  none: "顺序播放",
  all: "列表循环",
  one: "单曲循环",
};

function formatPlayerCountdown(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const remainingSeconds = safeSeconds % 60;
  return [hours, minutes, remainingSeconds]
    .map((value, index) =>
      index === 0 && hours === 0
        ? null
        : String(value).padStart(2, "0"),
    )
    .filter(Boolean)
    .join(":");
}

function PlaylistPanel({ playlistTracks, selectedTrack, isPlaying, onTrack, onClose }) {
  return (
    <div className="global-player-drawer global-player-playlist" aria-label="播放列表">
      <div className="player-drawer-head">
        <div>
          <span>QUEUE / LISTENING ORDER</span>
          <strong>播放列表</strong>
        </div>
        <button type="button" aria-label="关闭播放列表" onClick={onClose}>
          <Icon name="close" size={16} />
        </button>
      </div>
      <div className="playlist-summary">
        <strong>{String(playlistTracks.length).padStart(2, "0")}</strong>
        <span>首声音 · 点击任意一首开始聆听</span>
      </div>
      <div className="playlist-list">
        {playlistTracks.map((item, index) => {
          const selected = selectedTrack.id === item.id;
          return (
            <button
              type="button"
              className={`playlist-item ${selected ? "selected" : ""}`}
              key={item.id}
              onClick={() => onTrack(item)}
              aria-label={`${isPlaying && selected ? "暂停" : "播放"}${item.title}`}
            >
              <span className="playlist-item-number">
                {selected && isPlaying ? "●" : String(index + 1).padStart(2, "0")}
              </span>
              <span className="playlist-item-copy">
                <strong>{item.title}</strong>
                <small>{item.hour} · {item.tone}音 · {item.duration}</small>
              </span>
              <span className="playlist-item-action" aria-hidden="true">
                <Icon name={selected && isPlaying ? "pause" : "play"} size={13} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlayerSettings({
  loopMode,
  onToggleLoop,
  sleepTimerMinutes,
  sleepTimerRemaining,
  onSetTimer,
  onClose,
}) {
  const timerOptions = [0, 15, 30, 60];
  return (
    <div className="global-player-drawer global-player-settings" aria-label="定时与循环设置">
      <div className="player-drawer-head">
        <div>
          <span>PLAYER SETTINGS</span>
          <strong>聆听方式</strong>
        </div>
        <button type="button" aria-label="关闭播放器设置" onClick={onClose}>
          <Icon name="close" size={16} />
        </button>
      </div>
      <div className="player-setting-group">
        <div className="player-setting-label">
          <Icon name="clock" size={16} />
          <div>
            <strong>定时停止</strong>
            <small>
              {sleepTimerRemaining
                ? `${formatPlayerCountdown(sleepTimerRemaining)} 后停止播放`
                : "让声音在一段时间后安静下来"}
            </small>
          </div>
        </div>
        <div className="timer-options" role="group" aria-label="定时停止时长">
          {timerOptions.map((minutes) => (
            <button
              type="button"
              className={sleepTimerMinutes === minutes ? "active" : ""}
              key={minutes}
              aria-pressed={sleepTimerMinutes === minutes}
              onClick={() => onSetTimer(minutes)}
            >
              {minutes === 0 ? "关闭" : `${minutes} 分`}
            </button>
          ))}
        </div>
      </div>
      <div className="player-setting-group player-loop-setting">
        <div className="player-setting-label">
          <Icon name="repeat" size={16} />
          <div>
            <strong>循环方式</strong>
            <small>歌曲结束后的下一步</small>
          </div>
        </div>
        <button
          type="button"
          className="loop-toggle"
          aria-pressed={loopMode !== "none"}
          onClick={onToggleLoop}
        >
          <Icon name="repeat" size={14} />
          {loopLabels[loopMode]}
        </button>
      </div>
    </div>
  );
}

function GlobalPlayer({
  track,
  isPlaying,
  progress,
  onPlay,
  onSeek,
  onSkip,
  audioReactive,
  playlistTracks,
  playerPanel,
  onPanelChange,
  onTrack,
  loopMode,
  onToggleLoop,
  sleepTimerMinutes,
  sleepTimerRemaining,
  onSetTimer,
}) {
  const [dragOffset, setDragOffset] = useState(() => {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem("tingshi-player-position") || "{}",
      );
      return {
        x: Number.isFinite(saved.x) ? saved.x : 0,
        y: Number.isFinite(saved.y) ? saved.y : 0,
      };
    } catch {
      return { x: 0, y: 0 };
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const elapsed = `${String(Math.floor(progress / 60)).padStart(2, "0")}:${String(
    Math.floor(progress % 60),
  ).padStart(2, "0")}`;
  const progressPercent = track.length
    ? Math.min(100, Math.max(0, (progress / track.length) * 100))
    : 0;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const target = event.target;
    if (
      target instanceof Element &&
      target.closest("button, input, a, .global-player-drawer")
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseLeft: rect.left - dragOffset.x,
      baseTop: rect.top - dragOffset.y,
      originX: dragOffset.x,
      originY: dragOffset.y,
      next: dragOffset,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
  };
  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const desiredX = drag.originX + event.clientX - drag.startX;
    const desiredY = drag.originY + event.clientY - drag.startY;
    const next = {
      x: clamp(
        desiredX,
        12 - drag.baseLeft,
        window.innerWidth - 12 - rect.width - drag.baseLeft,
      ),
      y: clamp(
        desiredY,
        12 - drag.baseTop,
        window.innerHeight - 12 - rect.height - drag.baseTop,
      ),
    };
    drag.next = next;
    event.currentTarget.style.setProperty("--player-drag-x", `${next.x}px`);
    event.currentTarget.style.setProperty("--player-drag-y", `${next.y}px`);
  };
  const finishDrag = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const next = drag.next || dragOffset;
    setDragOffset(next);
    try {
      window.localStorage.setItem("tingshi-player-position", JSON.stringify(next));
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
    dragRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const togglePanel = (panel) => {
    onPanelChange(playerPanel === panel ? null : panel);
  };

  return (
    <aside
      className={`global-player ${isPlaying ? "is-playing" : "is-paused"} ${audioReactive ? "audio-reactive" : ""} ${isDragging ? "is-dragging" : ""}`}
      aria-label="独立播放器"
      aria-live="polite"
      style={{
        "--player-drag-x": `${dragOffset.x}px`,
        "--player-drag-y": `${dragOffset.y}px`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      <div className="global-player-art">
        <span className="global-player-art-sheen" aria-hidden="true" />
        {track.coverSrc ? (
          <img src={track.coverSrc} alt={`${track.title}封面`} loading="eager" />
        ) : null}
      </div>
      <div className="global-player-copy">
        <div className="global-player-kicker">
          <span>
            <i className="player-status-dot" aria-hidden="true" />
            {isPlaying ? "正在聆听" : "已暂停"}
          </span>
          <span>{track.hour} · {track.tone}音</span>
        </div>
        <strong>{track.title}</strong>
        <small>{track.sub} · {track.detail}</small>
        <PlayerWave playing={isPlaying} progressPercent={progressPercent} />
        <div className="global-player-progress">
          <span>{elapsed}</span>
          <input
            aria-label="独立播放器进度"
            type="range"
            min="0"
            max={track.length}
            value={progress}
            onChange={(event) => onSeek(Number(event.target.value))}
            style={{ "--player-progress": `${progressPercent}%` }}
          />
          <span>{track.duration}</span>
        </div>
      </div>
      <div className="global-player-controls">
        <button aria-label="上一首" onClick={() => onSkip(-1)}>
          ‹
        </button>
        <button
          className="global-player-play"
          aria-label={isPlaying ? "暂停当前声音" : "播放当前声音"}
          onClick={onPlay}
        >
          <Icon name={isPlaying ? "pause" : "play"} size={18} />
        </button>
        <button aria-label="下一首" onClick={() => onSkip(1)}>
          ›
        </button>
        <button
          type="button"
          className={`global-player-tool ${playerPanel === "playlist" ? "active" : ""}`}
          aria-label="打开播放列表"
          aria-pressed={playerPanel === "playlist"}
          onClick={() => togglePanel("playlist")}
        >
          <Icon name="layers" size={15} />
        </button>
        <button
          type="button"
          className={`global-player-tool ${playerPanel === "settings" ? "active" : ""}`}
          aria-label="打开定时与循环设置"
          aria-pressed={playerPanel === "settings"}
          onClick={() => togglePanel("settings")}
        >
          <Icon name="clock" size={15} />
        </button>
      </div>
      {playerPanel === "playlist" ? (
        <PlaylistPanel
          playlistTracks={playlistTracks}
          selectedTrack={track}
          isPlaying={isPlaying}
          onTrack={onTrack}
          onClose={() => onPanelChange(null)}
        />
      ) : null}
      {playerPanel === "settings" ? (
        <PlayerSettings
          loopMode={loopMode}
          onToggleLoop={onToggleLoop}
          sleepTimerMinutes={sleepTimerMinutes}
          sleepTimerRemaining={sleepTimerRemaining}
          onSetTimer={onSetTimer}
          onClose={() => onPanelChange(null)}
        />
      ) : null}
    </aside>
  );
}

function App() {
  const [page, setPage] = useState("now");
  const [current, setCurrent] = useState(getCurrentHour);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTone, setSelectedTone] = useState("全部");
  const [selectedTrack, setSelectedTrack] = useState(
    () => tracks[getCurrentHour().index],
  );
  const [playlistTracks] = useState(() => tracks);
  const [playerPanel, setPlayerPanel] = useState(null);
  const [loopMode, setLoopMode] = useState("all");
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState(0);
  const [sleepTimerEndsAt, setSleepTimerEndsAt] = useState(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(tracks[0].length);
  const [audioError, setAudioError] = useState("");
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [previewState, setPreviewState] = useState(null);
  const [eventState, setEventState] = useState(null);
  const [eventLabel, setEventLabel] = useState("");
  const [savedTracks, setSavedTracks] = useState(() => {
    try {
      const ids = JSON.parse(localStorage.getItem("tingshi-saved") || "[]");
      return tracks.filter((track) => ids.includes(track.id));
    } catch {
      return [];
    }
  });
  const eventTimer = useRef(null);
  const audioRef = useRef(null);
  const triggerEventRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(
        "tingshi-saved",
        JSON.stringify(savedTracks.map((track) => track.id)),
      );
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
  }, [savedTracks]);

  const baseState = getTimeState(current.now);
  const activeState =
    designStates.find((item) => item.id === (previewState ?? eventState)) ||
    baseState;

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent(getCurrentHour()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const closePanels = (event) => {
      if (event.key === "Escape") setPlayerPanel(null);
    };
    window.addEventListener("keydown", closePanels);
    return () => window.removeEventListener("keydown", closePanels);
  }, []);

  useEffect(() => {
    if (!sleepTimerEndsAt) {
      setSleepTimerRemaining(0);
      return undefined;
    }
    const updateRemaining = () => {
      const remaining = Math.max(
        0,
        Math.ceil((sleepTimerEndsAt - Date.now()) / 1000),
      );
      setSleepTimerRemaining(remaining);
      if (remaining === 0) {
        setIsPlaying(false);
        setSleepTimerEndsAt(null);
        setSleepTimerMinutes(0);
        triggerEventRef.current?.("converge", "定时结束");
      }
    };
    updateRemaining();
    const timer = window.setInterval(updateRemaining, 1000);
    return () => window.clearInterval(timer);
  }, [sleepTimerEndsAt]);

  useEffect(() => {
    const currentTrack = tracks[current.index];
    setSelectedTrack(currentTrack);
    setProgress(0);
  }, [current.index]);

  useEffect(() => () => window.clearTimeout(eventTimer.current), []);

  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const resetState = () => {
    window.clearTimeout(eventTimer.current);
    setPreviewState(null);
    setEventState(null);
    setEventLabel("");
  };

  const triggerEvent = (nextState, label) => {
    if (previewState) return;
    setEventState(nextState);
    setEventLabel(label);
    window.clearTimeout(eventTimer.current);
    eventTimer.current = window.setTimeout(() => {
      setEventState(null);
      setEventLabel("");
    }, 30000);
  };

  triggerEventRef.current = triggerEvent;

  const ensureAudioAnalysis = () => {
    const audio = audioRef.current;
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;
    if (!audio || !AudioContextClass) return;

    try {
      if (!audioContextRef.current) {
        const context = new AudioContextClass();
        const analyser = context.createAnalyser();
        const mediaSource = context.createMediaElementSource(audio);
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.82;
        mediaSource.connect(analyser);
        analyser.connect(context.destination);
        audioContextRef.current = context;
        analyserRef.current = analyser;
        mediaSourceRef.current = mediaSource;
      }
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      setAudioReady(true);
    } catch {
      setAudioReady(false);
    }
  };

  useEffect(() => {
    const analyser = analyserRef.current;
    const root = document.documentElement;
    if (!analyser || !isPlaying) {
      ["--audio-energy", "--audio-bass", "--audio-mid", "--audio-air"].forEach(
        (property) => root.style.setProperty(property, "0"),
      );
      return undefined;
    }

    const data = new Uint8Array(analyser.frequencyBinCount);
    const average = (start, end) => {
      const slice = data.slice(start, Math.max(start + 1, end));
      return slice.reduce((sum, value) => sum + value, 0) / slice.length / 255;
    };
    const readAudio = () => {
      analyser.getByteFrequencyData(data);
      const bass = average(0, 4);
      const mid = average(4, 13);
      const air = average(13, data.length);
      const energy = Math.min(1, bass * 0.52 + mid * 0.33 + air * 0.15);
      root.style.setProperty("--audio-energy", energy.toFixed(3));
      root.style.setProperty("--audio-bass", bass.toFixed(3));
      root.style.setProperty("--audio-mid", mid.toFixed(3));
      root.style.setProperty("--audio-air", air.toFixed(3));
      animationFrameRef.current = window.requestAnimationFrame(readAudio);
    };

    readAudio();
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioReady, isPlaying, selectedTrack.id]);

  useEffect(
    () => () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      mediaSourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      audioContextRef.current?.close();
    },
    [],
  );

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!targets.length) return undefined;
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [activeState.id, page, selectedTone]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setAudioDuration(Math.round(audio.duration));
      }
    };
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleEnded = () => {
      if (loopMode === "one") {
        audio.currentTime = 0;
        setProgress(0);
        setIsPlaying(true);
        audio.play().catch(() => {
          setIsPlaying(false);
          setAudioError("浏览器阻止了循环播放，请点击播放按钮继续");
        });
        return;
      }
      if (loopMode === "all" && playlistTracks.length) {
        const currentIndex = playlistTracks.findIndex(
          (item) => item.id === selectedTrack.id,
        );
        const next =
          playlistTracks[(currentIndex + 1 + playlistTracks.length) % playlistTracks.length];
        setSelectedTrack(next);
        setProgress(0);
        setIsPlaying(true);
        triggerEventRef.current?.("flow", "播放下一段");
        return;
      }
      setIsPlaying(false);
      setProgress(Math.floor(audio.duration || selectedTrack.length));
      triggerEventRef.current?.("archive", "播放完成");
    };
    const handleError = () => {
      setIsPlaying(false);
      setAudioError("音频加载失败，请检查音源文件");
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [loopMode, playlistTracks, selectedTrack.id, selectedTrack.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedTrack.audioSrc) return;

    audio.autoplay = isPlaying;
    audio.pause();
    audio.src = selectedTrack.audioSrc;
    audio.load();
    setAudioDuration(selectedTrack.length);
    setProgress(0);
    setAudioError("");
  }, [selectedTrack.id, selectedTrack.audioSrc, selectedTrack.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedTrack.audioSrc) return;

    if (!isPlaying) {
      audio.autoplay = false;
      audio.pause();
      return;
    }

      audio.autoplay = true;
      const playRequest = audio.play();
    playRequest
      ?.then(() => {
        setAutoplayBlocked(false);
        setAudioError("");
      })
      .catch(() => {
        audio.autoplay = false;
        setIsPlaying(false);
        setAutoplayBlocked(true);
        setAudioError("浏览器阻止了自动播放，请点击页面开始聆听");
      });
  }, [isPlaying, selectedTrack.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedTrack.audioSrc) return undefined;

    const resumeAfterGesture = () => {
      if (!audio.paused) return;
      ensureAudioAnalysis();
      audio.autoplay = true;
      setIsPlaying(true);
      const playRequest = audio.play();
      playRequest
        ?.then(() => {
          setAutoplayBlocked(false);
          setAudioError("");
        })
        .catch(() => {
          setAutoplayBlocked(true);
          setAudioError("请点击播放按钮开始聆听");
        });
    };

    window.addEventListener("pointerdown", resumeAfterGesture, { once: true });
    window.addEventListener("keydown", resumeAfterGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resumeAfterGesture);
      window.removeEventListener("keydown", resumeAfterGesture);
    };
  }, [selectedTrack.id, selectedTrack.audioSrc]);

  const handlePlay = (value = !isPlaying, track = selectedTrack) => {
    if (value) ensureAudioAnalysis();
    if (track.id !== selectedTrack.id) {
      setSelectedTrack(track);
      setProgress(0);
    }
    if (value && progress >= audioDuration) {
      setProgress(0);
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
    setIsPlaying(value);
  };

  const handleTrack = (track) => {
    const sameTrack = track.id === selectedTrack.id;
    if (!sameTrack || !isPlaying) ensureAudioAnalysis();
    setSelectedTrack(track);
    if (!sameTrack || progress >= audioDuration) {
      setProgress(0);
      if (sameTrack && audioRef.current) audioRef.current.currentTime = 0;
    }
    setIsPlaying(sameTrack ? !isPlaying : true);
  };

  const handleSeek = (value) => {
    setProgress(value);
    if (audioRef.current) audioRef.current.currentTime = value;
  };

  const handleToneChange = (tone) => {
    setSelectedTone(tone);
    if (tone !== "全部") triggerEvent("transform", "切换五音");
  };

  const handleFavorite = () => {
    setSavedTracks((list) =>
      list.some((item) => item.id === selectedTrack.id)
        ? list
        : [selectedTrack, ...list],
    );
    triggerEvent("archive", "保存此刻");
  };

  const handleSkip = (direction) => {
    ensureAudioAnalysis();
    if (!playlistTracks.length) return;
    const next =
      playlistTracks[
        (playlistTracks.findIndex((item) => item.id === selectedTrack.id) +
          direction +
          playlistTracks.length) %
          playlistTracks.length
      ];
    setSelectedTrack(next);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleSetTimer = (minutes) => {
    setSleepTimerMinutes(minutes);
    setSleepTimerEndsAt(minutes ? Date.now() + minutes * 60 * 1000 : null);
    triggerEvent(
      "converge",
      minutes ? `${minutes}分钟后停止播放` : "已取消定时停止",
    );
  };

  const toggleLoopMode = () => {
    setLoopMode((mode) =>
      mode === "all" ? "one" : mode === "one" ? "none" : "all",
    );
  };

  const playerTrack = useMemo(
    () => ({
      ...selectedTrack,
      length: audioDuration,
      duration: `${String(Math.floor(audioDuration / 60)).padStart(2, "0")}:${String(audioDuration % 60).padStart(2, "0")}`,
    }),
    [audioDuration, selectedTrack],
  );

  return (
    <div className={"app page-" + page + " app-state-" + activeState.id}>
      <audio
        ref={audioRef}
        preload="metadata"
        autoPlay={isPlaying}
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <div className="audio-field" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
      </div>
      <SiteHeader
        page={page}
        onNavigate={navigate}
        current={current}
        state={activeState}
      />
      <div className={`page-view page-view-${page}`} key={page}>
        {page === "now" && (
          <NowPage
            current={current}
            state={activeState}
            baseState={baseState}
            previewState={previewState}
            eventLabel={eventLabel}
            onPreview={setPreviewState}
            onReset={resetState}
            selectedTrack={playerTrack}
            isPlaying={isPlaying}
            onPlay={() => handlePlay()}
            progress={progress}
            setProgress={handleSeek}
            selectedTone={
              selectedTone === "全部" ? current.data.tone : selectedTone
            }
            onToneChange={handleToneChange}
            savedTracks={savedTracks}
            onFavorite={handleFavorite}
            onTrack={handleTrack}
            onNavigate={navigate}
            onFocus={() => {
              setPreviewState(null);
              setEventState("converge");
              setEventLabel("进入专注");
              window.clearTimeout(eventTimer.current);
            }}
            onSkip={handleSkip}
          />
        )}
        {page === "listen" && (
          <ListenPage
            selectedTone={selectedTone}
            onToneChange={handleToneChange}
            selectedTrack={playerTrack}
            onTrack={handleTrack}
            isPlaying={isPlaying}
            audioError={audioError}
            onNavigate={navigate}
          />
        )}
        {page === "source" && <SourcePage onNavigate={navigate} />}
      </div>
      <GlobalPlayer
        track={playerTrack}
        isPlaying={isPlaying}
        progress={progress}
        onPlay={() => handlePlay()}
        onSeek={handleSeek}
        onSkip={handleSkip}
        audioReactive={audioReady && isPlaying}
        playlistTracks={playlistTracks}
        playerPanel={playerPanel}
        onPanelChange={setPlayerPanel}
        onTrack={(track) => {
          handleTrack(track);
          setPlayerPanel(null);
        }}
        loopMode={loopMode}
        onToggleLoop={toggleLoopMode}
        sleepTimerMinutes={sleepTimerMinutes}
        sleepTimerRemaining={sleepTimerRemaining}
        onSetTimer={handleSetTimer}
      />
      <BottomNav page={page} onNavigate={navigate} />
    </div>
  );
}

export default App;
