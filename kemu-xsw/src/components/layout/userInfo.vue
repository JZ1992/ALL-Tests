<template>
  <div class="user-info">
    <el-dropdown trigger="click" @command='setting'>
      <span class="el-dropdown-link">
        {{userName}}
        <i class="zm-top-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='setting'>设置</el-dropdown-item>
        <el-dropdown-item command='logout'>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import config from "@/config.js";
import common from "@/common.js";
export default {
  mounted() {},
  data() {
    return {
      config:config,
      userName: JSON.parse(localStorage.getItem('zbxk-userInfo')||'{}').name
    };
  },
  methods: {
    setting(command) {
      switch (command) {
        //设置
        case "setting":
          this.$router.push({ name: "setting" });
          break;
        //注销登录
        case "logout":
          common.logoutClear();
          this.$router.replace({ path: "/" });
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style>
.user-info {
  float: right;
  line-height: 60px;
  cursor: pointer;
  margin-right: 10px;
}
.el-dropdown {
  font-size: 16px;
}

.zm-top-down {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: url(../../assets/topdown.png) no-repeat;
}
</style>


