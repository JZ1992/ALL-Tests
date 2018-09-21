<template>
  <div class="commonBox" v-loading.fullscreen.lock="boxloading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 登录之后显示 -->
    <div class="height100" v-if="isNeedSignIn === false">
      <div class="psb-header">
        <div class="psbt-title ps-dashboard">心理测评</div>
        <div class="psbt-back" @click="backList" v-if="isPC">返回</div>
      </div>
      <div class="psb-content height100" v-scroll>
        <div>
          <div class="psdc-info">
            <p> 研究表明：除了学校、家庭、社会因素以外，兴趣、性格等个人因素会给学生日后所学专业和从事职业带来更高的满意度。</p>
            <p>为了帮助高中学生更好地分析自身特点和优势， 雪松玩试达测评推出性格测试[MBTI]、兴趣测试[Holland]、专业兴趣测评。完成三大测评后经过雪松湾试达测评的独家算法，可在线生成心里测评报告，多维度、多方面地让高中生更加深入了解自我。</p>
          </div>
          <div class="psdc-examList">
            <div class="psdce-item">
              <div class="pi-img">
                <img class="fullSize" src='../../assets/mbti.png' />
              </div>
              <div class="pi-description">
                <div class="pid-title ">人格特质测评[MBTI]</div>
                <div class="pid-content">全方位解读性格、专业、职业的联系。为个人定位和专业选择提供科学的依据。</div>
              </div>
              <div class="pi-btns">
                <div v-if='isMbiComplete === false' class="pib-test" @click="startExam('mbti')">开始测试</div>
                <!-- <div class="pib-test" @click="startExam('mbti')">开始测试</div> -->
                <div v-if='isMbiComplete === true' class="pib-report" @click="getReport('mbti')">查看报告</div>
              </div>
            </div>

            <div class="psdce-item">
              <div class="pi-img">
                <img class="fullSize" src='../../assets/holland.png' />
              </div>
              <div class="pi-description">
                <div class="pid-title">职业兴趣[Holland]</div>
                <div class="pid-content">清晰了解自己的兴趣倾向和适宜专业，帮助学生达到专业和兴趣相互结合。</div>
              </div>
              <div class="pi-btns">
                <div v-if='isHollandComplete === false' class="pib-test" @click="startExam('holland')">开始测试</div>
                <!-- <div class="pib-test" @click="startExam('holland')">开始测试</div> -->

                <div v-if='isHollandComplete === true' class="pib-report" @click="getReport('holland')">查看报告</div>
              </div>
            </div>

            <div class="psdce-item">
              <div class="pi-img ">
                <img class="fullSize" src='../../assets/profession.png' />
              </div>
              <div class="pi-description">
                <div class="pid-title">专业兴趣测评</div>
                <div class="pid-content">清晰了解自己的兴趣倾向和适宜专业，帮助学生达到专业和兴趣相互结合。</div>
              </div>
              <div class="pi-btns">
                <div v-if="isProfessionComplete === false" class="pib-test" @click="startExam('profession')">开始测试</div>
                <!-- <div class="pib-test" @click="startExam('profession')">开始测试</div> -->
                <div v-if="isProfessionComplete === true" class="pib-report pib-btn-disable">查看报告</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- 扫码登录的页面 -->
    <div v-if="isNeedSignIn === true" class="qr-code-login">
      <div class="loginBox" v-loading.fullscreen.lock="loading" element-loading-text="登录中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="b-form">
          <div class='b-title'>试达学生入口</div>
          <div>
            <div class='b-input'>
              <el-form :model="loginForm" ref="qrloginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="account" :rules="loginFormRules.account">
                  <el-input v-model="loginForm.account" placeholder="请输入账号" @keyup.enter.native="qrSubmit"></el-input>
                </el-form-item>
                <el-form-item prop="password" :rules="loginFormRules.password">
                  <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="qrSubmit"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class='b-login' @click="qrSubmit">登&nbsp;录</div>
          <div class='b-tip'>登陆问题请联系学校管理员：15963367879</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { checkPsyStatus, checkExamStatus, getStuInfo } from "@/api/http.js";
