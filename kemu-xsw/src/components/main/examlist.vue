<template>
  <div class="commonBox" v-loading.fullscreen.lock="examListLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="psb-header">
      <div class="psbt-title examlistIcon">考试列表</div>
    </div>
    <div class='psb-content' :class="{'noSourceBg':!examList.length && isPC,'s-noSourceBg':!examList.length && !isPC}" v-scroll="scrollSetting">
      <div>
        <div class="mlc-box" v-for="(item, index) in examList" :key="index">
          <div class="mlcb-date" v-if="bigTitleDisplay(index,  index-1 , examList)">{{item.test_date | dateformat({type:'ym'}) }}</div>
          <div class="mc-exam">
            <div class='mlcb-content'>
              <div class='mlcbc-exam-name' :class="{'pc-class':isPC}">【todo:走班选课】 {{item.name}}</div>
              <div class='mlcbc-exam-info'>
                <div>创建人： {{item.teacher_name}}</div>
                <div style="clear:both;" v-if="!isPC"></div>
                <div>考试时间：{{item.test_date| dateformat({type:'ymd'})}} - {{item.test_date_end| dateformat({type:'ymd'})}}</div>
                <div v-if="isPC">考试班级：{{item.class_num||'0'}}个</div>
                <div class='mei-con' v-if="isPC">
                  <div class="item-subject">考试科目：</div>
                  <div class="item-list">{{item.subject | subjectformat}}</div>
                </div>
              </div>
              <div class='mlcbc-action-btn specialbtn'>

                <!-- <div v-if="!index" @click="goPsychological(item,'')">进入测评</div>
                <div v-if="index" :class="canGoPsy(item)" @click="goPsychological(item, canGoPsy(item))">进入测评</div> -->

                <div :class="canGoPsy(item)" @click="goPsychological(item, canGoPsy(item))">进入测评</div>

                <div @click="goReport(item)">查看报告</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { getExamList } from "@/api/http.js";
