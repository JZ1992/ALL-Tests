<template>
  <div class="commonBox" v-loading.fullscreen.lock="settingLoading" element-loading-text="保存中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="psb-header">
      <div class="psbt-title usericon">账号信息</div>
      <div class="psbt-back" @click='backList'>返回</div>
    </div>
    <div class="psb-content">
      <div class="psc-form">
        <div class="psdf-row">
          <div class="psdfr-name">姓名</div>
          <div class="psdfr-value">{{name||'暂无'}}</div>
        </div>
        <!-- <div class="psdf-row">
          <div class="psdfr-name">学号</div>
          <div class="psdfr-value">320124199200506323</div>
        </div> -->
        <div class="psdf-row">
          <div class="psdfr-name">账号</div>
          <div class="psdfr-value">{{account||'暂无'}}</div>
        </div>
        <div class="psdf-row">
          <div class="psdfr-name">手机号</div>
          <div v-if="phoneIf" class="psdfr-value">{{tel}}</div>
          <div v-if="phoneIf" class="psdfr-modify psdr-btn-box " @click="changStatus('phoneIf','edit')">修改号码</div>

          <!-- 修改 -->
          <div v-if="!phoneIf" class="psdfr-editvalue ">
            <el-input class="editInputClass" type="text" v-model="editPhone" placeholder="请输入新手机号"></el-input>
          </div>
          <div v-if="!phoneIf" class="psdfr-save psdr-btn-box " @click="changStatus('phoneIf','save')">保存</div>
          <div v-if="!phoneIf" class="psdfr-cancel psdr-btn-box" @click="changStatus('phoneIf', 'cancel')">取消</div>
        </div>
        <div class="psdf-row">
          <div class="psdfr-name">密码</div>
          <div v-if="passwordIf" class="psdfr-value">***************</div>
          <div v-if="passwordIf" class="psdfr-modify psdr-btn-box " @click="changStatus('passwordIf','edit')">修改密码</div>

          <!-- 修改:存在表单验证 -->
          <!-- <el-form :model="passwordForm" ref="passwordForm" style="display:inline-block;">
            <div v-if="!passwordIf" class="psdfr-editvalue passwordDiv">
              <el-form-item prop="oldPassword" :rules="[{ required: true, message: '旧密码不能为空'}]">
                <el-input class="editInputClass" type="password" v-model="passwordForm.oldPassword" placeholder="请输入旧密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item prop="password" :rules="[{ required: true, message: '请输入新密码旧密码不能为空'}]">
                <el-input class="editInputClass" type="password" v-model="passwordForm.editPassword" placeholder="请输入新密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item prop="repeatPassword" :rules="[{ required: true, message: '年龄不能为空'}]">
                <el-input class="editInputClass" type="password" v-model="passwordForm.repeatPassword" placeholder="重复输入新密码" auto-complete="off"></el-input>
              </el-form-item>
              <div class="inblock">
                <div v-if="!passwordIf" class="psdfr-save psdr-btn-box" @click="changStatus('passwordIf','save')">保存</div>
                <div v-if="!passwordIf" class="psdfr-cancel psdr-btn-box" @click="changStatus('passwordIf','cancel')">取消</div>
              </div>
            </div>
          </el-form> -->

          <!-- 修改: 无验证 -->
          <div v-if="!passwordIf" class="psdfr-editvalue passwordDiv">
            <el-input class="editInputClass" type="password" v-model="oldPassword" placeholder="请输入旧密码"></el-input>
            <el-input class="editInputClass newPassword" type="password" v-model="editPassword" placeholder="请输入新密码"></el-input>
            <el-input class="editInputClass repeatNewPassword" type="password" v-model="repeatPassword" placeholder="重复输入新密码"></el-input>
            <div class="inblock">
              <div v-if="!passwordIf" class="psdfr-save psdr-btn-box" @click="changStatus('passwordIf','save')">保存</div>
              <div v-if="!passwordIf" class="psdfr-cancel psdr-btn-box" @click="changStatus('passwordIf','cancel')">取消</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/config.js";
