const { states, tones, tracks, getCurrent, getCalendarMeta } = require("../../utils/data");

Page({
  data: {
    tones,
    state: states[3],
    stateIndex: 3,
    stateNames: states.map((item) => `${item.name} · ${item.subtitle}`),
    calendar: {},
    currentHour: {},
    selectedTone: tones[1],
    toneIndex: 1,
    selectedTrack: tracks[10],
    isPlaying: false,
    previewing: false,
    waveBars: [24, 42, 30, 63, 38, 78, 48, 31, 58, 36, 71, 45, 28, 60, 40, 75, 35, 50, 29, 66, 43, 57, 32, 69, 40, 54],
  },

  onLoad() {
    this.refreshCurrent();
    this.refreshTimer = setInterval(() => this.refreshCurrent(), 30000);
    this.audio = getApp().globalData.audioContext;
    this.bindAudioEvents();
  },

  onUnload() {
    clearInterval(this.refreshTimer);
  },

  onShow() {
    if (!this.data.previewing) this.refreshCurrent();
    this.setData({ isPlaying: getApp().globalData.isPlaying });
  },

  bindAudioEvents() {
    if (!this.audio || this.audioBound) return;
    this.audioBound = true;
    this.audio.onPlay(() => this.setData({ isPlaying: true }));
    this.audio.onPause(() => this.setData({ isPlaying: false }));
    this.audio.onStop(() => this.setData({ isPlaying: false }));
    this.audio.onEnded(() => this.setData({ isPlaying: false }));
    this.audio.onError(() => this.setData({ isPlaying: false }));
  },

  refreshCurrent() {
    const current = getCurrent();
    const track = tracks.find((item) => item.hour === `${current.hour.name}时`) || tracks[0];
    const toneIndex = Math.max(0, tones.findIndex((item) => item.name === current.hour.tone));
    this.setData({
      state: this.data.previewing ? this.data.state : current.state,
      stateIndex: this.data.previewing ? this.data.stateIndex : states.findIndex((item) => item.id === current.state.id),
      calendar: getCalendarMeta(current.date),
      currentHour: current.hour,
      selectedTrack: this.data.previewing ? this.data.selectedTrack : track,
      selectedTone: this.data.previewing ? this.data.selectedTone : tones[toneIndex],
      toneIndex: this.data.previewing ? this.data.toneIndex : toneIndex,
    });
  },

  onStateChange(event) {
    const index = Number(event.detail.value);
    this.setData({ state: states[index], stateIndex: index, previewing: true });
  },

  resetState() {
    this.setData({ previewing: false });
    this.refreshCurrent();
  },

  onToneChange(event) {
    const index = Number(event.currentTarget.dataset.index);
    this.setData({ selectedTone: tones[index], toneIndex: index });
  },

  togglePlay() {
    if (!this.audio) return;
    if (this.data.isPlaying) {
      this.audio.pause();
      return;
    }
    this.playTrack(this.data.selectedTrack);
  },

  chooseTrack(event) {
    const id = Number(event.currentTarget.dataset.id);
    const track = tracks.find((item) => item.id === id);
    if (track) {
      this.setData({ selectedTrack: track });
      this.playTrack(track);
    }
  },

  playTrack(track) {
    if (!this.audio || !track?.audioSrc) return;
    if (this.currentAudioSrc !== track.audioSrc) {
      this.audio.stop();
      this.audio.src = track.audioSrc;
      this.currentAudioSrc = track.audioSrc;
    }
    getApp().globalData.selectedTrackId = track.id;
    getApp().globalData.isPlaying = true;
    this.audio.play();
    this.setData({ isPlaying: true });
  },
});