import config from "@/config.js";
import common from "@/common.js";
export default {
  data() {
    var scrollSetting = this.getScrollSetting();
    return {
      getExamList,
      config,
      common,

      isPC: false, //pc显示班级和科目详情

      examListLoading: false,
      examList: [],
      scrollSetting: scrollSetting,
      queryParam: {
        token: config.getCookie("zbxk-token"),
        pagenow: 1,
        total: null
      }
    };
  },
  mounted() {
    var that = this;
    this.$nextTick(function() {
      that.getExamListAPI();

      //一定在nextTick中发送事件， 否则layout页面无法接受
      that.bus.$emit("toChangeTitle", "考试列表");
    });
  },
  methods: {
    // //考试列表页，需要登录才可以查看
    // checkLogin(){

    // },

    //页面跳转
    goPsychological(data, nogo) {
      if (nogo) {
        return;
      }
      localStorage.setItem("zbxk-current-exam", JSON.stringify(data));
      // this.$router.push({
      //   name: "psychological",
      //   query: {
      //     test_id: 693,
      //     school_id: 100544,
      //     // sname: "afadsf",
      //     // sno: "324234"
      //   }
      // });
      this.$router.push({ name: "psychological" });
    },
    goReport(data) {
      localStorage.setItem("zbxk-current-exam", JSON.stringify(data));
      this.$router.push({ name: "examreport" });
    },

    //获取列表数据
    getExamListAPI(isAdd) {
      var that = this;
      that.examListLoading = true;
      this.getExamList(that.queryParam).then(
        //成功
        function(result) {
          var _JSON = result.data;
          if (_JSON.code == 200) {
            
            // if (!isAdd) {
            //   var _array = common.tagSource(_JSON.data.tests);
            //   _array.forEach(function(item) {
            //     that.examList.push(item);
            //   });
            // } else {
            //   // that.examList
            // }

            var _array = common.tagSource(_JSON.data.tests);
            _array.forEach(function(item) {
              that.examList.push(item);
            });
            //更新总页码
            that.queryParam.total = _JSON.data.total_count;
          } else {
            that.$message({
              message: _JSON.message,
              type: "warning"
            });
          }

          that.examListLoading = false;
          // setTimeout(function() {
          //   that.examListLoading = false;
          // }, 500);
          //判断是否为手机显示调整样式
          setTimeout(function() {
            if (!common.checkPc()) {
              that.SetPhonecss();
              return;
            }
            that.isPC = true;
          }, 100);
        },
        function(result) {
          //异常
          console.log(result);
          that.examListLoading = false;
        }
      );
    },

    //滚动条指令：配置
    getScrollSetting: function() {
      var that = this;
      return {
        callbacks: {
          //接近底部：自动查询
          whileScrolling: function() {
            //this.mcs: 这个参数包含了位置信息
            if (
              !that.examListLoading &&
              this.mcs.topPct > 90 &&
              that.queryParam.pagenow < that.queryParam.total
            ) {
              that.scrollSetting.$el.mCustomScrollbar("stop");
              that.queryParam.pagenow++;
              that.getExamListAPI(true);
            }
          }
        }
      };
    },

    //年月标题：显示过滤（连续信息， 同一年同一月只显示一个）
    bigTitleDisplay: function(currentIndex, preIndex, examList) {
      var display = true;
      if (currentIndex) {
        var currentDate = new Date(Number(examList[currentIndex].test_date)),
          preDate = new Date(Number(examList[preIndex].test_date));
        if (
          currentDate.getFullYear() === preDate.getFullYear() &&
          currentDate.getMonth() === preDate.getMonth()
        ) {
          display = false;
        }
      }
      return display;
    },
    //手机端样式设置
    SetPhonecss: function(value) {
      var Btnlist = document.getElementsByClassName("specialbtn");
      for (var i = 0; i < Btnlist.length; i++) {
        Btnlist[i].classList.add("mlcbc-action-btnmoblie");
      }
    },

    //进入测评能否点击
    canGoPsy: function(source) {
      var _class =
        source &&
        Number(source.status) < 7 &&
        ["1", "3", "4"].indexOf(source.test_type) !== -1
          ? ""
          : "pib-btn-disable";
      return _class;
    }
  },
  filters: {
    //日期过滤器
    dateformat: function(value, formtype) {
      /**
       *
       * @param
       *  value：默认解析 日期毫秒，todo：其他方向配置
       *  formtype: Object类型
       *          {
       *            splitStr: 分割字符，默认'/'； 例如'/' 或者 '-'等等
       *            type: 显示顺序, 默认‘ymd’, 不区分大小写，例如'mdy'表示'月日年'， 'dmy'代表‘日月年’
       *          }
       */

      //设置日期
      function setDate(time, _type, splitStr) {
        var date_array = [],
          return_array = [];
        ["Y", "M", "D"].forEach(function(dateStr) {
          var date_index = getIndex(_type, getDateReg(dateStr));
          if (date_index !== -1) {
            date_array.push({
              type: dateStr,
              order: date_index,
              date_string: setYMD(time, dateStr)
            });
          }
        });
        date_array.sort(function(pre, next) {
          return pre.order - next.order;
        });
        return_array = date_array.map(function(daItem) {
          return daItem.date_string;
        });
        return return_array.join(splitStr);
      }

      //年月日正则
      function getDateReg(param) {
        return new RegExp(param, "gi");
      }

      //获取序号
      function getIndex(str, rg) {
        var _index = -1, //默认不存在
          _match = "";
        str.replace(rg, function(match) {
          _match = match;
          return match;
        });
        if (_match) {
          _index = str.indexOf(_match);
        }
        return _index;
      }

      //转义：年月日
      function setYMD(time, type) {
        var _str = "",
          _date = new Date(time);
        switch (type) {
          case "y":
          case "Y":
            _str = _date.getFullYear();
            break;
          case "m":
          case "M":
            _str = _date.getMonth() + 1;
            break;
          case "d":
          case "D":
            _str = _date.getDate();
            break;
          default:
            _str = "";
            break;
        }
        return _str;
      }

      var numValue = Number(value + "000"),
        valueType = typeof numValue;
      if (
        !value ||
        !(valueType === "number" && numValue !== 0 && numValue + "" !== "NaN")
      ) {
        return "";
      }

      var _type, splitStr;
      if (typeof formtype === "object") {
        splitStr = formtype.splitStr ? formtype.splitStr : "/";
        _type = formtype.type ? formtype.type : "ymd";
      } else {
        splitStr = "/";
        _type = "ymd";
      }

      return setDate(numValue, _type, splitStr);
    },
    //学科过滤(todo：后端给出具体的数据格式)
    subjectformat: function(value) {
      var _return = "";
      if (value !== "") {
        var array = JSON.parse(value).map(function(item){
            return  common.subCodeTable[Number(item)];
        });
        _return = array.join(" ");
      }
      return _return || "暂无";
    }
  }
};
</script>
<style>
.psbt-title.examlistIcon::before {
  background: url(../../assets/emamicon.png) no-repeat;
}

