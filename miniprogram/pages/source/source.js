const { getCurrent } = require("../../utils/data");

Page({
  data: {
    current: getCurrent(),
  },

  onShow() {
    this.setData({ current: getCurrent() });
  },

  goListen() {
    wx.switchTab({ url: "/pages/listen/listen" });
  },
});
