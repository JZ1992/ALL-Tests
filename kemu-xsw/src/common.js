import Vue from "vue";
import config from "@/config.js";
export default {
  // v-for:遍历数据添加全局唯一的key
  //解决v-for的问题
  tagSource: function (source) {
    if (typeof source !== 'object') {
      return [];
    }
    var _this = this;
    //标识符:初始化
    if (typeof _this.tagSource.vForKey === 'undefined') {
      _this.tagSource.vForKey = 0;
    } else {
      _this.tagSource.vForKey++;
    }
    //数组
    if (source instanceof Array) {
      source.forEach(function (item) {
        if (typeof item === 'object') {
          _this.tagSource.vForKey++;
          // item.vForKey = 'vForKey'+ _this.tagSource.vForKey;
          Vue.set(item, 'vForKey', 'vForKey' + _this.tagSource.vForKey);
        }
      })
    } else if (source instanceof Object) {
      //对象
      for (var key in source) {
        var value = source[key];
        if (typeof value === 'object') {
          _this.tagSource.vForKey++;
          // value.vForKey = 'vForKey'+ _this.tagSource.vForKey;
          Vue.set(value, 'vForKey', 'vForKey' + _this.tagSource.vForKey);
        }
      }
    }
    return source;
  },
  //判断pc还是移动端
  checkPc: function (value) {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },

  //退出登录时：清除token以及localStroage,防止对下次登录判断存在异常判断
  logoutClear() {
    config.setCookie('zbxk-token', '', 1);
    ['zbxk-cp-type', 'zbxk-current-exam', 'zbxk-paperSaveParams', 'zbxk-userInfo'].forEach(function (key) {
      localStorage.setItem(key, '');
    });
  },


  //获取报告地址
  getReportUrl(type, param) {
    // *  霍兰德 demo地址： http://zbxk.shidaceping.com/reportv2/selectsubject/personH5HollandReport/testid-327-sid-101736-sno-18969886588-ins-1-tab-1.shtml
    // *  MBTI demo地址： http://zbxk.shidaceping.com/reportv2/selectsubject/personH5MBTIReport/testid-327-sid-101736-sno-18969886588-ins-1-tab-1.shtml 
    //*   走班选课报告： http://institute.cedartest.com/reportv2/selectsubject/peasonreport/gread-9-class-1-testid-763-sid-100544-subject-01-id-2669-print-1.shtml

    var _domain = 'zbxk.cedartest.com'; //todo:设置主域
    var typeStr = '',
      _url = '';
    switch (type) {
      case 'mbti':
        typeStr = 'personH5MBTIReport';
        break;
      case 'holland':
        typeStr = 'personH5HollandReport';
        break;
    }
    _url = 'http://' + _domain + '/reportv2/selectsubject/' + typeStr + '/testid-' + param.test_id + '-sid-' + param.school_id + '-sno-' + param.sno + '-ins-1-tab-1.shtml';
    return _url;
  },

  //获取报告html，过滤不需要的节点
  filterHTML(html) {

    var reg = new RegExp('<head>([\\s\\S]*?)<\/head>[\\s\\S]*?<body>([\\s\\S]*?)<\/body>', 'g'),
      _html = '';
    html.replace(reg, function (matcher, $1, $2) {
      _html = $1 + $2
      return matcher;
    });
    return _html;

  },

  //学科编码表
  subCodeTable: {
    1: '语文',
    2: '数学',
    3: '英语',
    4: '物理',
    5: '化学',
    6: '生物',
    7: '政治',
    8: '历史',
    9: '地理',
  },

};



