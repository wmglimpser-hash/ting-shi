const { tracks, tones } = require("../../utils/data");

Page({
  data: {
    tones,
    selectedTone: "全部",
    toneIndex: 0,
    visibleTracks: tracks,
    selectedTrackId: 11,
    isPlaying: false,
  },

  onLoad() {
    const app = getApp();
    const selectedTrackId = app.globalData.selectedTrackId || 11;
    this.setData({ selectedTrackId });
    this.audio = app.globalData.audioContext;
    this.bindAudioEvents();
  },

  onShow() {
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

  onToneChange(event) {
    const index = Number(event.currentTarget.dataset.index);
    const selectedTone = index === 0 ? "全部" : tones[index - 1].name;
    const visibleTracks = selectedTone === "全部" ? tracks : tracks.filter((item) => item.tone === selectedTone);
    this.setData({ toneIndex: index, selectedTone, visibleTracks });
  },

  onTrack(event) {
    const id = Number(event.currentTarget.dataset.id);
    const isSame = id === this.data.selectedTrackId;
    const track = tracks.find((item) => item.id === id);
    if (!track || !this.audio) return;
    if (isSame && this.data.isPlaying) {
      this.audio.pause();
      return;
    }
    this.setData({ selectedTrackId: id, isPlaying: true });
    getApp().globalData.selectedTrackId = id;
    getApp().globalData.isPlaying = true;
    if (this.currentAudioSrc !== track.audioSrc) {
      this.audio.stop();
      this.audio.src = track.audioSrc;
      this.currentAudioSrc = track.audioSrc;
    }
    this.audio.play();
  },

  goSource() {
    wx.switchTab({ url: "/pages/source/source" });
  },
});