import common from "@/common.js";
import config from "@/config.js";
import axios from "axios";
export default {
  data() {
    //获取当前来自哪一场考试:
    //todo:token过期
    var currentExam = JSON.parse(
      localStorage.getItem("zbxk-current-exam") || "{}"
    );
    var checkNumber = function(rule, value, callback) {
      function isNum() {
        return new RegExp("\\D", "g");
      }
      if (isNum().test(value)) {
        callback(new Error("账号只能是数字"));
      } else {
        callback();
      }
    };
    return {
      common,
      axios,
      config,
      currentExam: currentExam,
      checkExamStatusAPI: checkExamStatus,
      checkPsyStatusAPI: checkPsyStatus,
      getStuInfoAPI: getStuInfo,

      //pc显示返回
      isPC: false,

      //路由信息
      routerParams: {},

      //查看报告和开始测评按钮的显示控制，  默认都不显示
      isHollandComplete: "",
      isMbiComplete: "",
      isProfessionComplete: "",

      //是否需要登录
      isNeedSignIn: "",
      loading: false,

      //登录相关信息
      account: "",
      password: "",
      loginForm: {
        account: "",
        password: ""
      },
      boxloading: true,
      loginFormRules: {
        account: [
          { required: true, message: "账号不能为空" },
          { validator: checkNumber, trigger: "change" }
        ],
        password: [{ required: true, message: "密码不能为空" }]
      },
      isRemember: true
    };
  },
  mounted() {
    var that = this;
    // if (!common.checkPc()) {
    //   that.SetPhonecss();
    // }
    that.checkIsNeedSignIn();
    this.$nextTick(function() {
      //一定在nextTick中发送事件， 否则layout页面无法接受
      that.bus.$emit("toChangeTitle", "选课定向");
    });
  },

  beforeRouteEnter(to, from, next) {
    /**
     *  心里测评页面：四种进入方式  [分两类判断， 地址不带参数就是正常登录进来， 带参数就是h5方式进入]
     * 1. 正常登录，逐步进入
     * 2. 扫码无需登录进入： demo地址   http://localhost:8080/#/main/psychological?test_id=9964458&school_id=468468   【根据参数调用接口，判断需不需要登录，要求用户注册】
     * 3. 扫码登录进入       demo地址    http://localhost:8080/#/main/psychological?test_id=9964458&school_id=468468  【根据参数调用接口，判断需不需要登录】
     * 4. 第三方机构拼接地址进入     demo地址    http://localhost:8080/#/main/psychological?test_id=9964458&school_id=s468468&sno=65468&sname=65465465   【无需登录，答题之后】
     */
    next();
  },
  methods: {
    startExam(type) {
      // 设置路由查询参数，保持一致
      var params = { name: "psychologicalpaper", params: { type: type } };
      var router_keys = Object.keys(this.routerParams);
      var routesParamsObj = this.routerParams;
      if (router_keys.length) {
        params.query = {};
        router_keys.forEach(function(key) {
          params.query[key] = routesParamsObj[key];
        });
      }

      localStorage.setItem("zbxk-cp-type", type);
      this.$router.push(params);
    },
    getReport(type) {
      localStorage.setItem("zbxk-cp-type", type);
      this.$router.push({ name: "psychologicalreport" });
    },
    backList() {
      this.$router.push({ name: "examlist" });
    },
    //手机端样式设置
    transformPhone() {
      var that = this;
      setTimeout(function() {
        if (!that.common.checkPc()) {
          that.SetPhonecss();
          return;
        }
        that.isPC = true;
      });
    },
    SetPhonecss: function(value) {
      var Btnlist = document.getElementsByClassName("psdce-item");
      for (var i = 0; i < Btnlist.length; i++) {
        Btnlist[i].classList.add("tiemFlex");
      }
    },

    /**
     * // 扫码登录
     * // 测试------
     * 账号：18556823593
     * 密码：666666ab
     */
    // 检查是否需要登录【判断：地址不携带查询参数【正常登录】  和  携带查询参数参数（路由2、3、4情况）】
    checkIsNeedSignIn() {
      /**
       *
       */
      this.boxloading = true;
      // var hasToken = this.config.getCookie("zbxk-token");
      // console.log(hasToken);
      // hasToken = 0;
      var fullPath = this.$route.fullPath,
        qpString = "",
        queryArray = [],
        qpObject = {};
      // fullPath.replace(/(?<=(\/main\/psychological\s*\?)).*/g, function(match) {
      //   qpString = match;
      //   return match;
      // });
      fullPath.replace(/\/main\/psychological\s*\?(.*)/g, function(match, $1) {
        qpString = $1;
        return match;
      });
      queryArray = qpString ? qpString.split("&") : [];
      if (!queryArray.length) {
        var userInfo = JSON.parse(localStorage.getItem("zbxk-userInfo")),
          param = { school_id: userInfo.school_id };
        this.getSno(param, "login-true");
      } else {
        queryArray.forEach(function(item) {
          var params = item.split("=");
          ["test_id", "school_id", "sno", "sname"].forEach(function(key) {
            if (item.indexOf(key) !== -1) {
              qpObject[key] = params[1];
            }
          });
        });
        this.routerParams = qpObject;
        this.checkNeedSignAPI(qpObject);
      }
    },
    checkNeedSignAPI(qpObject) {
      //qpObject:
      //1. 第三方机构， 包含"test_id", "school_id", "sno", "sname"
      //2. 扫码登录， 包含"test_id", "school_id",
      var that = this;
      var keylength = Object.keys(qpObject).length;
      if (keylength === 4) {
        that.setPaperSaveParams(qpObject);
        //检查按钮状态：开始测评和查看报告
        var _checkBtnParam = {
          test_id: qpObject.test_id,
          school_id: qpObject.school_id,
          sno: qpObject.sno
        };
        this.checkBtnStatus(_checkBtnParam);
      } else if (keylength === 2) {
        if (!qpObject["test_id"] || !qpObject["school_id"]) {
          that.$message.error("扫码登录失败：缺少参数，请联系管理员检查！");
          return;
        }
        var _param = {
          test_id: qpObject["test_id"],
          school_id: qpObject["school_id"]
        };
        //检查是否需要登录
        that.checkExamStatusAPI(_param).then(function(res) {
          var result = res.data;
          if (result.code === 200) {
            var type = result.data.test_type;
            console.log(type);
            //状态4：无需登录； 其他状态需要登录
            if (type == 4) {
              var _paperSaveParam = {
                test_id: that.currentExam.test_id,
                sno: "todo",
                username: "todo",
                school_id: that.currentExam.school_id,
                class: that.currentExam.class_num
              };
              that.setPaperSaveParams(_paperSaveParam);
              //扫码不登录，只有进入测评的按钮
              that.isHollandComplete = false;
              that.isMbiComplete = false;
              that.isProfessionComplete = false;
              that.resetLoading();
            } else {
              // 如果已登录，无需在登录
              var hasToken = that.config.getCookie("zbxk-token");
              if (hasToken) {
                var param = { school_id: result.data.school_id };
                that.boxloading = true;
                that.getSno(param, "login-true");
                return;
              }
              //登录
              that.isNeedSignIn = true;
              that.boxloading = false;
            }
          } else {
            that.$message.error(result.message);
          }
          that.transformPhone();
        }, this.error);
      }
    },
    resetLoading: function() {
      this.isNeedSignIn = false;
      this.boxloading = false;
      this.transformPhone();
    },
    //设置保存试卷需要的参数： 试卷保存页面需要这些参数
    setPaperSaveParams: function(data) {
      //参数设置设置问题： 对于第三方机构拼接地址 sname对应 试题保存页面的username字段
      var _data = JSON.parse(JSON.stringify(data));
      if (_data.sname) {
        _data.username = _data.sname;
      }
      localStorage.setItem("zbxk-paperSaveParams", JSON.stringify(_data));
    },
    //获取sno
    /**
     * param
     *    {
     *      school_id: 24324
     *    }
     */
    getSno(param, type) {
      var that = this;
      this.getStuInfoAPI(param).then(function(res) {
        var result = res.data;
        if (result.code === 200) {
          that.snoSuccessBack(result.data, type);
        } else {
          that.resetLoading();
          that.$message.error(result.message);
        }
      }, this.error);
    },
    //接口错误处理
    error(res) {
      this.resetLoading();
      that.$message.error("请求异常！");
    },
    snoSuccessBack(result, type) {
      /**
       * type
       *    "login-true":   登录进来
       *    "login-false":  不需要登录进来
       */
      switch (type) {
        case "login-true":
          var userInfo = JSON.parse(localStorage.getItem("zbxk-userInfo"));
          //设置psychologicalpaper考题页面需要的参数
          var params = {
            test_id: this.currentExam.test_id,
            sno: result.student_no,
            username: userInfo.name,
            school_id: this.currentExam.school_id,
            class: this.currentExam.class_num
          };
          this.setPaperSaveParams(params);
          //检查按钮状态：开始测评和查看报告
          var _checkBtnParam = {
            test_id: params.test_id,
            school_id: params.school_id,
            sno: params.sno
          };
          this.checkBtnStatus(_checkBtnParam);
          break;
        case "login-false":
          break;
        default:
          break;
      }
    },
    /**
     * 检查按钮状态：开始测评和查看报告
     * @param:
     *  test_id	 	 考试ID（必须）
     *  school_id	 学校ID（必须）
     *  sno        考号（必须)
     */
    checkBtnStatus(param) {
      var that = this;
      this.checkPsyStatusAPI(param).then(function(res) {
        var result = res.data;
        if (result.code === 200) {
          var _status = result.data;
          that.isHollandComplete = _status.holland;
          that.isMbiComplete = _status.mbti;
          that.isProfessionComplete = _status.major;
        } else {
          that.$message.error(result.message);
        }
        that.resetLoading();
      }, this.error);
    },

    //扫码需要登录
    qrSubmit() {
      var that = this;
      this.$refs["qrloginForm"].validate(function(valid) {
        if (valid) {
          that.qrloginAPI();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //登录成功后获取用户信息
    getUserInfo() {
      var that = this,
        config = this.config;
      var url = config.apiDomain + "/user/info";
      this.axios.get(url, { headers: config.header() }).then(
        res => {
          // 获取信息成功
          var data = res.data;
          if (data.code == 200) {
            localStorage.setItem("zbxk-userInfo", JSON.stringify(data.data)); //存储token
            that.isNeedSignIn = false;
          }
          this.loading = false;
          var param = { school_id: this.routerParams.school_id };
          this.boxloading = true;
          this.getSno(param, "login-true");
        },
        res => {
          // 获取信息失败
          console.log(res);
          this.loading = false;
        }
      );
    },
    //登录接口
    qrloginAPI() {
      var that = this,
        config = this.config;
      // 登录设置
      var url = config.apiDomain + "/student/account-login";
      //todo: 5分钟内同一IP超过2次登录失败
      var codeUrl = config.apiDomain + "/user/captcha";
      this.loading = true;
      this.axios.post(url, this.loginForm, { headers: config.headers }).then(
        res => {
          // 登陆成功回调
          var data = res.data;
          if (data.code == 200) {
            config.setCookie("zbxk-token", data.data.token, 1); //存储token
            that.getUserInfo();
          } else {
            that.$message({
              message: data.message,
              type: "warning"
            });
            this.loading = false;
          }
        },
        res => {
          // 登陆失败回调
          console.log(res);
          this.loading = false;
        }
      );
    }
  }
};
</script>
<style>
.psbt-title.ps-dashboard::before {
  background: url(../../assets/psychological.png) no-repeat;
}

/* 内容 */
.psb-content {
  text-align: left;
  padding: 16px;
}
.psdc-info {
  font-size: 14px;
  color: #284050;
  letter-spacing: 0;
  line-height: 18px;
  /* width: 70%;*/
  margin-bottom: 24px;
}

.pid-title {
  font-size: 20px;
  color: #284050;
  letter-spacing: 0;
  line-height: 20px;
  margin-bottom: 16px;
}
.pid-content {
  font-size: 14px;
  color: #6d8392;
  letter-spacing: 0;
  margin-bottom: 40px;
}
/*.psdce-item {
  margin-bottom: 25px;
  margin-right: 20px;
}*/

.pi-btns > div {
  display: inline-block;
  border: 1px solid #4393f7;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  padding: 6px 40px;
  background: #fff;
  color: #4393f7;
}
.pi-btns > div:hover {
  background: #4393f7;
  color: #ffffff;
  cursor: pointer;
}
.pi-btns > div.pib-btn-disable {
  background: #d7dce0;
  border: 1px solid #d7dce0;
  border-radius: 4px;
  color: #fff;
  cursor: not-allowed;
}

.pi-img {
  /* -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center 0;
  border-radius: 4px; */
  /* width: 448px;*/
  /* height: 280px;  */
  margin-bottom: 20px;
}
.pi-img.mbti {
  background: url(../../assets/mbti.png) no-repeat;
}
.pi-img.holland {
  background: url(../../assets/holland.png) no-repeat;
}
.pi-img.profession {
  background: url(../../assets/profession.png) no-repeat;
}

/* 三等分布局 */
.psdc-examList {
  display: flex;
  /*  flex-direction: row;*/
  flex-wrap: wrap;
}
.psdce-item {
  margin-bottom: 50px;
  margin-right: 20px;
  flex: 1;
}

.fullSize {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.tiemFlex {
  flex: auto;
  margin-right: 0;
}
.tiemFlex .pi-btns > div {
  display: block;
  margin-bottom: 5px;
}

/* 扫码登录页面 */
.qr-code-login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #284050;
  z-index: 100;
}

.loginBox {
  height: 100%;
  background: url(../../assets/login.png) no-repeat;
  -webkit-background-size: cover;
  -o-background-size: cover;
  /* background-position: center 0; */
  display: flex;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}

.b-form {
  width: 480px;
  height: 380px;
  background: #fff;
  border-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 35px 50px;
}
.b-title {
  font-size: 30px;
  margin-bottom: 40px;
}
.b-input .el-input input {
  color: #284050;
}
.b-input > div {
  margin-bottom: 20px;
}
.b-input .el-form-item__content {
  margin-left: 0 !important;
}
.b-check {
  float: left;
  margin-bottom: 20px;
}
.b-login {
  clear: both;
  background: #419bf9;
  border-radius: 5px;
  color: #fff;
  padding: 10px 0;
}
.b-login:hover {
  cursor: pointer;
  opacity: 0.8;
}

.b-tip {
  margin-top: 15px;
  font-size: 14px;
  color: #989a9c;
}

.height100 {
  height: 100%;
}

/* element样式微调 */
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: inherit !important;
}
/* .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.2) !important;
} */
</style>