import { saveGeneralInfo, savePassword } from "@/api/http.js";
export default {
  data() {
    var userInfo = JSON.parse(localStorage.getItem("zbxk-userInfo"));
    return {
      config,
      userInfo,
      tel: userInfo.tel,
      name: userInfo.name,
      account: userInfo.account,
      saveGeneralInfo,
      savePasswordAPI: savePassword,

      settingLoading: false,
      phoneIf: true,
      passwordIf: true,
      editPhone: "",
      editPassword: "",
      repeatPassword: "",
      oldPassword: "",
      password: "",
      passwordForm: {
        oldPassword: "",
        editPassword: "",
        repeatPassword: ""
      }
    };
  },
  mounted() {
    this.phoneIf = true;
    this.passwordIf = true;
  },
  methods: {
    backList() {
      this.$router.push({ name: "examlist" });
    },
    changStatus(inputName, status) {
      //  true: 不可编辑
      //  false: 编辑
      var boolean = false;
      switch (inputName + "-" + status) {
        case "phoneIf-edit":
          boolean = false;
          break;
        case "phoneIf-save":
          boolean = true;
          this.tel = this.editPhone;
          this.editPhone = "";
          this.savePhone();
          break;
        case "phoneIf-cancel":
          boolean = true;
          this.editPhone = "";
          break;
        case "passwordIf-edit":
          boolean = false;
          break;
        case "passwordIf-save":
          boolean = true;
          this.password = this.editPassword;
          this.editPassword = "";
          this.savePassword();
          break;
        case "passwordIf-cancel":
          boolean = true;
          this.editPassword = "";
          break;
        default:
          break;
      }
      // 修改显示状态
      this[inputName] = boolean;
    },
    //保存手机号:ps.如果手机号就是账号，修改手机号之后，登录账号需要同步修改，产品没考虑问题， 后期需要完善
    /**
     * 16688884444
     * 18556823593
     */
    savePhone() {
      var that = this;
      that.userInfo.tel = that.tel;
      that.settingLoading = true;
      that
        .saveGeneralInfo({
          user_id: that.userInfo.user_id,
          tel: that.tel
        })
        .then(
          function(res) {
            var result = res.data;
            if (result.code == 200) {
              localStorage.setItem("zbxk-userInfo",JSON.stringify(that.userInfo)); 
              that.$message({
                message: "手机号修改成功",
                type: "success"
              });
            } else {
              that.$message.error(result.message);
            }
            that.settingLoading = false;
          },
          function(res) {
            that.settingLoading = false;
            that.$message.error("修改失败");
          }
        );
    },
    savePassword() {
      var that = this;
      var param = {
        old_password: that.oldPassword,
        new_password: that.password,
        new_password_repeat: that.repeatPassword
      };
      that.oldPassword = that.editPassword = that.repeatPassword = "";
      that.settingLoading = true;
      that.savePasswordAPI(param).then(
        function(res) {
          var result = res.data;
          if (result.code == 200) {
            that.$message({
              message: "密码修改成功",
              type: "success"
            });
          } else {
            that.$message.error(result.message);
          }
          that.settingLoading = false;
        },
        function(res) {
          that.settingLoading = false;
          that.$message.error("修改失败");
        }
      );
    }
  }
};
</script>
<style>
.psbt-title.usericon::before {
  background: url(../../assets/userinfo.png) no-repeat;
}

/* 账号信息 */
.psc-form {
  padding-top: 33px;
}
.psdf-row {
  margin-bottom: 40px;
}
.psdf-row > div {
  display: inline-block;
}
.psdfr-name {
  width: 64px;
  text-align: right;
  font-size: 16px;
  color: #6d8392;
  letter-spacing: 0;
  line-height: 16px;
}

.psdfr-value {
  padding-left: 32px;
  font-size: 16px;
  color: #284050;
  letter-spacing: 0;
  line-height: 16px;
  min-width: 145px;
}
.psdfr-editvalue {
  padding-left: 32px;
  font-size: 16px;
  color: #284050;
  letter-spacing: 0;
  line-height: 16px;
  min-width: 145px;
}

.psdr-btn-box {
  font-size: 14px;
  text-align: center;
  line-height: 14px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 0;
  width: 80px;
}
.psdfr-modify {
  color: #4393f7;
  border: 1px solid #4393f7;
}
.psdfr-modify:hover {
  background: #4393f7;
  cursor: pointer;
  color: #fff;
}
.psdfr-save {
  color: #fff;
  border: 1px solid #4393f7;
  background: #4393f7;
  margin-right: 5px;
}
.psdfr-cancel {
  color: #284050;
  border: 1px solid #d7dce0;
}
.psdfr-save:hover,
.psdfr-cancel:hover {
  cursor: pointer;
  opacity: 0.8;
}
.editInputClass {
  width: 140px !important;
  height: 32px !important;
  box-sizing: border-box;
}
.editInputClass > input {
  height: 32px !important;
  line-height: 32px !important;
}

div.passwordDiv {
  /* position: relative; */
  display: inline-flex;
  flex-direction: column;
}
div.passwordDiv > div {
  margin-bottom: 10px;
}
div.inblock > div {
  display: inline-block;
}

/* 微调参数 */
.marginR5 {
  /* margin-right: 5px; */
}
</style>


