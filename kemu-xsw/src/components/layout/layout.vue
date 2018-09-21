<template>
  <!-- 
    element-ui 布局
    <el-container class="height100">
    <el-header height="64">
      <img class="header-logo" src="../../assets/xswlogo.png">
      <e-user></e-user>
    </el-header>
    <el-main>
      <e-main></e-main>
    </el-main>
  </el-container> -->

  <div class="layout-box">
    <layout-header>
      <img class="header-logo" src="../../assets/xswlogo.png" v-if="isPc">
      <div class="header-logo h5-back" v-if="!isPc" @click="h5GoBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="h5-header-title" v-if="!isPc">{{moduleName}}</div>

      <e-user v-if="isPc"></e-user>
    </layout-header>
    <layout-main>
    </layout-main>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="100%"  left>
      <span left>确认退出登录么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
// import eMain from "@/components/layout/main";
// import eUser from "@/components/layout/userInfo";

import layoutHeader from "@/components/layout/layout-header";
import layoutMain from "@/components/layout/layout-main";
import eUser from "@/components/layout/userInfo";
import common from "@/common.js";
import config from "@/config.js";

export default {
  data() {
    return {
      common,
      isPc: false,
      moduleName: "",

      //移动端退出登录
      dialogVisible:false,
    };
  },
  components: {
    layoutHeader,
    layoutMain,
    eUser
  },
  // beforeRouteUpdate(to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  //   this.moduleName = config.moduleCodeTable[to.name];
  //   next();
  // },
  beforeRouteEnter(to, from, next) {
    // //考题页面，单独处理显示
    // if (to.name !== "psychologicalpaper") {
    //   window.moduleName = config.moduleCodeTable[to.name];
    // } else {
    //   var type = localStorage.getItem("zbxk-cp-type");
    //   var _name = "";
    //   switch (type) {
    //     case "mbti":
    //       _name = "人格特质测评";
    //       break;
    //     case "holland":
    //       _name = "职业兴趣测评";
    //       break;
    //     case "profession":
    //       _name = "专业兴趣测评";
    //       break;
    //   }
    //   window.moduleName = _name;
    // }

    next(vm => {
      // 通过 `vm` 访问组件实例
      // a.moduleName = config.moduleCodeTable[to.name];
    });
  },
  mounted() {
    var _this = this;
    if (common.checkPc()) {
      _this.isPc = true;
    }
    this.busEvents();
    this.$nextTick(function() {
      // _this.$router.push({ name: "examlist" });
    });
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "routeChange"
  },
  methods: {
    busEvents() {
      var that = this;
      this.bus.$on("toChangeTitle", function(title) {
        that.moduleName = title;
      });
      this.bus.$on("examHideBack", function(title) {
        that.moduleName = title;
      });
    },
    logout(){
        this.common.logoutClear();
        this.$router.push({ name: "login" });
    },

    routeChange: function() {
      // //考题页面，单独处理显示
      // if (this.$route.name !== "psychologicalpaper") {
      //   this.moduleName = config.moduleCodeTable[this.$route.name];
      // } else {
      //   var type = localStorage.getItem("zbxk-cp-type");
      //   var _name = "";
      //   switch (type) {
      //     case "mbti":
      //       _name = "人格特质测评";
      //       break;
      //     case "holland":
      //       _name = "职业兴趣";
      //       break;
      //     case "profession":
      //       _name = "专业兴趣测评";
      //       break;
      //   }
      //   this.moduleName = _name;
      // }
    },
    h5GoBack: function() {
      if (this.moduleName === "选课定向") {
        this.$router.push({ name: "examlist" });
      } else if (this.moduleName === "考试列表") {
        this.dialogVisible = true;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style>
.layout-box {
  height: 100%;
  position: relative;

  /* 头部位置 */
  padding-top: 64px;
}

.header-logo {
  position: absolute;
  left: 16px;
  top: 16px;
}

/* 通用样式 */
/* 容器 */
.commonBox {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 64px;
}

.psb-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #ebefef;
}

/* 头部 */
.psbt-title {
  font-size: 20px;
  color: #284050;
  position: absolute;
  top: 20px;
  left: 55px;
}
.psbt-title::before {
  content: "";
  display: inline-block;
  position: absolute;
  margin-left: -28px;
  margin-top: 2px;
  width: 30px;
  height: 30px;
}
.psbt-back {
  position: absolute;
  font-size: 14px;
  color: #284050;
  text-align: center;
  padding: 7px 35px;
  border: 1px solid #d7dce0;
  border-radius: 4px;
  right: 10px;
  top: 15px;
}
.psbt-back:hover {
  cursor: pointer;
  background: #284050;
  color: #fff;
  opacity: 0.8;
}
/* 内容 */
.psb-content {
  text-align: left;
  padding: 16px;
  height: 100%;
}

/* pc手机样式 */
.h5-back {
  top: 25px;
}
.h5-header-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>



<!-- 
element-ui 布局
<style>
.height100 {
  height: 100%;
}

.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  height: 64px;
}

.el-header .header-logo {
  position: absolute;
  left: 16px;
  top: 16px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;

  line-height: 200px;
}

.el-main {
  background-color: #ebefef;
  color: #333;
  text-align: center;
  padding: 0;
  position: relative;
  display: flex;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/* 通用样式 */
/* 容器 */
.psb-header {
  flex: none;
  height: 64px;
  border-bottom: 1px solid #ebefef;
}
.psb-content {
  flex: auto;
}

/* 头部 */
.psbt-title {
  font-size: 20px;
  color: #284050;
  position: absolute;
  top: 35px;
  left: 60px;
}
.psbt-title::before {
  content: "";
  display: inline-block;
  position: absolute;
  margin-left: -28px;
  margin-top: 2px;
  width: 30px;
  height: 30px;
}
.psbt-back {
  position: absolute;
  font-size: 14px;
  color: #284050;
  text-align: center;
  padding: 7px 35px;
  border: 1px solid #d7dce0;
  border-radius: 4px;
  right: 30px;
  top: 30px;
}
.psbt-back:hover {
  cursor: pointer;
  background: #284050;
  color: #fff;
  opacity: 0.8;
}
/* 内容 */
.psb-content {
  text-align: left;
  padding: 16px;
}
</style>
-->





