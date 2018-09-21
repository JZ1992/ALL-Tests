<template>
  <div class="commonBox" v-loading.fullscreen.lock="reportLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="psb-header">
      <div class="psbt-title watchreport">查看报告</div>
      <div class="psbt-back" @click='backList'>返回</div>

      <div class="reportArea pc-reportArea" v-if="isPC">
        <div :class="{'rtActive': currentType === 0}" v-if="reportBtn.person_zbxk" @click="shiftReport(0)">走班选课报告</div>
        <div :class="{'rtActive': currentType === 1}" v-if="reportBtn.person" @click="shiftReport(1)">学业报告</div>
        <div :class="{'rtActive': currentType === 2}" v-if="reportBtn.mbti" @click="shiftReport(2)">MBTI</div>
        <div :class="{'rtActive': currentType === 3}" v-if="reportBtn.holland" @click="shiftReport(3)">霍兰德</div>
        <div class="noAllow" v-if="isZbxk">专业兴趣报告</div>
      </div>

    </div>

    <div class="psb-content" v-scroll>
      <div>
        <div class="reportArea" v-if="!isPC">
          <div :class="{'rtActive': currentType === 0}" v-if="reportBtn.person_zbxk" @click="shiftReport(0)">走班选课报告</div>
          <div :class="{'rtActive': currentType === 1}" v-if="reportBtn.person" @click="shiftReport(1)">学业报告</div>
          <div :class="{'rtActive': currentType === 2}" v-if="reportBtn.mbti" @click="shiftReport(2)">MBTI</div>
          <div :class="{'rtActive': currentType === 3}" v-if="reportBtn.holland" @click="shiftReport(3)">霍兰德</div>
          <div class="noAllow" v-if="isZbxk">专业兴趣报告</div>
        </div>
        <div class="h5-con-btns" v-if="!isPC">
          <div class="cb-download">下载</div>
          <div class="cb-preview">预览</div>
        </div>

        <div class="con-btns" v-if="isPC">
          <div class="cb-download" @click='btnAction("download")'>下载</div>
          <div class="cb-preview" @click='btnAction("preview")'>预览</div>
        </div>

        <div class="con-reportInfo-area" style="height:100%;">

          <a :href="iframeUrl" target="_blank">PS：报告地址请点击这里;样式待调整</a>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getZbxkReport,
  getStuInfo,
  getReportHtml,
  getStuPersonReport,
  checkPsyStatus
} from "@/api/http.js";
import common from "@/common.js";
export default {
  /**
   *
   *  走班选课 demo地址： http://institute.cedartest.com/reportv2/selectsubject/peasonreport/gread-9-class-1-testid-763-sid-100544-subject-01-id-2669-print-1.shtml
   *  霍兰德 demo地址： http://zbxk.shidaceping.com/reportv2/selectsubject/personH5HollandReport/testid-327-sid-101736-sno-18969886588-ins-1-tab-1.shtml
   *  MBTI demo地址： http://zbxk.shidaceping.com/reportv2/selectsubject/personH5MBTIReport/testid-327-sid-101736-sno-18969886588-ins-1-tab-1.shtml
   */

  data() {
    var currentExam = JSON.parse(localStorage.getItem("zbxk-current-exam")),
      isZbxk,
      currentType;
    if (["1", "3", "4"].indexOf(currentExam.test_type) !== -1) {
      isZbxk = true;
      currentType = 0;
    } else {
      isZbxk = true;
      currentType = 1;
    }

    /**
     * initBtn
     *    0 :走班选课报告
     *    1 ：学业报告
     *    2 :MBTI
     *    3 ：霍兰德
     */
    return {
      getStuInfoAPI: getStuInfo,
      getZbxkReportAPI: getZbxkReport,
      getStuPersonReportAPI: getStuPersonReport,
      reportLoading: true,
      checkPsyStatus,
      getReportHtml,
      common,

      iframeUrl: "",
      isPC: false,
      isZbxk, //是否是‘走班选课’， 不是走班选课， 只显示‘学业报告’
      currentType,

      //走班选课 和 学业报告查询参数
      queryReportParams: {
        test_id: currentExam.test_id,
        school_id: currentExam.school_id,
        sno: "todo"
      },

      //报告是否显示
      reportBtn: {
        person_zbxk: false,
        person: false,
        mbti: false,
        holland: false
      },

      //报告地址
      reportUrl: {
        person_zbxk: "", //走班选课
        person: "", //学业报告
        mbti: "", //mbti报告
        holland: "" //holland报告
      }
    };
  },
  mounted() {
    var that = this;

    this.$nextTick(function() {
      if (common.checkPc()) {
        that.isPC = true;
      }
      that.init();
      //一定在nextTick中发送事件， 否则layout页面无法接受
      that.bus.$emit("toChangeTitle", "查看报告");
    });
  },
  methods: {
    backList() {
      this.$router.push({ name: "examlist" });
    },
    //初始化【获取sno】
    init() {
      var examInfo = JSON.parse(localStorage.getItem("zbxk-current-exam"));
      this.getStuInfoAPI({ school_id: examInfo.school_id }).then(
        this.success,
        this.error
      );
    },
    success(res) {
      var result = res.data;
      if (result.code === 200) {
        this.queryReportParams.sno = result.data.student_no;
        this.getReport();
      } else {
        this.reportLoading = false;
        this.$message.error(result.message);
      }
    },
    error() {
      this.reportLoading = false;
      this.$message.error("网络异常，请重试！");
    },

    //获取报告
    getReport() {
      this.checkPsyStatus(this.queryReportParams).then(
        this.checkSuccess,
        this.error
      );
      // if (this.isZbxk) {
      //   //走班选课模式下， 设置mbti和holland的报告地址
      //   this.reportUrl.mbti = "";
      //   this.reportUrl.holland = "";
      // }
      // this.shiftReportAction();
    },
    checkSuccess(res) {
      var result = res.data;
      if (result.code === 200) {
        this.reportBtn.zbxk = result.person_zbxk;
        this.reportBtn.person = result.person;
        this.reportBtn.mbti = result.mbti;
        this.reportBtn.holland = result.holland;
        this.initSetReport();
      } else {
        this.$message.error(result.message);
      }
      this.reportLoading = false;
    },

    //初始查询设置报告
    initSetReport() {
      //报告设置
      if (this.reportBtn.zbxk) {
        this.queryReport();
      }
      if (this.reportBtn.person) {
        this.queryPersonReport();
      }

      // if(this.reportBtn.mbti){
      // }
      // if( this.reportBtn.holland ){
      // }

      if (this.reportBtn.zbxk) {
        this.shiftReport(0);
      } else if (this.reportBtn.person) {
        this.shiftReport(1);
      } else if (this.reportBtn.mbti) {
        this.shiftReport(2);
      } else if (this.reportBtn.holland) {
        this.shiftReport(3);
      } else {
        this.$message.warning("抱歉， 您未参加任何一门考试， 不存在报告！");
      }
    },

    /**
     *  //走班选课报告
     */
    queryReport() {
      this.reportLoading = true;
      this.getZbxkReportAPI(this.queryReportParams).then(
        this.getReortBack,
        this.error
      );
    },
    getReortBack(res) {
      var result = res.data;
      if (result.code === 200) {
        //todo:数据结构
        var url = result.data.url;
        this.reportUrl.person_zbxk = url;
      } else {
        this.$message.error(result.message);
      }
      this.reportLoading = false;
    },

    //展示报告
    setIfram(url) {
      this.iframeUrl = url;
    },

    /**
     *  学业报告
     */
    queryPersonReport() {
      this.reportLoading = true;
      this.getStuPersonReportAPI(this.queryReportParams).then(
        this.getStuReortBack,
        this.error
      );
    },
    getStuReortBack(res) {
      var result = res.data;
      if (result.code === 200) {
        //todo:数据结构
        var url = result.data.url;
        this.reportUrl.person = url;
      } else {
        this.reportLoading = false;
        this.$message.error(result.message);
      }
    },

    // todo:切换报告
    shiftReport(type) {
      this.currentType = type;
      this.shiftReportAction();
    },

    //切换报告的具体操作
    shiftReportAction() {
      switch (this.currentType) {
        //走班选课报告
        case 0:
          this.iframeUrl = this.reportUrl.person_zbxk;
          break;
        //学业报告
        case 1:
          this.iframeUrl = this.reportUrl.person;
          break;
        //MBTI
        case 2:
          var url = this.common.getReportUrl("mbti", this.queryReportParams);
          this.iframeUrl = url;
          break;
        //霍兰德
        case 3:
          var url = this.common.getReportUrl("holland", this.queryReportParams);
          this.iframeUrl = url;
          break;
      }
    },

    //todo:打印&预览
    btnAction(type) {
      switch (type) {
        case "download":
          alert("未调接口");
          break;
        case "preview":
          window.open(this.iframeUrl);
          break;
      }
    }
  }
};
</script>
<style>
.psbt-title.watchreport::before {
  background: url(../../assets/watchreport.png) no-repeat;
}

