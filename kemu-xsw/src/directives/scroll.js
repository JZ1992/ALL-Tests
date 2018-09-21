/**
 * 插件源地址：http://manos.malihu.gr/jquery-custom-content-scroller/
 */

import Vue from "vue";
Vue.directive('scroll', {
  inserted: function (el, bind) {
    dc_scroll.initScroll(bind.value, el);
  }
});


/**
 * 
 * Function
 * 
 */
var dc_scroll = {
  //默认配置
  defaultSetting: {
    theme: "dark",
    // axis:"yx", // 纵向/横向滚动条
    // callbacks: {
    //   whileScrolling: function () {
    //         //this.mcs: 这个参数包含了位置信息
    //     console.log(this.mcs.topPct);
    //   },
    //   onScroll: function () {
    //     console.log(a);
    //   }
    // }
  },
  //初始化
  initScroll: function (vueSetting, el) {
    //参数预处理
    var isObj, _setting;
    var _setting = vueSetting || {};
    if (!(typeof _setting === 'object' && Object.keys(_setting).length)) {
      _setting = this.defaultSetting;
    } else {
      _setting = $.extend({}, this.defaultSetting, _setting);
      //暴露dom：组件调用
      Vue.set(vueSetting, '$el', $(el));
    }
    this.initScrollAction(_setting, el);
  },
  //初始化dom
  initScrollAction: function (setting, el) {
    var $el = $(el);
    $el.mCustomScrollbar(setting);
  }

}
