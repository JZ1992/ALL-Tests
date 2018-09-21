import axios from 'axios'
import {
  Header
} from '../../node_modules/element-ui';
import config from '../../src/config.js'
// import config from "@/config.js";
const base_url = 'http://frontapi.cedardev.cn/api/v1'
axios.defaults.withCredentials = true;


// 越权登陆
export const overAuthLogin = (data) => {
  return axios.post(base_url + '/user/over-auth-login', data, {
    headers: config.header()
  }, {
    withCredentials: true
  })
}



/**
 * 考试列表页面setting
 */
export const getExamList = data => {
  return axios.post(base_url + '/student/tests', data, {
    headers: config.header()
  })
}


/**
 * 设置页面setting
 */
//保存基本信息：手机号
export const saveGeneralInfo = data => {
  return axios.post(base_url + '/user/info-edit', data, {
    headers: config.header()
  })
}
//修改密码
export const savePassword = data => {
  return axios.post(base_url + '/user/password-edit', data, {
    headers: config.header()
  })
}


/**
 * 心里测评页面 psychological
 */
// PS：一种四种情况进入此页面：
//     1. 正常登录： 通过登录页面→考试列表页→此页面
//     2. 扫二维码： 
//             ~1.  查询考试type类型， 无须登录 ： 考试获取考题→答题完之后→弹出注册窗口（手机号、姓名、验证码）
//             ~2.  查询考试type类型， 需要登录：  弹框登录→考试获取考题→答题完之后
//     4. 第三方机构：  无须登录，考试获取考题→答题完之后

//非智力考试作答状态
export const checkPsyStatus = data => {
  return axios.post(base_url + '/zbxk/test-answered', data, {
    headers: config.header()
  })
}
//todo:检查考试的type类型Exam 【 2、4情况需要 】
export const checkExamStatus = data => {
  return axios.post(base_url + '/test', data, {
    headers: config.header()
  })
}
//获取学生信息：sno
export const getStuInfo = data => {
  return axios.post(base_url + '/user/student-info', data, {
    headers: config.header()
  })
}



/**
 * 考题页面 psychologicalpaper
 */
// holland作答保存
export const saveHolland = data => {
  return axios.post(base_url + '/holland-test/store', data, {
    headers: config.header()
  })
}
// holland考试
export const getHolland = data => {
  return axios.post(base_url + '/holland-test', data, {
    headers: config.header()
  })
}


//mbti作答保存
export const saveMbti = data => {
  return axios.post(base_url + '/mbti-test/store', data, {
    headers: config.header()
  })
}
//mbti考试
export const getMbti = data => {
  return axios.post(base_url + '/mbti-test', data, {
    headers: config.header()
  })
}


//专业兴趣作答保存
export const saveMajor = data => {
  return axios.post(base_url + '/major-test/store', data, {
    headers: config.header()
  })
}
//mbti考试
export const getMajor = data => {
  return axios.post(base_url + '/major-test', data, {
    headers: config.header()
  })
}



//获取手机号验证码接口
export const getPhoneCode = data => {
  return axios.post(base_url + '/mobile/user/send-sms-code', data, {
    headers: config.header()
  })
}




/**
 * 走班选课报告
 * 
 */
export const getZbxkReport = data => {
  return axios.post(base_url + '/zbxk/person-report', data, {
    headers: config.header()
  })
}

/**
 * 个人学业报告
 * 
 */
export const getStuPersonReport = data => {
  return axios.post(base_url + '/report/person', data, {
    headers: config.header()
  })
}

/**
 *  请求报告(todo: 封装成promise)
 */
export const getReportHtml = (url, success, error) => {

  // //注意， 请不要使用axios，存在问题
  // return axios.get(url)

  var xhr = new XMLHttpRequest();
  xhr.onloadend = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      success(xhr);
    }else{
      error(xhr);
    }
  };
  xhr.open('GET', url);
  xhr.send();

}