//测试数据：暂时存放
window.mbti = {
  "1": {
    "1": {
      question: {
        id: "9",
        mbti_question_cate_id: "1",
        question: "按照程序表做事，",
        option_A: "A.合你心",
        option_B: "B.令你感到束缚",
        A: "J",
        B: "P"
      }
    },
    "2": {
      question: {
        id: "14",
        mbti_question_cate_id: "1",
        question: "在一大群人当中，通常是",
        option_A: "A.你介绍大家认识",
        option_B: "B.别人介绍你",
        A: "E",
        B: "I"
      }
    },
    "3": {
      question: {
        id: "5",
        mbti_question_cate_id: "1",
        question: "一般来说，你和哪些人比较合得来？",
        option_A: "A.按实际状况做事的人",
        option_B: "B.富于想象力的人",
        A: "S",
        B: "N"
      }
    },
    "4": {
      question: {
        id: "24",
        mbti_question_cate_id: "1",
        question: "哪些人会更吸引你？",
        option_A: "A. 一个思想敏捷及非常聪颖的人",
        option_B: "B.实事求是，具丰富常识的人",
        A: "N",
        B: "S"
      }
    },
    "5": {
      question: {
        id: "25",
        mbti_question_cate_id: "1",
        question: "在日常工作中，你会",
        option_A: "A.颇为喜欢处理各种突发状况，有压力也有成就",
        option_B: "B.通常预先规划，以免要在压力下工作",
        A: "P",
        B: "J"
      }
    },
    "6": {
      question: {
        id: "2",
        mbti_question_cate_id: "1",
        question: "你认为自己是一个",
        option_A: "A.较为有条理的人",
        option_B: "B.较为随兴所至的人",
        A: "J",
        B: "P"
      }
    },
    "7": {
      question: {
        id: "18",
        mbti_question_cate_id: "1",
        question: "你喜欢花很多的时间",
        option_A: "A.一个人独处",
        option_B: "B.和别人在一起",
        A: "I",
        B: "E"
      }
    },
    "8": {
      question: {
        id: "17",
        mbti_question_cate_id: "1",
        question: "你比较喜欢",
        option_A: "A.坐观事情发展清晰后才制定计划",
        option_B: "B.很早就制定计划",
        A: "P",
        B: "J"
      }
    },
    "9": {
      question: {
        id: "7",
        mbti_question_cate_id: "1",
        question: "处理许多事情上，你会喜欢",
        option_A: "A.凭兴所至行事",
        option_B: "B.按照计划行事",
        A: "P",
        B: "J"
      }
    },
    "10": {
      question: {
        id: "3",
        mbti_question_cate_id: "1",
        question: "假如你是一位老师，你会选教",
        option_A: "A.以事实为主的课程",
        option_B: "B.涉及理论的课程",
        A: "S",
        B: "N"
      }
    },
    "11": {
      question: {
        id: "12",
        mbti_question_cate_id: "1",
        question: "大多数人会说你是一个",
        option_A: "A.重视自我隐私的人",
        option_B: "B.非常坦率开放的人",
        A: "I",
        B: "E"
      }
    },
    "12": {
      question: {
        id: "10",
        mbti_question_cate_id: "1",
        question: "当你有一份特别的任务，你会喜欢",
        option_A: "A.开始前小心制定计划",
        option_B: "B.边做边看，因为很多信息还不是很清楚",
        A: "J",
        B: "P"
      }
    },
    "13": {
      question: {
        id: "22",
        mbti_question_cate_id: "1",
        question: "在社交聚会中，你",
        option_A: "A.有时感到郁闷",
        option_B: "B.常常乐在其中",
        A: "I",
        B: "E"
      }
    },
    "14": {
      question: {
        id: "15",
        mbti_question_cate_id: "1",
        question: "你会跟哪些人做朋友？",
        option_A: "A.有创意的",
        option_B: "B.脚踏实地的",
        A: "N",
        B: "S"
      }
    },
    "15": {
      question: {
        id: "16",
        mbti_question_cate_id: "1",
        question: "你倾向",
        option_A: "A.重视感情多于逻辑",
        option_B: "B.重视逻辑多于感情",
        A: "F",
        B: "T"
      }
    },
    "16": {
      question: {
        id: "8",
        mbti_question_cate_id: "1",
        question: "你是否",
        option_A: "A.容易让人了解",
        option_B: "B.难于让人了解",
        A: "E",
        B: "I"
      }
    },
    "17": {
      question: {
        id: "20",
        mbti_question_cate_id: "1",
        question: "如果安排一群朋友社交聚会，你比较喜欢",
        option_A: "A.很早便把社交聚集等具体事情安排妥当",
        option_B: "B.无拘无束，看当时有什么好玩就做什么",
        A: "J",
        B: "P"
      }
    },
    "18": {
      question: {
        id: "1",
        mbti_question_cate_id: "1",
        question: "当你要外出一整天，你会",
        option_A: "A.先预先安排要做什么和在什么时候做",
        option_B: "B.来一场说走就走的“旅游”",
        A: "J",
        B: "P"
      }
    },
    "19": {
      question: {
        id: "6",
        mbti_question_cate_id: "1",
        question: "你是否认为",
        option_A: "A.情感高于理智",
        option_B: "B.理智胜于情感",
        A: "F",
        B: "T"
      }
    },
    "20": {
      question: {
        id: "11",
        mbti_question_cate_id: "1",
        question: "在大多数情况下，你会选择",
        option_A: "A.顺其自然",
        option_B: "B.按既定程序表做事",
        A: "P",
        B: "J"
      }
    },
    "21": {
      question: {
        id: "21",
        mbti_question_cate_id: "1",
        question: "计划一个旅程时，你较喜欢",
        option_A: "A.大部分的时间都是跟当天的感觉行事",
        option_B: "B.事先知道大部分的日子会做什么",
        A: "P",
        B: "J"
      }
    },
    "22": {
      question: {
        id: "4",
        mbti_question_cate_id: "1",
        question: "你通常",
        option_A: "A.与人容易混熟",
        option_B: "B.比较沉静或矜持",
        A: "E",
        B: "I"
      }
    },
    "23": {
      question: {
        id: "26",
        mbti_question_cate_id: "1",
        question: "你认为别人一般",
        option_A: "A.要花很长时间才认识你",
        option_B: "B.用很短的时间便认识你",
        A: "I",
        B: "E"
      }
    },
    "24": {
      question: {
        id: "23",
        mbti_question_cate_id: "1",
        question: "参加一个你不太熟悉的活动，你通常",
        option_A: "A.和别人容易混熟",
        option_B: "B.趋向独自一人坐在角落里",
        A: "E",
        B: "I"
      }
    },
    "25": {
      question: {
        id: "13",
        mbti_question_cate_id: "1",
        question: "你宁愿被人认为是一个",
        option_A: "A.实事求是的人",
        option_B: "B.聪明灵活的人",
        A: "S",
        B: "N"
      }
    },
    "26": {
      question: {
        id: "19",
        mbti_question_cate_id: "1",
        question: "与很多人一起会",
        option_A: "A.令你活力倍增",
        option_B: "B.常常令你耗费心力",
        A: "E",
        B: "I"
      }
    },
    cate: "一、哪一个答案最能贴切的描绘你一般的感受或行为？"
  },
  "2": {
    "27": {
      question: {
        id: "49",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.确定观点",
        option_B: "B.渴望经历",
        A: "J",
        B: "P"
      }
    },
    "28": {
      question: {
        id: "32",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.关注现实",
        option_B: "B.关注可能",
        A: "S",
        B: "N"
      }
    },
    "29": {
      question: {
        id: "57",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.具分析力",
        option_B: "B.情感丰富",
        A: "T",
        B: "F"
      }
    },
    "30": {
      question: {
        id: "34",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.情感外显",
        option_B: "B.情感隐藏",
        A: "E",
        B: "I"
      }
    },
    "31": {
      question: {
        id: "33",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.好奇",
        option_B: "B.决定",
        A: "P",
        B: "J"
      }
    },
    "32": {
      question: {
        id: "40",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.声明事实",
        option_B: "B.提出概念",
        A: "S",
        B: "N"
      }
    },
    "33": {
      question: {
        id: "41",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.即时发挥",
        option_B: "B.预先安排",
        A: "P",
        B: "J"
      }
    },
    "34": {
      question: {
        id: "50",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.富想象的",
        option_B: "B.以事论事",
        A: "N",
        B: "S"
      }
    },
    "35": {
      question: {
        id: "36",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.系统清晰",
        option_B: "B.追随天性",
        A: "J",
        B: "P"
      }
    },
    "36": {
      question: {
        id: "46",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.真实",
        option_B: "B.圆通",
        A: "T",
        B: "F"
      }
    },
    "37": {
      question: {
        id: "39",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.令人信服",
        option_B: "B.感人至深",
        A: "T",
        B: "F"
      }
    },
    "38": {
      question: {
        id: "53",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.建造",
        option_B: "B.创造",
        A: "S",
        B: "N"
      }
    },
    "39": {
      question: {
        id: "43",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.有条不紊",
        option_B: "B.不拘小节",
        A: "J",
        B: "P"
      }
    },
    "40": {
      question: {
        id: "48",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.朋友不多",
        option_B: "B.朋友众多",
        A: "I",
        B: "E"
      }
    },
    "41": {
      question: {
        id: "51",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.亲切的",
        option_B: "B.客观的",
        A: "F",
        B: "T"
      }
    },
    "42": {
      question: {
        id: "35",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.文静",
        option_B: "B.外向",
        A: "I",
        B: "E"
      }
    },
    "43": {
      question: {
        id: "37",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.理论",
        option_B: "B.实际",
        A: "N",
        B: "S"
      }
    },
    "44": {
      question: {
        id: "45",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.天生友好",
        option_B: "B.远见卓识",
        A: "F",
        B: "T"
      }
    },
    "45": {
      question: {
        id: "56",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.富同情",
        option_B: "B.合逻辑",
        A: "F",
        B: "T"
      }
    },
    "46": {
      question: {
        id: "47",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.务实的",
        option_B: "B.理论的",
        A: "S",
        B: "N"
      }
    },
    "47": {
      question: {
        id: "27",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.注重隐私",
        option_B: "B.坦率开放",
        A: "I",
        B: "E"
      }
    },
    "48": {
      question: {
        id: "52",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.客观的",
        option_B: "B.热情的",
        A: "T",
        B: "F"
      }
    },
    "49": {
      question: {
        id: "58",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.合情合理",
        option_B: "B.令人着迷",
        A: "S",
        B: "N"
      }
    },
    "50": {
      question: {
        id: "29",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.抽象",
        option_B: "B.具体",
        A: "N",
        B: "S"
      }
    },
    "51": {
      question: {
        id: "42",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.矜持",
        option_B: "B.健谈",
        A: "I",
        B: "E"
      }
    },
    "52": {
      question: {
        id: "44",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.喜欢创新",
        option_B: "B.热爱生活",
        A: "N",
        B: "S"
      }
    },
    "53": {
      question: {
        id: "31",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.思考严谨",
        option_B: "B.情感丰富",
        A: "T",
        B: "F"
      }
    },
    "54": {
      question: {
        id: "30",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.温柔",
        option_B: "B.坚定",
        A: "F",
        B: "T"
      }
    },
    "55": {
      question: {
        id: "54",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.较为孤独",
        option_B: "B.较为合群",
        A: "I",
        B: "E"
      }
    },
    "56": {
      question: {
        id: "28",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.预先安排的",
        option_B: "B.随性灵活的",
        A: "J",
        B: "P"
      }
    },
    "57": {
      question: {
        id: "55",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.理论",
        option_B: "B.事实",
        A: "N",
        B: "S"
      }
    },
    "58": {
      question: {
        id: "38",
        mbti_question_cate_id: "2",
        question: "",
        option_A: "A.重视情感",
        option_B: "B.重视逻辑",
        A: "F",
        B: "T"
      }
    },
    cate: "二、在下列每一对词语中，哪一个词语更合你心意？请仔细想想这些词语的意义，而不要理会他们的字"
  },
  "3": {
    "59": {
      question: {
        id: "71",
        mbti_question_cate_id: "3",
        question: "总的说来，要做一个大型作业时，你会选",
        option_A: "A.边做边想该做什么",
        option_B: "B.首先把工作按步细分",
        A: "P",
        B: "J"
      }
    },
    "60": {
      question: {
        id: "64",
        mbti_question_cate_id: "3",
        question: "一般人对你的评价是",
        option_A: "A.一贯感性的人",
        option_B: "B.一贯理性的人",
        A: "F",
        B: "T"
      }
    },
    "61": {
      question: {
        id: "61",
        mbti_question_cate_id: "3",
        question: "做常规的事，你比较喜欢",
        option_A: "A.按照一般认可的方法去做",
        option_B: "B.构想一个自己的想法",
        A: "S",
        B: "N"
      }
    },
    "62": {
      question: {
        id: "63",
        mbti_question_cate_id: "3",
        question: "你通常较喜欢的科目是",
        option_A: "A.有清晰的概念和原则的",
        option_B: "B.有充足的事实和数据的",
        A: "N",
        B: "S"
      }
    },
    "63": {
      question: {
        id: "65",
        mbti_question_cate_id: "3",
        question: "你认为按照程序表做事",
        option_A: "A.有时是需要的，但一般来说你不大喜欢这样做，会束缚自己的想法",
        option_B: "B.大多数情况下是有帮助而且是你喜欢做的",
        A: "P",
        B: "J"
      }
    },
    "64": {
      question: {
        id: "67",
        mbti_question_cate_id: "3",
        question: "在社交聚会上，你会",
        option_A: "A.是说话很多的一个",
        option_B: "B.喜欢默默的听别人说话",
        A: "E",
        B: "I"
      }
    },
    "65": {
      question: {
        id: "68",
        mbti_question_cate_id: "3",
        question: "把周末期间要完成的事列成清单，这个主意会",
        option_A: "A.合你意，",
        option_B: "B.使你提不起劲",
        A: "J",
        B: "P"
      }
    },
    "66": {
      question: {
        id: "69",
        mbti_question_cate_id: "3",
        question: "哪个是较高的赞誉，或称许为",
        option_A: "A.能干的",
        option_B: "B.富有同情心",
        A: "T",
        B: "F"
      }
    },
    "67": {
      question: {
        id: "70",
        mbti_question_cate_id: "3",
        question: "你通常喜欢",
        option_A: "A.事先安排你的社交约会",
        option_B: "B.随兴之所至做事",
        A: "J",
        B: "P"
      }
    },
    "68": {
      question: {
        id: "62",
        mbti_question_cate_id: "3",
        question: "你刚认识的朋友能否说出你的兴趣？",
        option_A: "A.马上可以",
        option_B: "B.要待他们真正了解你之后才可以",
        A: "E",
        B: "I"
      }
    },
    "69": {
      question: {
        id: "78",
        mbti_question_cate_id: "3",
        question: "要作决定时，你认为比较重要的是",
        option_A: "A.据事实衡量，即使他人很不舒服也一定要坚持",
        option_B: "B.更多的会综合考虑他人的感受和意见",
        A: "T",
        B: "F"
      }
    },
    "70": {
      question: {
        id: "60",
        mbti_question_cate_id: "3",
        question: "在社交场合中，你经常会感到",
        option_A: "A.与某些人很难打开话匣儿和保持对话",
        option_B: "B.与多数人都能从容地长谈",
        A: "I",
        B: "E"
      }
    },
    "71": {
      question: {
        id: "72",
        mbti_question_cate_id: "3",
        question: "你能否滔滔不绝地与人聊天",
        option_A: "A.只限于跟你有共同兴趣的人",
        option_B: "B.几乎跟任何人都可以",
        A: "I",
        B: "E"
      }
    },
    "72": {
      question: {
        id: "66",
        mbti_question_cate_id: "3",
        question: "和一群人在一起，你通常会选",
        option_A: "A.跟你很熟悉的人谈话",
        option_B: "B.参与大伙的谈话",
        A: "I",
        B: "E"
      }
    },
    "73": {
      question: {
        id: "59",
        mbti_question_cate_id: "3",
        question: "当你要在一个星期内完成一个项目，在项目启动后你会",
        option_A: "A.把要做的不同工作依次列出",
        option_B: "B.马上动工",
        A: "J",
        B: "P"
      }
    },
    "74": {
      question: {
        id: "76",
        mbti_question_cate_id: "3",
        question: "你做事多数是",
        option_A: "A.按当天的实际状况去做",
        option_B: "B.按事先拟好的计划去做",
        A: "P",
        B: "J"
      }
    },
    "75": {
      question: {
        id: "73",
        mbti_question_cate_id: "3",
        question: "为完成一项老师交办的任务，你会",
        option_A: "A.按照一些已被证明有效的方法去做",
        option_B: "B.分析可能会有什么问题，并对这些难点提出有针对性的解决方案",
        A: "S",
        B: "N"
      }
    },
    "76": {
      question: {
        id: "75",
        mbti_question_cate_id: "3",
        question: "你宁愿做哪一类老师的助理？",
        option_A: "A.天性淳良，但有时候会前后不一致",
        option_B: "B.言词尖锐但合乎逻辑的",
        A: "F",
        B: "T"
      }
    },
    "77": {
      question: {
        id: "74",
        mbti_question_cate_id: "3",
        question: "你喜欢阅读的作品是",
        option_A: "A.作者用奇特或创新的表达方式",
        option_B: "B.喜欢作者直话直说的表达方式",
        A: "N",
        B: "S"
      }
    },
    "78": {
      question: {
        id: "77",
        mbti_question_cate_id: "3",
        question: "你是否",
        option_A: "A.可以和任何人按需求从容地交谈",
        option_B: "B.只是对某些人或在某种情况下才可以畅所欲言",
        A: "E",
        B: "I"
      }
    },
    cate: "三、哪一个答案最能贴切地描绘你一般的感受或行为"
  },
  "4": {
    "79": {
      question: {
        id: "86",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.改进",
        option_B: "B.发明",
        A: "S",
        B: "N"
      }
    },
    "80": {
      question: {
        id: "85",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.实事求是",
        option_B: "B.情感细腻",
        A: "T",
        B: "F"
      }
    },
    "81": {
      question: {
        id: "80",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.仁慈慷慨的",
        option_B: "B.意志坚定的",
        A: "F",
        B: "T"
      }
    },
    "82": {
      question: {
        id: "91",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.全心全意",
        option_B: "B.有决心",
        A: "F",
        B: "T"
      }
    },
    "83": {
      question: {
        id: "84",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.柔和的",
        option_B: "B.力量的",
        A: "F",
        B: "T"
      }
    },
    "84": {
      question: {
        id: "81",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.公正的",
        option_B: "B.关怀的",
        A: "T",
        B: "F"
      }
    },
    "85": {
      question: {
        id: "93",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.干实事的",
        option_B: "B.有创意的",
        A: "S",
        B: "N"
      }
    },
    "86": {
      question: {
        id: "83",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.可能性",
        option_B: "B.必然性",
        A: "N",
        B: "S"
      }
    },
    "87": {
      question: {
        id: "87",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.新颖的",
        option_B: "B.明确的",
        A: "N",
        B: "S"
      }
    },
    "88": {
      question: {
        id: "79",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.想象的",
        option_B: "B.真实的",
        A: "N",
        B: "S"
      }
    },
    "89": {
      question: {
        id: "92",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.能干",
        option_B: "B.仁慈",
        A: "T",
        B: "F"
      }
    },
    "90": {
      question: {
        id: "88",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.富有同情心的",
        option_B: "B.善于分析的",
        A: "F",
        B: "T"
      }
    },
    "91": {
      question: {
        id: "89",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.坚持观点",
        option_B: "B.温柔有爱心",
        A: "T",
        B: "F"
      }
    },
    "92": {
      question: {
        id: "82",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.加工",
        option_B: "B.设计",
        A: "S",
        B: "N"
      }
    },
    "93": {
      question: {
        id: "90",
        mbti_question_cate_id: "4",
        question: "",
        option_A: "A.细致观察生活",
        option_B: "B.满怀期望生活",
        A: "S",
        B: "N"
      }
    },
    cate: "四、在下列每一对词语中，哪一个词语更合你心意？"
  }
};


