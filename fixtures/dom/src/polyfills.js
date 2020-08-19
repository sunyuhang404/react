import 'core-js/es6/symbol';
import 'core-js/es6/promise';
import 'core-js/es6/set';
import 'core-js/es6/map';

// requestAnimationFrame polyfill 版本
(function() {
  var lastTime = 0;
  /**
   * ms: IE
   * mox: 火狐
   * webkit: 谷歌, safari, 新版Opera, 几乎所有的iOS系统中的浏览器
   * o: 旧版Opera
   */
  // 如果浏览器内核不支持 requestAnimationFrame, 就添加一个, 同时添加取消定时器的方法
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      // 计算一帧剩余的时间
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      // 时间到达之后, 执行callback把当前时间和剩余时间传递出去
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
})();