/* 报告切换区域 */
.reportArea {
  /* margin-left: 160px;*/
  text-align: left;
  margin-bottom: 20px;
}
.reportArea > div {
  margin-top: 16px;
  margin-right: 5px;
  display: inline-block;
  font-size: 14px;
  color: #284050;
  text-align: center;
  line-height: 35px;
  box-sizing: border-box;
  width: 140px;
  text-align: center;
  height: 35px;
  border: 1px solid #d7dce0;
  border-radius: 4px;
}
.reportArea > div.rtActive {
  border: none;
  background: #4493f7;
  color: #fff;
}
.reportArea > div:hover {
  background: #4493f7;
  color: #fff;
  opacity: 0.7;
  cursor: pointer;
}
.reportArea > div.noAllow {
  background: #d7dce0;
  color: #fff;
  cursor: not-allowed;
  opacity: 1;
}

.con-btns {
  /* position: absolute;
  right: 30px;
  margin-top: 20px; */

  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
.con-btns > div {
  display: inline-block;
  width: 96px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  margin-left: 5px;
  background: #4393f7;
  border-radius: 4px;
}
.con-btns > div:hover {
  cursor: pointer;
  opacity: 0.8;
}

/* pc 手机端样式 */
.pc-reportArea {
  margin-left: 160px;
}
.h5-con-btns {
  /* position: absolute;
  right: 30px;
  margin-top: 20px; */
  margin-bottom: 20px;
}
.h5-con-btns > div {
  display: inline-block;
  width: 96px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  margin-left: 5px;
  background: #4393f7;
  border-radius: 4px;
}
</style>