window.holland = {
  "1": {
    "question": {
      "id": "60",
      "holland_features_id": "2",
      "question": "对成为会计师，档案管理员、文秘、办公室职员",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "2": {
    "question": {
      "id": "35",
      "holland_features_id": "6",
      "question": "研究其他人心理方面的知识善于了解他人的性格",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "3": {
    "question": {
      "id": "13",
      "holland_features_id": "4",
      "question": "对自己感兴趣的问题一定要研究得水落石出。",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "4": {
    "question": {
      "id": "7",
      "holland_features_id": "5",
      "question": "使用钳子、改锥、螺丝刀、万用表一类的工具",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "5": {
    "question": {
      "id": "30",
      "holland_features_id": "1",
      "question": "希望将来的工作有艺术特色，能发挥自己的独特才能",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "6": {
    "question": {
      "id": "3",
      "holland_features_id": "5",
      "question": "学习机械、电子或自动化等技术",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "7": {
    "question": {
      "id": "43",
      "holland_features_id": "3",
      "question": "认识一些学校和企业里的知名人士",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "8": {
    "question": {
      "id": "45",
      "holland_features_id": "3",
      "question": "有些人太霸道，有时明明知道他们是对的，也要和他们对着干",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "9": {
    "question": {
      "id": "46",
      "holland_features_id": "3",
      "question": "喜欢玩游戏或参加竞赛，有不服输的精神。",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "10": {
    "question": {
      "id": "6",
      "holland_features_id": "5",
      "question": "亲自动手制作一些小玩意儿，从中得到乐趣。",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "11": {
    "question": {
      "id": "9",
      "holland_features_id": "5",
      "question": "制作简易家具或模型",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "12": {
    "question": {
      "id": "34",
      "holland_features_id": "6",
      "question": "参加募捐活动或做义工、志愿者",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "13": {
    "question": {
      "id": "29",
      "holland_features_id": "1",
      "question": "对篆刻、剪纸或泥塑、服装设计",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "14": {
    "question": {
      "id": "41",
      "holland_features_id": "3",
      "question": "对担任学生干部并策划学校活动",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "15": {
    "question": {
      "id": "27",
      "holland_features_id": "1",
      "question": "常陶醉于音乐之中",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "16": {
    "question": {
      "id": "44",
      "holland_features_id": "3",
      "question": "如果待遇相同，我宁愿当销售员，而不愿当图书管理员",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "17": {
    "question": {
      "id": "22",
      "holland_features_id": "1",
      "question": "参加娱乐或节庆晚会",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "18": {
    "question": {
      "id": "11",
      "holland_features_id": "4",
      "question": "在实验室学习",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "19": {
    "question": {
      "id": "36",
      "holland_features_id": "6",
      "question": "结交新朋友",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "20": {
    "question": {
      "id": "25",
      "holland_features_id": "1",
      "question": "欣赏音乐或戏剧及舞蹈",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "21": {
    "question": {
      "id": "42",
      "holland_features_id": "3",
      "question": "和同学一起探讨国家及政国际政治形势",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "22": {
    "question": {
      "id": "24",
      "holland_features_id": "1",
      "question": "参加乐队",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "23": {
    "question": {
      "id": "28",
      "holland_features_id": "1",
      "question": "角色扮演（电影、游戏或自己设想的人物）",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "24": {
    "question": {
      "id": "18",
      "holland_features_id": "4",
      "question": "喜欢解释生活中的一些化学或物理现象",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "25": {
    "question": {
      "id": "52",
      "holland_features_id": "2",
      "question": "有效整理各类学习资料",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "26": {
    "question": {
      "id": "17",
      "holland_features_id": "4",
      "question": "喜欢抽象思维或研究性的工作，不喜欢动手的工作",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "27": {
    "question": {
      "id": "8",
      "holland_features_id": "5",
      "question": "能看简单电路图或原理图",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "28": {
    "question": {
      "id": "31",
      "holland_features_id": "6",
      "question": "善于同各种人打交道",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "29": {
    "question": {
      "id": "47",
      "holland_features_id": "3",
      "question": "做事充满活力和热情",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "30": {
    "question": {
      "id": "51",
      "holland_features_id": "2",
      "question": "检查个人花费情况",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "31": {
    "question": {
      "id": "21",
      "holland_features_id": "1",
      "question": "演讲或表演节目",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "32": {
    "question": {
      "id": "15",
      "holland_features_id": "4",
      "question": "当接受新任务后，喜欢以自己的独特方法去完成它",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "33": {
    "question": {
      "id": "59",
      "holland_features_id": "2",
      "question": "整理保管班级资料和档案",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "34": {
    "question": {
      "id": "38",
      "holland_features_id": "6",
      "question": "善于体察人心和帮助他人劝导别人",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "35": {
    "question": {
      "id": "56",
      "holland_features_id": "2",
      "question": "喜欢在做事情前，对事情做出细致的安排",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "36": {
    "question": {
      "id": "53",
      "holland_features_id": "2",
      "question": "整理好桌面和房间",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "37": {
    "question": {
      "id": "20",
      "holland_features_id": "4",
      "question": "对成为某领域科学研究人员或学者",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "38": {
    "question": {
      "id": "49",
      "holland_features_id": "3",
      "question": "善于向老师提出建议或反映意见",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "39": {
    "question": {
      "id": "16",
      "holland_features_id": "4",
      "question": "经常不停地思考某一问题，直到想出正确的答案",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "40": {
    "question": {
      "id": "50",
      "holland_features_id": "3",
      "question": "对成为销售经理、创业者、企业管理人员、社团负责人",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "41": {
    "question": {
      "id": "26",
      "holland_features_id": "1",
      "question": "对学习美术、书法、摄影、文艺随笔或故事创作",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "42": {
    "question": {
      "id": "54",
      "holland_features_id": "2",
      "question": "喜欢把一切安排得整整齐齐、井井有条",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "43": {
    "question": {
      "id": "5",
      "holland_features_id": "5",
      "question": "小时候经常把玩具拆开，把里面看个究竟。",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "44": {
    "question": {
      "id": "39",
      "holland_features_id": "6",
      "question": "喜欢许多人一起学习和郊游",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "45": {
    "question": {
      "id": "37",
      "holland_features_id": "6",
      "question": "调解同学之间的纠纷",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "46": {
    "question": {
      "id": "14",
      "holland_features_id": "4",
      "question": "遇到困难，喜欢查阅科技文献",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "47": {
    "question": {
      "id": "1",
      "holland_features_id": "5",
      "question": "对维修家用电器或电脑",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "48": {
    "question": {
      "id": "55",
      "holland_features_id": "2",
      "question": "喜欢协助老师做班级管理类的工作",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "49": {
    "question": {
      "id": "33",
      "holland_features_id": "6",
      "question": "热心帮别人解决困难",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "50": {
    "question": {
      "id": "57",
      "holland_features_id": "2",
      "question": "对于将来的职业，我愿意从事虽然工资少、但是比较稳定的职业",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "51": {
    "question": {
      "id": "19",
      "holland_features_id": "4",
      "question": "喜欢研究感兴趣领域的原理图",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "52": {
    "question": {
      "id": "4",
      "holland_features_id": "5",
      "question": "熟练使用手机各项功能",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "53": {
    "question": {
      "id": "12",
      "holland_features_id": "4",
      "question": "不喜欢按既定思路解题，希望不断找到新的、突破性的解题思路和方法",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "54": {
    "question": {
      "id": "48",
      "holland_features_id": "3",
      "question": "有效利用自身的行为或意志力调动他人积极性或说服他人",
      "option_Y": "是",
      "option_N": "否"
    }
  },
  "55": {
    "question": {
      "id": "32",
      "holland_features_id": "6",
      "question": "参加某个社团或学校活动",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "56": {
    "question": {
      "id": "10",
      "holland_features_id": "5",
      "question": "对将来成为工程师",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "57": {
    "question": {
      "id": "2",
      "holland_features_id": "5",
      "question": "对修理自行车、闹钟或换灯泡",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "58": {
    "question": {
      "id": "23",
      "holland_features_id": "1",
      "question": "装饰室内",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "59": {
    "question": {
      "id": "40",
      "holland_features_id": "6",
      "question": "对成为教师、非盈利公益组织成员或外交家",
      "option_Y": "感兴趣",
      "option_N": "不感兴趣"
    }
  },
  "60": {
    "question": {
      "id": "58",
      "holland_features_id": "2",
      "question": "准时并高效的完成老师交办的事务性的工作",
      "option_Y": "是",
      "option_N": "否"
    }
  }
};


window.profession = {
  "1": {
    "question": {
      "id": "21",
      "question": "喜欢运用线条、色彩等来实现美得创造。希望从事服装、空间、产品、或建筑物等的相关设计工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "设计类",
      "majors": "[334,339,237,405]"
    }
  },
  "2": {
    "question": {
      "id": "23",
      "question": "对机器、设备、仪器等感兴趣，希望在工业生产制造和研发领域从事开发、设计、制造、安装、运用和维修等方面工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "机械类",
      "majors": "[222,225,239]"
    }
  },
  "3": {
    "question": {
      "id": "36",
      "question": "对非重工业等工程类专业感兴趣，希望在食品、纺织、催化剂、洗涤产品和化妆品类的生产及研究方向发展。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "轻工类",
      "majors": "[330,336,396]"
    }
  },
  "4": {
    "question": {
      "id": "29",
      "question": "对军事类信息感兴趣，希望毕业后在军工、航空航天领域的企业或研究所从事兵器类相关研究和制造工作，但兵器类专业报考身体条件苛刻。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "兵器类",
      "majors": "[362]"
    }
  },
  "5": {
    "question": {
      "id": "15",
      "question": "希望从事医院、社区、家庭等医疗护理性工作，从而帮助人们进行保持健康或恢复健康的活动。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "护理类",
      "majors": "[516]"
    }
  },
  "6": {
    "question": {
      "id": "1",
      "question": "喜欢法律、政治，将来想从事政法类（律师、法官、警察等）及政府管理类工作",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "政法类",
      "majors": "[30,34,52,415,556]"
    }
  },
  "7": {
    "question": {
      "id": "16",
      "question": "对研究药物的来源、性状、作用感兴趣；希望从事药物的分析、鉴定、调配、生产、保管和寻找新药的相关工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "药学类",
      "majors": "[490,498]"
    }
  },
  "8": {
    "question": {
      "id": "4",
      "question": "喜欢探究历史事件的起因、经过和影响，热衷考古、文物、传统的研究和推广。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "历史学类",
      "majors": "[163,167,169]"
    }
  },
  "9": {
    "question": {
      "id": "22",
      "question": "希望在各种工程设施（如建筑、隧道、路桥、矿井等）机构从事项目工程管理、工程造价管理等工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "工程建筑类",
      "majors": "[295,307,528]"
    }
  },
  "10": {
    "question": {
      "id": "31",
      "question": "对了解人的心理活动过程感兴趣，希望通过学习更多的心理学专业知识来帮助更多的人，有强大的心理能量。但需要注意，不能因为自己存在心理困惑而想选择心理学。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "心理学",
      "majors": "[215]"
    }
  },
  "11": {
    "question": {
      "id": "11",
      "question": "喜欢从事处理具体事务的工作，致力于在事务处理的过程中实现管理规范和管理效能的最大化实现。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "管理学类（同物相关）",
      "majors": "[530,549,551,566]"
    }
  },
  "12": {
    "question": {
      "id": "27",
      "question": "对将来从事铁路、公路、水路及航空运输基础设施的布局及修建、载运工具运用工程、交通信息工程及控制、交通运输经营和管理的相关工作感兴趣。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "交通运输类",
      "majors": "[341]"
    }
  },
  "13": {
    "question": {
      "id": "25",
      "question": "对资源及能源的研究、勘探、开采以及管理应用方面工作感兴趣等，包括矿业资源、海洋资源以及核能源等。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "资源及能源类",
      "majors": "[323,350,256,370,318]"
    }
  },
  "14": {
    "question": {
      "id": "34",
      "question": "对生物和生命类科学感兴趣，喜欢研究生物的结构、生理行为和生物起源、进化与遗传发育等，希望将来从事生物科学领域的研究、教学工作及管理工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "生命学类",
      "majors": "[393,412,210]"
    }
  },
  "15": {
    "question": {
      "id": "9",
      "question": "喜欢从事与人打交道的工作，发挥人际交往的才能，实现团队效能的最大化或实现人际往来价值的最大化。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "管理学类（同人相关）",
      "majors": "[542,581]"
    }
  },
  "16": {
    "question": {
      "id": "13",
      "question": "对将来成为一名教育类工作者感兴趣。希望通过探讨、实践来揭示种种教育的规律，并建立个性化的教育理论体系。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "教育学类",
      "majors": "[69,78]"
    }
  },
  "17": {
    "question": {
      "id": "33",
      "question": "对化学很感兴趣，希望将来能运用所学化学知识和实验技能，从事应用研究、技术开发和科技管理。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "材料化学类",
      "majors": "[182,312,385,241]"
    }
  },
  "18": {
    "question": {
      "id": "12",
      "question": "希望通过资金筹集、成本核算、财务管理、资产评估、财务审计等工作来帮助机构达成资金使用效能最大化。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "管理学类（同财务相关）",
      "majors": "[535,537,545,547]"
    }
  },
  "19": {
    "question": {
      "id": "2",
      "question": "喜欢研究各类社会现象及社会规律、民族事务，希望将来可以从事相关研究、调查和评估类工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "社会及民族类",
      "majors": "[40,46,48]"
    }
  },
  "20": {
    "question": {
      "id": "5",
      "question": "热衷思辨推理，及世界观、人生观、价值观的探索和研究，喜欢学习和研究宗教、哲学家的理论体系，希望将来从事相关工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "哲学类",
      "majors": "[2]"
    }
  },
  "21": {
    "question": {
      "id": "19",
      "question": "希望从事植物栽培、繁育、护理与应用，以及各类园林绿地的规划、设计、施工组织与管理等方面的工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "园林园艺类",
      "majors": "[437,454]"
    }
  },
  "22": {
    "question": {
      "id": "37",
      "question": "希望成为水利、水电、水保等部门从事规划、设计、施工、科研和管理等方面工作人员。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "水利水电工程类",
      "majors": "[302]"
    }
  },
  "23": {
    "question": {
      "id": "28",
      "question": "对电子或电类技术感兴趣，希望将来从事与电气系统工程、自动控制、电子技术、信息工程相关领域工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "电子电气类",
      "majors": "[260,265,282]"
    }
  },
  "24": {
    "question": {
      "id": "38",
      "question": "具有较好数学、力学基础知识，希望能从事飞行器（包括航天器与运载端）结构设计与研究、制造相关工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "航天航空类",
      "majors": "[354]"
    }
  },
  "25": {
    "question": {
      "id": "35",
      "question": "对研究天文、地理、大气、海洋、地质等专业科学知识及其应用感兴趣，从事相关的研究、应用工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "自然科学学类",
      "majors": "[187,189,194,197,205]"
    }
  },
  "26": {
    "question": {
      "id": "32",
      "question": "掌握物理学的基本理论与方法，具有良好的数学基础和实验技能，将来希望从事物理学相关领域中研发、教学、技术管理等工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "物理学类",
      "majors": "[177,202]"
    }
  },
  "27": {
    "question": {
      "id": "26",
      "question": "喜欢工程技术类工作，同时对管理性工作感兴趣，希望能成为在国内外工程建设领域从事项目决策和过程管理的复合型人才。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "管理工程类",
      "majors": "[519,524,526,570,574,410]"
    }
  },
  "28": {
    "question": {
      "id": "17",
      "question": "希望在医疗系统中工作，成为紧密配合临床医生的高级技师和治疗师，其中包括医学影像技师、呼吸治疗师、康复治疗师、听力师、视光师、营养治疗师等。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "医学技术类",
      "majors": "[507]"
    }
  },
  "29": {
    "question": {
      "id": "10",
      "question": "希望从事市场开拓、营销策划、电商贸易、国际贸易、客户关系等商务工作。喜欢在传播产品的过程中为客户、合作伙伴以及整个社会带来经济价值。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "市场及销售管理类",
      "majors": "[578,532,540]"
    }
  },
  "30": {
    "question": {
      "id": "18",
      "question": "希望从事农业技术类、林业技术类、畜牧类、水产养殖类、农林管理类等职业，推动农业的产业化发展。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "农林牧副渔类",
      "majors": "[426,451,381,456,460,375,439]"
    }
  },
  "31": {
    "question": {
      "id": "24",
      "question": "逻辑能力强，希望掌握程序设计语言、算法和数据结构、及软件设计方法，在计算机技术领域从事相关工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "计算机类",
      "majors": "[285,522]"
    }
  },
  "32": {
    "question": {
      "id": "20",
      "question": "对研究动物的形态、习性、繁殖、遗传、分类、分布等方面的特征和规律感兴趣，希望从事动物（宠物）的饲养、繁殖、营养、医疗等工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "动物科学及医学类",
      "majors": "[443,447]"
    }
  },
  "33": {
    "question": {
      "id": "8",
      "question": "对新闻传播、新闻主持、编辑出版等事务感兴趣，将来从事电视、广播、网络新闻传播以及广告、出版、策划等工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "新闻传播类",
      "majors": "[152,157,159]"
    }
  },
  "34": {
    "question": {
      "id": "7",
      "question": "对外国语言文学感兴趣，有志于从事翻译、国际交流、国外文化研究和推广、国际贸易，或在外资企业工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "外国语文学类",
      "majors": "[89]"
    }
  },
  "35": {
    "question": {
      "id": "6",
      "question": "喜欢汉语言文学，有较强的中文表达和应用能力，将来想从事语文教师、文秘、中文编辑、广告策划等工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "汉语言文学类",
      "majors": "[81]"
    }
  },
  "36": {
    "question": {
      "id": "14",
      "question": "喜欢运用科学或技术的手段处理人体的各种疾病或病变，希望从事医学研究、临床医疗、预防医学、公共卫生等工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "医学类",
      "majors": "[463,465,472,474,480,488,505]"
    }
  },
  "37": {
    "question": {
      "id": "30",
      "question": "掌握数学科学的基本理论与基本方法，喜欢运用数学知识结合计算机来解决实际问题，希望将来从事同数学相关的研究、教学、管理等工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "数学类",
      "majors": "[173,218]"
    }
  },
  "38": {
    "question": {
      "id": "3",
      "question": "喜欢探究国民经济、财政税收、金融证券、经济贸易等经济的现状、规律，将来希望从事经济管理、税收、银行、证券、投资、保险、信托等行业的工作。",
      "option_A": "感兴趣",
      "option_B": "不清楚",
      "option_C": "不感兴趣",
      "big_major": "经济金融类",
      "majors": "[8,15,18,26,553]"
    }
  }

};


// 试卷保存格式
const mbtiSaveJSON = {
  "1": "A",
  "2": "B",
  "3": "B",
  "4": "A",
  "5": "B",
  "6": "A",
  "7": "B",
  "8": "A",
  "9": "B",
  "10": "B",
  "11": "B",
  "12": "A",
  "13": "B",
  "14": "A",
  "15": "B",
  "16": "B",
  "17": "A",
  "18": "A",
  "19": "B",
  "20": "B",
  "21": "B",
  "22": "B",
  "23": "A",
  "24": "A",
  "25": "A",
  "26": "B",
  "27": "A",
  "28": "A",
  "29": "A",
  "30": "A",
  "31": "B",
  "32": "B",
  "33": "A",
  "34": "A",
  "35": "A",
  "36": "B",
  "37": "A",
  "38": "A",
  "39": "A",
  "40": "A",
  "41": "A",
  "42": "B",
  "43": "A",
  "44": "B",
  "45": "A",
  "46": "B",
  "47": "B",
  "48": "A",
  "49": "A",
  "50": "A",
  "51": "B",
  "52": "A",
  "53": "B",
  "54": "A",
  "55": "B",
  "56": "B",
  "57": "A",
  "58": "A",
  "59": "B",
  "60": "B",
  "61": "B",
  "62": "A",
  "63": "A",
  "64": "A",
  "65": "A",
  "66": "B",
  "67": "B",
  "68": "A",
  "69": "B",
  "70": "B",
  "71": "A",
  "72": "A",
  "73": "B",
  "74": "B",
  "75": "B",
  "76": "B",
  "77": "A",
  "78": "A",
  "79": "A",
  "80": "A",
  "81": "B",
  "82": "A",
  "83": "A",
  "84": "B",
  "85": "A",
  "86": "A",
  "87": "A",
  "88": "A",
  "89": "A",
  "90": "B",
  "91": "B",
  "92": "A",
  "93": "A"
}

const hollandSaveJSON = {
  "1": 1,
  "2": 1,
  "3": 2,
  "4": 1,
  "5": 1,
  "6": 2,
  "7": 2,
  "8": 2,
  "9": 2,
  "10": 2,
  "11": 2,
  "12": 2,
  "13": 2,
  "14": 2,
  "15": 2,
  "16": 2,
  "17": 2,
  "18": 1,
  "19": 1,
  "20": 2,
  "21": 2,
  "22": 2,
  "23": 1,
  "24": 2,
  "25": 2,
  "26": 1,
  "27": 1,
  "28": 2,
  "29": 2,
  "30": 2,
  "31": 2,
  "32": 2,
  "33": 2,
  "34": 1,
  "35": 2,
  "36": 2,
  "37": 2,
  "38": 2,
  "39": 2,
  "40": 1,
  "41": 2,
  "42": 2,
  "43": 2,
  "44": 2,
  "45": 2,
  "46": 2,
  "47": 2,
  "48": 1,
  "49": 1,
  "50": 1,
  "51": 1,
  "52": 2,
  "53": 2,
  "54": 1,
  "55": 1,
  "56": 2,
  "57": 2,
  "58": 2,
  "59": 2,
  "60": 2
}

const majorSaveJSON = {
  "1": "A",
  "2": "B",
  "3": "A",
  "4": "A",
  "5": "A",
  "6": "A",
  "7": "A",
  "8": "A",
  "9": "B",
  "10": "A",
  "11": "B",
  "12": "A",
  "13": "A",
  "14": "A",
  "15": "A",
  "16": "A",
  "17": "A",
  "18": "A",
  "19": "B",
  "20": "B",
  "21": "A",
  "22": "A",
  "23": "B",
  "24": "B",
  "25": "B",
  "26": "B",
  "27": "B",
  "28": "A",
  "29": "A",
  "30": "B",
  "31": "A",
  "32": "B",
  "33": "B",
  "34": "B",
  "35": "B",
  "36": "B",
  "37": "A",
  "38": "B"
}
