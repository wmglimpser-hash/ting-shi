App({
  globalData: {
    selectedTone: "徵",
    selectedTrackId: 11,
    isPlaying: false,
    audioError: "",
    audioContext: null,
  },

  onLaunch() {
    const audioContext = wx.createInnerAudioContext();
    audioContext.autoplay = false;
    this.globalData.audioContext = audioContext;

    audioContext.onPlay(() => {
      this.globalData.isPlaying = true;
    });
    audioContext.onPause(() => {
      this.globalData.isPlaying = false;
    });
    audioContext.onStop(() => {
      this.globalData.isPlaying = false;
    });
    audioContext.onEnded(() => {
      this.globalData.isPlaying = false;
    });
    audioContext.onError(() => {
      this.globalData.isPlaying = false;
      this.globalData.audioError = "音频加载失败，请检查音源文件";
    });
  },
});
