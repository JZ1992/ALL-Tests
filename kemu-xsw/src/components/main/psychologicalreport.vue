<template>
  <div class="commonBox" v-loading.fullscreen.lock="reportLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="psb-header">
      <div class="psbt-title psyreport">您的人格测试结果</div>
      <div class="psbt-back" @click='backList'>返回</div>
    </div>
    <div class="psb-content" v-scroll>
      <!-- <div class="psb-content"> -->
      <div class="psy-report-area" v-html="iframeHTML">

      </div>
    </div>
  </div>
</template>

<script>
import { getStuInfo, getReportHtml } from "@/api/http.js";
import common from "@/common.js";
export default {
  // demo 地址 ： http://zbxk.shidaceping.com/reportv2/selectsubject/personH5MBTIReport/testid-327-sid-101736-sno-18969886588-ins-1.shtml
  data() {
    var currentExam = JSON.parse(localStorage.getItem("zbxk-current-exam")),
      stuInfo = JSON.parse(localStorage.getItem("zbxk-paperSaveParams")),
      _type = localStorage.getItem("zbxk-cp-type"),
      param = {
        test_id: currentExam.test_id,
        school_id: currentExam.school_id,
        sno: stuInfo.sno
      },
      _url = common.getReportUrl(_type, param);
    console.log(_url);

    return {
      getStuInfoAPI: getStuInfo,
      getReportHtmlAPI: getReportHtml,
      reportLoading: true,
      common,
      type: _type,

      iframeHTML: "",

      //走班选课 和 学业报告查询参数
      queryReportParams: {
        test_id: currentExam.test_id,
        school_id: currentExam.school_id,
        sno: "todo"
      }
    };
  },
  mounted() {
    var that = this;
    this.$nextTick(function() {
      that.init();
      that.bus.$emit("toChangeTitle", "学业报告");
    });
  },
  methods: {
    backList() {
      this.$router.push({ name: "psychological" });
    },
    //初始化
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
        this.queryReport();
      } else {
        this.reportLoading = false;
        this.$message.error(result.message);
      }
    },
    error() {
      this.reportLoading = false;
      this.$message.error("网络异常，请重试！");
    },

    //查询报告
    queryReport() {
      // var url = 'http://zbxk.cedartest.com/reportv2/selectsubject/personH5MBTIReport/t8969886588-ins-1-tab-1.shtml'; //测试
      var url = this.common.getReportUrl(this.type, this.queryReportParams);
      this.getReportHtmlAPI(url, this.getReortBack, this.error);
    },
    getReortBack(xhr) {
      var html = this.common.filterHTML(xhr.response);
      this.setIframe(html);
      console.log(html);
      this.reportLoading = false;
    },
    //展示报告
    setIframe(html) {
      if (/该考试不存在/g.test(html)) {
        var that= this;
        that.$message.error('你是不是傻？该考试不存在,所有没有报告');
        setTimeout(function(){
          that.$message.error('你是不是傻？该考试不存在,所有没有报告');
        },4500);
      } else {
        this.iframeHTML = html;
      }
    }
  }
};
</script>

<style>
.psbt-title.psyreport::before {
  background: url(../../assets/psyreport.png) no-repeat;
}

/* 正文区域 */
.psc-result-text {
  font-size: 16px;
  color: #284050;
  letter-spacing: 0;
  line-height: 16px;
  margin-bottom: 20px;
}
.psc-result-chart {
  margin-bottom: 20px;
}

.tt-header {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 30px;
}
.tt-key > div {
  display: inline-block;
  margin-right: 10px;
}
</style>