/* 列表容器 */
.mlc-box {
  padding: 16px;
  padding-bottom: 0;
  text-align: left;
  /* margin-bottom: 10px; */
}
.mlcb-date {
  font-size: 14px;
  color: #6d8392;
  margin-bottom: 10px;
}
.mc-exam {
  border-left: 8px solid #4393f7;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.mlcb-content {
  padding: 20px;
  /*  padding-right: 200px;*/
  position: relative;
  min-height: 90px;
  border: 1px solid #ebefef;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  -webkit-box-shadow: 0 0 8px 0 rgba(215, 220, 223, 0.5);
  -moz-box-shadow: 0 0 8px 0 rgba(215, 220, 223, 0.5);
  box-shadow: 0 0 8px 0 rgba(215, 220, 223, 0.5);
}
.mlcbc-exam-name {
  font-size: 20px;
  color: #284050;
  /* line-height: 3.15rem; */
  /* height: 3.15rem; */
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  font-size: 1rem;
}
.mlcbc-exam-info:after {
  content: "";
  display: block;
  clear: both;
}
.mlcbc-exam-info > div {
  display: inline-block;
  color: #6d8392;
  font-size: 14px;
  margin-right: 20px;
  float: left;
}
.mlcbc-action-btn {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
}
.mlcbc-action-btn > div {
  /* display: inline-block; */
  border: 1px solid #4393f7;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  background: #fff;
  color: #4393f7;
  padding: 0.35rem 2.5rem;
}
.mlcbc-action-btn > div:hover {
  background: #4393f7;
  color: #ffffff;
  cursor: pointer;
}
.mlcbc-action-btn > div:first-child {
  margin-bottom: 10px;
}

.mei-con {
  position: relative;
  padding-left: 75px;
}
.item-subject {
  position: absolute;
  left: 0;
}

/*适配手机样式*/
.psb-content {
  padding: 0;
}
.mlcbc-action-btnmoblie {
  position: relative;
  margin-top: 1rem;
  margin-left: unset;
  right: unset;
  top: unset;
  transform: unset;
}

/* element-ui样式微调 */
/* .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.3) !important;
} */

/* 开始测评按钮的禁用 */
div.pib-btn-disable {
  background: #d7dce0;
  border: 1px solid #d7dce0;
  border-radius: 4px;
  color: #fff;
  /* cursor: not-allowed; */
}
div.pib-btn-disable:hover {
  background: #d7dce0;
  cursor: not-allowed;
}

/* pc手机样式 */
.pc-class {
  line-height: 3.15rem;
  font-size: 1.2rem;
}

/* 没有数据的背景 */
.s-noSourceBg {
  background: url(../../assets/s-noSourceBg.png) no-repeat center;
}
.noSourceBg {
  background: url(../../assets/noSourceBg.png) no-repeat center;
}
</style>
