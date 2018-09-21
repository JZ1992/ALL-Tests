let config = {
  // env: Env,
  apiDomain: 'http://frontapi.cedardev.cn/api/v1',
  // apiDomain: 'http://localhost:8088',
  // imgUpload: 'http://localhost:8082/upload'
  headers: {
    'Content-Type': 'application/json'
  },
  header() {
    return {
      'Authorization': 'Bearer ' + config.getCookie('zbxk-token')
    }
  },
  setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = "expires=" + d.toGMTString()
    document.cookie = cname + "=" + cvalue + "; " + expires
  },
  getCookie(cname) {
    var name = (cname ? cname : 'zbxk-token') + "=";
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return "";
  },


  //手机端头部标题显示
  moduleCodeTable: {
    'examlist': '考试列表',
    'psychological': '选课定向',
    'setting': '个人设置',
    'psychologicalreport':'人格测试结果',
  },
}
export default config


/**
 * 需要记录的数据, 退出登录需要消除
 * cookie：
 *      1. zbxk-token   【登录接口返回】
 * localStorage:
 *      1. zbxk-current-exam 
 *      2. zbxk-cp-type
 *      3. zbxk-userInfo 【登录之后的获取用户信息的接口】
 *      4. zbxk-paperSaveParams  【心里测评页面用来保存 考题接口需要的参数】
 * 
 *  */
