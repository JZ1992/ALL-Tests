<template>
  <div class="loginBox" v-loading.fullscreen.lock="loading" element-loading-text="登录中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="b-form">
      <div class='b-title'>试达学生入口</div>
      <div>
        <!-- <div class='b-input'>
          <el-input v-model="account" placeholder="请输入账号"></el-input>
          <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
        </div>
        <el-checkbox class="b-check" v-model="isRemember">记住账号</el-checkbox> -->

        <div class='b-input'>
          <el-form :model="loginForm" ref="loginForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="account" :rules="loginFormRules.account">
              <el-input v-model="loginForm.account" placeholder="请输入账号" @keyup.enter.native="submit"></el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="loginFormRules.password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="submit"></el-input>
            </el-form-item>
          </el-form>
        </div>

      </div>
      <div class='b-login' @click="submit">登&nbsp;录</div>
      <div class='b-tip'>登陆问题请联系学校管理员：15963367879</div>
    </div>
  </div>
</template>

<script>
import config from "@/config.js";
import axios from "axios";
export default {
  data() {
    var checkNumber = function(rule, value, callback) {
      function isNum(){
        return new RegExp('\\D','g');
      }
      if (isNum().test(value)) {
        callback(new Error("账号只能是数字"));
      } else {
        callback();
      }

    };
    return {
      config: config,
      axios: axios,

      loading: false,
      account: "",
      password: "",
      loginForm: {
        account: "",
        password: ""
      },
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
  mounted() {},
  methods: {
    // 测试------
    // 账号：18556823593
    // 密码：666666ab

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
            localStorage.setItem("zbxk-userInfo", JSON.stringify(data.data));
            that.$router.replace({ name: "main" });
          } else {
            that.$message.error(data.message);
          }
          this.loading = false;
        },
        res => {
          // 获取信息失败
          console.log(res);
          this.loading = false;
        }
      );
    },
    //登录接口
    loginAPI() {
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
    },
    submit() {
      var that = this;
      this.$refs["loginForm"].validate(function(valid) {
        if (valid) {
          that.loginAPI();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
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

/* element样式微调 */
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: inherit !important;
}
/* .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.2) !important;
} */
</style>


