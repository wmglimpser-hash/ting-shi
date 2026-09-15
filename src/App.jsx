import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  hours,
  tracks,
  tones,
  designStates,
  getCurrentHour,
  getTimeState,
} from "./listeningData";
import Icon from "./Icon";
import NowPage, { SiteHeader, BottomNav } from "./HomeExperience";

function ToneTabs({ selectedTone, onToneChange }) {
  return (
    <div className="tone-tabs">
      <button
        className={selectedTone === "全部" ? "active" : ""}
        onClick={() => onToneChange("全部")}
      >
        全部
      </button>
      {tones.map((tone) => (
        <button
          key={tone.name}
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
  return (
    <main className={"listen-page page-shell paper-page " + toneClass}>
      <div className="page-heading">
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
      <section className="tone-story">
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
      <section className="track-library">
        <div className="library-title">
          <span>时辰曲目</span>
          <span>{visibleTracks.length.toString().padStart(2, "0")} 首声音</span>
        </div>
        {visibleTracks.map((track, index) => (
          <button
            className={
              "track-card " + (selectedTrack.id === track.id ? "selected" : "")
            }
            key={track.id}
            onClick={() => onTrack(track)}
          >
            <span className="track-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="track-art">
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

function SourcePage({ current, onNavigate }) {
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
      <section className="source-hero">
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
      <section className="relation-card">
        <div className="relation-top">
          <span>当前时辰 · {current.data.name}时</span>
          <span>{current.data.range}</span>
        </div>
        <div className="relation-chain">
          <div>
            <span className="chain-index">01</span>
            <strong>{current.data.name}时</strong>
            <small>纳子法 · 时辰</small>
          </div>
          <span className="chain-arrow">→</span>
          <div>
            <span className="chain-index">02</span>
            <strong>
              {current.data.meridian.replace("足", "").replace("手", "")}
            </strong>
            <small>子午流注 · 经脉</small>
          </div>
          <span className="chain-arrow">→</span>
          <div>
            <span className="chain-index">03</span>
            <strong>{current.data.element}</strong>
            <small>脏腑五行 · 属性</small>
          </div>
          <span className="chain-arrow">→</span>
          <div className="relation-last">
            <span className="chain-index">04</span>
            <strong>{current.data.tone}音</strong>
            <small>五音 · 调式</small>
          </div>
        </div>
      </section>
      <section className="source-reading">
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

function App() {
  const [page, setPage] = useState("now");
  const [current, setCurrent] = useState(getCurrentHour);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTone, setSelectedTone] = useState("全部");
  const [selectedTrack, setSelectedTrack] = useState(
    () => tracks[getCurrentHour().index],
  );
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
  }, [selectedTrack.id, selectedTrack.length]);

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
      <SiteHeader
        page={page}
        onNavigate={navigate}
        current={current}
        state={activeState}
      />
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
          onSkip={(direction) => {
            const next =
              tracks[
                (tracks.findIndex((item) => item.id === selectedTrack.id) +
                  direction +
                  tracks.length) %
                  tracks.length
              ];
            setSelectedTrack(next);
            setProgress(0);
          }}
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
      {page === "source" && (
        <SourcePage current={current} onNavigate={navigate} />
      )}
      <BottomNav page={page} onNavigate={navigate} />
    </div>
  );
}

export default App;
