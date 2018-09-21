<template>
  <div class="paper-answer-scrollBox" style="height:100%;">
    <div class="paddding16" v-scroll="{autoHideScrollbar:true}">
      <!-- <div class="paddding16"> -->
      <div>
        <div class="pac-notic" v-if="isPC">
          <div class="pacn-title">注意：</div>
          <div class="pacn-text">本测试预计需要约30分钟，都是有关个人特质的倾向性，而非知识、技能和经验。回答也是不同的，因而对问题如何回答，并没有对于不对之分，请你尽量表达个人的意见， 不要有其他顾虑。</div>
        </div>
        <div class="question-area" v-if="questions.length">
          <div class="qa-title" :class="{'h5-qa-title':!isPC}">
            请开始答题，共{{questions.length}}题。
          </div>
          <div class="qa-content">

            <!-- 考试中 -->
            <div v-if="currentIndex <= questions.length">
              <!-- 人格特质测评[MBTI] -->
              <div v-for="question in questions" :key="question.vForKey" v-if="type==='mbti' && currentIndex === question.orderIndex">
                <div class="qac-bigInfo" :class="{'h5-qac-bigInfo':!isPC}" v-if="question.cate">{{question.cate}}</div>
                <div class="qac-options">
                  <div class="qus-title">
                    <div :class="{'ques-num':isPC}">
                      <span class="ques-num-current">{{question.orderIndex}}</span>
                      <span class="ques-num-sum">/{{questions.length}}</span>
                    </div>
                    <div class="h5-pcSpace" v-if="!isPC"></div>
                    <div class="ques-body" :class="{'h5-ques-body':!isPC}">
                      <div class="ques-text" :class="{'h5-ques-text':!isPC}" v-html="question.question"></div>
                      <div class="op-item" :class="{'h5-op-item':!isPC}" @click="goToNextQuestion(question,'mbti', 'A')">
                        <div :class='{"h5-op-select":!isPC}'>
                          A
                        </div>
                        <div>{{question.option_A | optionFilter}}</div>
                      </div>
                      <div class="op-item" :class="{'h5-op-item':!isPC}" @click="goToNextQuestion(question,'mbti' ,'B')">
                        <div :class='{"h5-op-select":!isPC}'>
                          B
                        </div>
                        <div>{{question.option_B | optionFilter}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 职业兴趣[holland] -->
              <div v-for="question in questions" :key="question.vForKey" v-if="type==='holland' && currentIndex === question.orderIndex">
                <div class="qac-bigInfo" v-if="question.cate">{{question.cate}}</div>
                <div class="qac-options">
                  <div class="qus-title">
                    <div :class="{'ques-num':isPC}">
                      <span class="ques-num-current">{{question.orderIndex}}</span>
                      <span class="ques-num-sum">/{{questions.length}}</span>
                    </div>
                    <!-- <div class="h5-pcSpace" v-if="!isPC"></div> -->
                    <div class="ques-body" :class="{'h5-ques-body':!isPC}">
                      <div class="ques-text" :class="{'h5-ques-text':!isPC}" v-html="question.question"></div>
                      <div class="op-item" :class="{'h5-op-item':!isPC}" @click="goToNextQuestion(question,'holland', 'A')">
                        <div>
                          A
                        </div>
                        <div>{{question.option_Y}}</div>
                      </div>
                      <div class="op-item" :class="{'h5-op-item':!isPC}" @click="goToNextQuestion(question,'holland' ,'B')">
                        <div>
                          B
                        </div>
                        <div>{{question.option_N}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 专业兴趣测评[profession] -->
              <div v-for="question in questions" :key="question.vForKey" v-if="type==='profession' && currentIndex === question.orderIndex">
                <div class="qac-bigInfo" v-if="question.cate">{{question.cate}}</div>
                <div class="qac-options">
                  <div class="qus-title">
                    <div :class="{'ques-num':isPC}">
                      <span class="ques-num-current">{{question.orderIndex}}</span>
                      <span class="ques-num-sum">/{{questions.length}}</span>
                    </div>
                    <!-- <div class="h5-pcSpace" v-if="!isPC"></div> -->
                    <div class="ques-body" :class="{'h5-ques-body':!isPC}">
                      <div class="ques-text" :class="{'h5-ques-text':!isPC}" v-html="question.question"></div>
                      <div class="op-item" :class="{'h5-op-item':!isPC}" @click="goToNextQuestion(question,'profession', 'A')">
                        <div>
                          A
                        </div>
                        <div>{{question.option_A}}</div>
                      </div>
                      <div class="op-item" :class="{'h5-op-item':!isPC}" @click="goToNextQuestion(question,'profession' ,'B')">
                        <div>
                          B
                        </div>
                        <div>{{question.option_B}}</div>
                      </div>
                      <div class="op-item" :class="{'h5-op-item':!isPC}" @click="goToNextQuestion(question,'profession' ,'C')">
                        <div>
                          C
                        </div>
                        <div>{{question.option_C}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 完成测试题 -->
            <div v-if=" currentIndex > questions.length ">
              <div class="qac-bigInfo">{{'提示'}}</div>
              <div class="qac-options">
                <div class="qus-title">
                  <div class="last-question">
                    已完成所有题目，请点击提交按钮！
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="ques-submit" v-if="currentIndex > questions.length">
            <div class="qs-sbumitBtn" @click="submitPaperAnser">提交</div>
          </div>
        </div>

        <!-- 手机号注册页面 -->
        <div class="signUp-mask" v-if="signUpIf">
          <div class="signUp-form">
            <el-form :model="signUpForm" ref="signUpForm" label-width="80px">
              <el-form-item label="姓名" prop="name" :rules="signUpFormRule.name">
                <el-input v-model.number="signUpForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone" :rules="signUpFormRule.phone">
                <el-input v-model.number="signUpForm.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item class="yzInput" label="验证码" prop="securityCode" :rules="signUpFormRule.securityCode">
                <el-input v-model.number="signUpForm.securityCode" placeholder="请输入验证码"></el-input>
                <el-button type="primary" plain @click="getSecurityCode" :loading="securityBtn.loading">{{securityBtn.text}}</el-button>
              </el-form-item>
              <el-button class="signUp-submitBtn" type="primary" size="medium" @click="phoneSubmit">提&nbsp;&nbsp;交</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { Loading } from "element-ui";
import {
  saveHolland,
  getHolland,
  getMbti,
  saveMbti,
  getMajor,
  saveMajor,
  getPhoneCode
} from "@/api/http.js";
import config from "@/config.js";
import common from "@/common.js";
export default {
  data() {
    // //todo:逻辑待完善， 进入考题页面：必须首先通过点击心里测评页面，否则退回登录
    // if (!Object.keys(this.$route.params).length) {
    //   document.cookie = "zbxk-token= ";
    //   document.cookie = "zbxk-userInfo= ";
    //   localStorage.setItem("zbxk-current-exam ", "");
    //   localStorage.setItem("zbxk-cp-type", "");
    //   this.$router.push({ name: "login" });
    //   return {
    //     signUpIf: false, //手机号注册页面：针对未登录的用户
    //     questions: []
    //   };
    // }

    /**
     * @param:type
     *    mbti: 人格特质测评
     *    holland:职业性却
     *    profession: 专业兴趣测评
     */
    var type = localStorage.getItem("zbxk-cp-type");
    var currentExam = JSON.parse(localStorage.getItem("zbxk-current-exam"));
    var codeTale = {
      mbti: {
        get: getMbti,
        save: saveMbti
      },
      holland: {
        get: getHolland,
        save: saveHolland
      },
      profession: {
        get: getMajor,
        save: saveMajor
      }
    };

    //获取路由查询信息【手机端返回心理测评页面，需要回传查询参数u】
    var fullPath = this.$route.fullPath,
      qpString = "",
      queryArray = [],
      qpObject = {};
    // fullPath.replace(/(?<=(\/main\/psychologicalpaper\s*\?)).*/g, function(
    //   match
    // ) {
    //   qpString = match;
    //   return match;
    // });
    fullPath.replace(/\/main\/psychologicalpaper\s*\?(.*)/g, function(
      match,$1
    ) {
      qpString = $1;
      return match;
    });
    queryArray = qpString ? qpString.split("&") : [];
    if (queryArray.length) {
      queryArray.forEach(function(item) {
        var params = item.split("=");
        ["test_id", "school_id", "sno", "sname"].forEach(function(key) {
          if (item.indexOf(key) !== -1) {
            qpObject[key] = params[1];
          }
        });
      });
    }

    //手机号表单验证
    function isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      return reg.test(str);
    }
    var validPhone = (rule, value, callback) => {
      if (!isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };

    return {
      config,
      apiSet: codeTale[type],
      type,
      userInfo: JSON.parse(localStorage.getItem("zbxk-userInfo")),
      common,
      currentExam,
      getPhoneCodeAPI: getPhoneCode,
      Loading,

      loadingInstance: null,

      //pc文字提示
      isPC: false,

      //记录路由查询参数
      routerInfo: qpObject,

      //手机号注册
      signUpForm: {
        name: "",
        phone: "",
        securityCode: ""
      },
      signUpFormRule: {
        name: [{ required: true, message: "姓名不能为空" }],
        phone: [
          { required: true, message: "手机号不能为空" },
          { type: "number", message: "手机号必须为数字值" },
          { trigger: "change", validator: validPhone }
        ],
        securityCode: [
          { required: true, message: "验证码不能为空" },
          { type: "number", message: "验证码必须为数字值" }
        ]
      },
      securityBtn: {
        loading: false,
        text: "获取验证码"
      },
      signUpIf: false, //手机号注册页面：针对未登录的用户
      questions: [],
      currentIndex: 1, //默认当前题目第一条
      record: {} //选择记录

      // startTest:false, //是否启动假数据
    };
  },
  mounted() {
    var that = this;
    this.$nextTick(function() {
      that.getQuestions();

      // // 测试
      // switch (that.type) {
      //   case "mbti":
      //     that.setMbtiData();
      //     break;
      //   case "holland":
      //     that.setHollandData();
      //     break;
      //   case "profession":
      //     that.setProfessionData();
      //     break;
      // }

      //一定在nextTick中发送事件， 否则layout页面无法接受
      var newTitle = "";
      switch (that.type) {
        case "mbti":
          newTitle = "人格特质测评";
          break;
        case "holland":
          newTitle = "职业兴趣测评";
          break;
        case "profession":
          newTitle = "专业兴趣测评";
          break;
      }
      that.bus.$emit("toChangeTitle", newTitle);

      if (that.common.checkPc()) {
        that.isPC = true;
      }
    });
  },
  methods: {
    //loadings
    loadingOpen: function(text) {
      this.loadingInstance = this.Loading.service({
        fullscreen: true,
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)",
        text: text ? text : "拼命加载中..."
      });
    },
    loadingClose: function() {
      if (
        this.loadingInstance &&
        typeof this.loadingInstance.close === "function"
      ) {
        this.loadingInstance.close();
      }
    },
    //考题保存成功之后，返回心理测评页面【地址有查询参数，要保留】
    backPsychological() {
      //保留地址查询参数，回传
      var params = { name: "psychological" };
      var router_keys = Object.keys(this.routerInfo);
      var routesParamsObj = this.routerInfo;
      if (router_keys.length) {
        params.query = {};
        router_keys.forEach(function(key) {
          params.query[key] = routesParamsObj[key];
        });
      }
      //返回心里测评页面
      this.$router.push(params);
    },

    // 查询数据
    getQuestions() {
      this.loadingOpen("拼命加载中...");
      this.apiSet.get(this.getQueryParam()).then(this.success, this.error);
    },
    //设置查询参数
    getQueryParam() {
      var param = null;
      switch (this.type) {
        case "mbti":
        case "holland":
        case "profession":
          param = {
            // test_id: this.currentExam.test_id,
            // school_id: this.userInfo.school_id

            //假数据
            test_id: 529,
            school_id: 100544
          };
          break;
        default:
          break;
      }
      return param;
    },
    //查询成功回调
    success: function(res) {
      var result = res.data;
      if (result.code == 200) {
        this.querySuccessBack(result.data);
      } else {
        this.$message.error(result.message);
      }
      this.loadingClose();
    },
    //查询异常回调
    error: function(res) {
      this.$message.error("网络异常，请重试，若无效请联系管理员！");
    },
    //查询成功后，设置v-for数据源
    querySuccessBack(source) {
      switch (this.type) {
        case "mbti":
          this.setMbtiData(source);
          break;
        case "holland":
          this.setHollandData(source);
          break;
        case "profession":
          this.setProfessionData(source);
          break;
        default:
          break;
      }
    },
    //设置mbti的考题数据
    setMbtiData(source) {
      // //无接口：假数据测试
      // var source = {
      //   code: 200,
      //   message: "操作成功",
      //   data: window.mbti
      // };
      // source = source.data;

      var _data = [];
      for (var index in source) {
        var item = source[index];
        for (var subIndex in item) {
          if (subIndex === "cate") {
            continue;
          }
          var subQuestion = item[subIndex].question,
            _cate = item.cate || "";
          subQuestion.cate = _cate;
          subQuestion.orderIndex = Number(subIndex);
          subQuestion.question = subQuestion.question
            ? subQuestion.question
            : '<span style="color:#fff;opacity: 0;">无数据</span>';
          _data.push(subQuestion);
        }
      }
      this.editDataQuestions(_data);
    },
    //设置Holland的考题数据
    setHollandData(source) {
      // //无接口：假数据测试
      // var source = {
      //   code: 200,
      //   message: "操作成功",
      //   data: window.holland
      // };
      // source = source.data;

      var _data = [];
      for (var key in source) {
        var subQuestion = source[key].question;
        subQuestion.orderIndex = Number(key);
        subQuestion.question = subQuestion.question
          ? subQuestion.question
          : '<span style="color:#fff;opacity: 0;">无数据</span>';
        _data.push(subQuestion);
      }
      this.editDataQuestions(_data);
    },
    //设置Profession的考题数据
    setProfessionData(source) {
      // //无接口：假数据测试
      // var source = {
      //   code: 200,
      //   message: "操作成功",
      //   data: window.profession
      // };
      // source = source.data;

      var _data = [];
      for (var key in source) {
        var subQuestion = source[key].question;
        subQuestion.orderIndex = Number(key);
        subQuestion.question = subQuestion.question
          ? subQuestion.question
          : '<span style="color:#fff;opacity: 0;">无数据</span>';
        _data.push(subQuestion);
      }
      this.editDataQuestions(_data);
    },
    editDataQuestions: function(source) {
      var _data = source;
      _data.sort(function(pre, next) {
        return pre.orderIndex - next.orderIndex;
      });
      this.questions = this.questions.concat(this.common.tagSource(_data));
      // console.log(_data);
    },

    //下一题:
    goToNextQuestion(data, type, answer) {
      this.currentIndex = data.orderIndex + 1;
      if (this.currentIndex > this.questions.length) {
        //最后一题
        this.$message.info("已完成所有题目，请点击‘提交’按钮!");
      }
      switch (type) {
        case "mbti":
          this.mbtiGoNext(data, answer);
          break;
        case "holland":
          this.hollandGoNext(data, answer);
          break;
        case "profession":
          this.professionGoNext(data, answer);
          break;
        default:
          break;
      }
      // console.log(this.record);
    },
    mbtiGoNext(data, answer) {
      this.commonRecord(data, answer);
    },
    hollandGoNext(data, answer) {
      this.commonRecord(data, answer);
    },
    professionGoNext(data, answer) {
      this.commonRecord(data, answer);
    },
    //答案记录
    commonRecord: function(data, anser) {
      this.record[data.orderIndex] = anser;
    },

    //提交按钮
    submitPaperAnser() {
      // 根据路由参数以及tokoen决定提交方式
      /**
       * 1. 正常登录进来， 路由没有查询参数， 含有token
       * 2. 扫码之后登录， 路由存在查询参数（2个【"test_id", "school_id"】）， 含有token
       * 3. 扫码进来未登录， 路由存在查询参数（2个【"test_id", "school_id"】，）， 没有token
       * 4. 第三方机构拼接地址进来，  路由存在查询参数（4个【"test_id", "school_id", "sno", "sname"】）， 没有token
       */
      var hastoken = this.config.getCookie("zbxk-token") ? true : false,
        routerParams = this.routerInfo,
        routerParamsLength = Object.keys(routerParams).length,
        ifs = hastoken + "&" + routerParamsLength,
        generalParams = JSON.parse(
          localStorage.getItem("zbxk-paperSaveParams")
        );
      switch (ifs) {
        case "true&0":
          this.savePaperAction(generalParams, this.submitSuccess);
          break;
        case "true&2":
          this.savePaperAction(generalParams, this.submitSuccess);
          break;
        case "false&2":
          //todo：判断手机号是否注册
          this.signUpIf = true;
          break;
        case "false&4":
          this.savePaperAction(generalParams, this.submitSuccess);
          break;
      }
    },
    //答案保存
    savePaperAction(params, successBack) {
      var params = params;
      params.record = JSON.stringify(this.record);
      this.loadingOpen("保存中...");
      this.apiSet.save(params).then(successBack, this.error);
    },
    submitSuccess(res) {
      var result = res.data;
      if (result.code == 200) {
        this.loadingClose();
        this.$message.success("提交成功！");
        this.backPsychological(); //返回心理测评页面
      } else {
        this.loadingClose();
        this.$message.error(result.message);
      }
    },
    error() {
      this.loadingClose();
      this.$message.error("请求异常，请联系管理员！");
    },

    /**
     * 手机号注册-保存
     */
    // 获取验证码
    getSecurityCode() {
      var that = this;
      this.$refs.signUpForm.validateField("phone", function(validInfo, valid) {
        var isPhoneValid = !validInfo && !valid ? true : false;
        if (!isPhoneValid) {
          that.$message.warning("请先输入正确的手机号！");
          return;
        } else {
          var seconds = 30;
          that.securityBtn.loading = true;
          that.securityBtn.text = "剩余" + seconds + "秒";
          var _timeout = setInterval(function() {
            seconds--;
            if (seconds === 0) {
              clearInterval(_timeout);
              that.securityBtn.loading = false;
              that.securityBtn.text = "获取验证码";
            } else {
              that.securityBtn.text = "剩余" + seconds + "秒";
            }
          }, 1000);
          //发送验证码
          that
            .getPhoneCodeAPI({
              phone_num: that.signUpForm.phone
            })
            .then(function(res) {
              if (res.data.code === 200) {
                that.$message.success("手机验证码已发送，请查收！");
              }
            }, that.error);
        }
      });
    },
    //手机号注册（保存答案、登录用户）
    phoneSubmit() {
      var that = this;
      this.$refs["signUpForm"].validate(function(valid) {
        if (valid) {
          var generalParams = JSON.parse(
            localStorage.getItem("zbxk-paperSaveParams")
          );

          //手机号注册信息
          generalParams.sno = that.signUpForm.phone;
          generalParams.phone = that.signUpForm.phone;
          generalParams.sms_code = that.signUpForm.securityCode;
          generalParams.username = that.signUpForm.name;
          that.savePaperAction(generalParams, that.phoneSuccessBack);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    phoneSuccessBack(res) {
      var result = res.data;
      if (result.code === 200) {
        //保存成功后自动登录
        this.autoLogin();
      } else {
        this.loadingClose();
        this.$message.error(result.message);
      }
    },
    //保存成功后自动登录
    autoLogin() {
      this.qrloginAPI();
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
          }
          this.loadingClose();
        },
        res => {
          // 获取信息失败
          console.log(res);
          this.loadingClose();
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
      var loginData = {
        account: this.signUpForm.phone,
        password: "666666" //todo:后端登录的初始密码
      };
      this.axios.post(url, loginData, { headers: config.headers }).then(
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
            this.loadingClose();
          }
        },
        res => {
          // 登陆失败回调
          console.log(res);
          this.loadingClose();
        }
      );
    }
  },
  filters: {
    optionFilter(value) {
      function filterAB() {
        return new RegExp("^(\\s*[AB]\\.)", "");
      }
      return (value || "").replace(filterAB(), "");
    }
  }
};
</script>
<style>
/* 微调参数 */
.paddding16 {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px;
}

.paper-container {
  /* height: 100%; */
  padding: 20px;
  box-shadow: 0 0 8px 0 rgba(40, 64, 80, 0.08);
  border-radius: 4px;
  margin: 16px;
  background: #fff;
}
.pac-notic {
  background: #fffcf7;
  border: 1px solid #fbaa00;
  border-radius: 4px;
  font-size: 14px;
  color: #fbaa00;
  letter-spacing: 0;
  line-height: 18px;
  text-align: left;
  padding: 20px;
  margin-bottom: 25px;
}
.pacn-title {
  font-size: 20px;
  color: #fbaa00;
  letter-spacing: 0;
  line-height: 20px;
  margin-bottom: 10px;
}
.pacn-text {
  font-size: 14px;
  color: #fbaa00;
  letter-spacing: 0;
  line-height: 18px;
}

/* 题干区域 */
.question-area {
  text-align: left;
}
.qa-title {
  font-size: 20px;
  color: #284050;
  letter-spacing: 0;
  line-height: 20px;
  margin-bottom: 15px;
}
.qa-content {
  background: #ffffff;
  border: 1px solid #ebefef;
  box-shadow: 0 0 8px 0 rgba(215, 220, 223, 0.5);
  border-radius: 4px;
}
.qac-bigInfo {
  font-size: 16px;
  color: #6d8392;
  letter-spacing: 0;
  line-height: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #ebefef;
}

.qus-title {
  /* padding: 0 68px; */
  min-height: 58px;
  line-height: 28px;
  margin-top: 20px;
  padding-bottom: 88px;
}
.qus-title:after {
  content: "";
  display: block;
  width: 0;
  clear: both;
}
.qus-title > div {
  display: inline-block;
  float: left;
  /* margin-left: 20px; */
}
.ques-num {
  /* width: 44px;
  height: 48px; */
  /* position: absolute;
  margin-left: -45px; */
  padding: 20px;
}
.ques-body {
  margin-left: 10px;
}
.ques-text {
  font-size: 20px;
  color: #284050;
  letter-spacing: 0;
  line-height: 28px;
  margin-top: 20px;
  margin-bottom: 48px;
}
.ques-num-current {
  font-size: 48px;
  color: #4393f7;
  /* line-height: 48px; */
  float: left;
}
.ques-num-sum {
  font-size: 14px;
  color: #6d8392;
  /* line-height: 68px; */
  float: left;
  position: relative;
  bottom: -10px;
}

/* 每个option */
.op-item {
  background: #ffffff;
  border: 1px solid #d7dce0;
  border-radius: 4px;
  padding: 15px 24px;
  margin-bottom: 16px;
  width: 400px;
  box-sizing: border-box;

  /* 文字 */
  font-size: 16px;
  color: #284050;
  letter-spacing: 0;
  line-height: 16px;
  padding-left: 50px;
  position: relative;
}
/* .op-item:after{
    content:'';
    display: block;
    width:0;
    clear: both;
} */
.op-item:hover {
  cursor: pointer;
  background: #4393f7;
  color: #fff;
}
.op-item > div {
  display: inline-block;
  margin-right: 10px;
  /* float: left; */
}
.op-item > div:first-child {
  position: absolute;
  left: 24px;
  top: 18px;
}
.op-item > div:last-child {
  line-height: 22px;
}

.ques-submit {
  margin-top: 50px;
  text-align: center;
}
.qs-sbumitBtn {
  display: inline-block;
  margin: 0 auto;
  background: #4393f7;
  border-radius: 4px;
  padding: 9px 65px;
  color: #fff;
}
.qs-sbumitBtn:hover {
  opacity: 0.8;
  cursor: pointer;
}

/* 最后一题提示 */
.last-question {
  font-size: 16px;
  color: #6d8392;
  letter-spacing: 0;
  line-height: 16px;
  padding: 20px 24px;
  text-align: center;
  margin-bottom: 20px;
}

/* 手机号注册 */
.signUp-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #28405040;
  z-index: 100;
  top: 0;
  left: 0;
}
.signUp-form {
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ebefef;
  width: 100%;
  height: 280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px 10px;
  position: absolute;
}
.signUp-form .el-form {
  position: relative;
  left: -10px;
}
.yzInput .el-form-item__content .el-input {
  display: inline-block;
  width: 53%;
  float: left;
}

.signUp-form .el-button--primary.is-plain {
  width: 45%;
  padding: 12px;
}
.signUp-submitBtn {
  padding-left: 40px;
  padding-right: 40px;
}

/* h5调整样式 */
.h5-ques-text {
  font-size: 1rem;
  margin-bottom: 2rem;
  margin-top: 0.8rem;
}
.h5-op-item {
  width: 100%;
  padding: 0.6rem 1.5rem;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}
.h5-ques-body {
  margin-right: 10px;
}
.h5-qa-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.op-item > div.h5-op-select:first-child {
  left: 0.5rem;
  top: 0.8rem;
}
.h5-qac-bigInfo {
  font-size: 1rem;
  padding: 0.5rem 1.2rem;
  line-height: 1.3rem;
}
.h5-pcSpace {
  clear: both;
}

/* 滚动条微调 */
.paper-answer-scrollBox .mCustomScrollBox {
  overflow: unset;
  overflow-y: hidden;
  overflow-x: unset;
}
.paper-answer-scrollBox .mCSB_inside > .mCSB_container {
  margin-right: 5px;
}
.paper-answer-scrollBox .mCSB_scrollTools {
  right: -15px;
}
</style> 


