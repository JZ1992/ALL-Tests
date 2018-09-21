(function () {

    //正则记录
    var regexList = {
        //浏览器兼容问题：使用最新版本的chrome，因为涉及到了正则表达式里面的后置约束（也就是回顾断言），其他浏览器不支持这种解析方式
        //块级概念：基于p标签
        //除了题号外：避免每行数字开头
        //************* 公共部分************************
        clearSpace: function () {
            // /&nbsp;/g, //空格转换
            return new RegExp('&nbsp;', 'g');
        },
        ignoreImg: function () {
            // /<img.*?>/ig, //图片忽略
            //todo:2期记录图片位置，用于保存图片的
            return new RegExp('<img.*?>', 'g');
        },
        filterP: function () {
            // /<p.*?>.*?<\/p.*?>/g, //筛选p标签
            return new RegExp('<p.*?>.*?<\\/p.*?>', 'g');
        },
        getPText: function () {
            // /(?<=(<p.*>)).*(?=(<\/p.*>))/g, //获取p标签内容
            return new RegExp('(?<=(<p.*>)).*(?=(<\\/p.*>))', 'g');
        },


        //****************************************  ***********************************************************************
        //************* 1.选择题********************************************************************************
        //***************************************************************************************

        //选择题号规则： 1. 1、 1．
        isStem: function () {
            // 忽略html标签
            return new RegExp('\\s*(<\\w+.*?>)*(\\d+).*?[.、．]+(</\\w+.*?>)*.*', 'g');
        },
        //拆分选项
        options: function () {
            // ABCD..字母跟着符号的格式 
            //选项之间存在空格
            //选项不能跨块
            return new RegExp('([A-Z][.、．].*?)(?=([A-Z][.、．]))|(?<=([A-Z][.、．].*))([A-Z][.、．].*)|(?<!([A-Z][.、．].*))([A-Z][.、．].*)(?!([A-Z][.、．]))', 'g');
        },
        getIndex: function () {
            //获取题号
            return new RegExp('(?<=(\\s*(<\\w+.*?>)*))(\\d+)(?=(.*?[.、．]+(</\\w+.*?>)*)*)', 'g');
        },


        //***************************************************************************************************************
        //************* 2.填空题********************************************************************************
        //***************************************************************************************

        //填空题的题号规则
        //选择题号规则： 1. 1、 1． (1)  （1）  
        isFill: function () {
            // 混合（数字）、(数字)、 数字（符号） 
            return new RegExp('((\\s*[(（]\\s*(\\d+)\\s*[)）])|(?<=(\\s*))(\\d+)(?=([.、．]+))).*', 'g');
        },
        //获取题号（没有题号就表示还未检索到下一题）
        getFillIndex: function () {
            // /(?<=(\s*([(（]\s*)))(\d+)(?=(\s*[)）]))|(?<=(\s*))(\d+)(?=([.、．]+))/g,
            return new RegExp('(?<=(\\s*([(（]\\s*)))(\\d+)(?=(\\s*[)）]))|(?<=(\\s*))(\\d+)(?=([.、．]+))', 'g');
        },
        //获取下划线区域
        getFillUStem: function () {
            // u标签或者_(下划线)
            return new RegExp('<u.*?>\\s+.*?<\\/u>|(?<=([^_]+))(_+)(?=([^_]*))', 'g');
        },


        //***************************************************************************************************************
        //************* 3.判断题（直接判断小题个数即可）*****************************************************
        //***************************************************************************************

        getJudgeIndex: function () {
            //根据题号规则获取
            //选择题号规则： 1. 1、 1． (1)  （1） 
            return new RegExp('(?<=(.*?[(（]*.*?))(\\d+)(?=(.*?[)）]*.*?[.、．]*.*))', 'g');
        },


        //***************************************************************************************************************
        //************* 4.改错题（拆解规则属于填空题，使用下划线，默认每个题两个下划线区域）******************
        //***************************************************************************************


        //***************************************************************************************************************
        //*************5.完形填空  ***************************************************************
        //*****************************************************

        //复制从文章题干开始, 到小题最后的选项结束
        //题干和选项不能再同一【块】
        //数字起头或者 括号+数字起头:判定为选择题
        //每个选项内容不能跨【块】

        //如果是完形填空
        //格式  题号和选项A一定要在同一块


        //选项题号A[.、．]
        //选项之间必须存在空格

        //获取题号：
        getClozeIndex: function () {
            return new RegExp('(?<=(\\s*[(]*\\s*))(\\d+)(?=((\\s*[)]*[.、．]*\\s*).*?))', 'g');
        },

        //和小题一块存在选项，
        //1.有小题和 选项A就是完形填空【选项A一定要和题号处于同一块】
        hasOption: function () {
            return new RegExp('[A][.、．].*?', 'g');
        },

        //获取选选项的方法和选择题一致


        //***************************************************************************************************************
        //*************6.阅读理解【只针对选择题类型的阅读理解】  ***************************************************************
        //*****************************************************

        //复制从文章题干开始, 到小题最后的选项结束
        //题干和选项不能再同一【块】
        //数字起头或者 括号+数字起头:判定为选择题
        //每个选项内容不能跨【块】

        //阅读理解
        //小题题干和选项一定要分【块】


        //选项题号A[.、．]
        //选项之间必须存在空格

        //获取题号：

        //1.没有获取到题号就默认为是文章主题内容
        isStartWithNum: function () {
            return new RegExp('(?<=(^\\s*[(（]*\\s*[)）]*)*)(\\d+)(?=([.、．]\\s*))', 'g');
        },
        hasWordBeforeNum: function () {
            //『题号类型数字』 前面出现除 空格、中英文括号 字符
            return new RegExp('(?<=([a-zA-Z].*?))(\\d+)(?=([.、．]\\s*))', 'g');
        },

        //2. hasOption 判断是不是开始选项匹配
        //3. options  拆分选项


        //***************************************************************************************************************
        //*************  设置数据格式  ***************************************************************
        //*****************************************************
        setDataChar: function () {
            return new RegExp('\\s*(?<=([A-Z]))\\s*.*', 'g');
        },
        setDataContent: function () {
            return new RegExp('(\\s*[A-Z]\\s*[.、．])', 'g');
        },
        setDataTitle: function () {
            // return new RegExp('(\\s*[(（]*\\s*[)）]*\\s*[0-9]+\\s*[.、．])', 'g');
            return new RegExp('(^.*?[0-9]+.*?\.)||((^.*?[(（]\\s*[0-9]+\\s*[）)]))', 'g');
        },

    };


    // array('tid'=>'1', 'name'=>'选择题', 'sub'=>'0'),
    // array('tid'=>'2', 'name'=>'填空题', 'sub'=>'0'),
    // array('tid'=>'3', 'name'=>'综合题', 'sub'=>'0'),
    // array('tid'=>'4', 'name'=>'判断题', 'sub'=>'0'),
    // array('tid'=>'5', 'name'=>'匹配题', 'sub'=>'0'),
    // array('tid'=>'6', 'name'=>'排序题', 'sub'=>'0'),
    // array('tid'=>'7', 'name'=>'其他', 'sub'=>'0'),
    // array('tid'=>'8', 'name'=>'补全对话', 'sub'=>'3'),
    // array('tid'=>'9', 'name'=>'完形填空', 'sub'=>'3'),
    // array('tid'=>'10', 'name'=>'句子改错', 'sub'=>'3'),
    // array('tid'=>'11', 'name'=>'改错题', 'sub'=>'8'),
    'use strict';
    var typeIdRelation = {
        //key：typeId题目类型
        //value: 对应拆题类型
        //选择题：1
        //填空题(下划线)：2
        //判断题：3
        //完形填空：4
        //阅读理解（选择类型）：5
        1: 1,
        2: 2,
        3: 5,
        4: 3,
        5: null,
        6: null,
        7: 5,
        8: 2,
        9: 4,
        10: 4,
        11: 4,
        12: 1,
        13: null,
    };
    var setType = 0;

    // {
    //     tplId:'',
    //     typeId:'',
    //     html:''
    // }
    window.separateTestQuestion = function (param) {
        // typeId:题目类型
        // html：编辑器：带html结构的内容

        var tplId = param.tplId, html = param.html;
        setType = param.typeId;
        var returnJSON,
            _html = filterHTML(html);
        switch (typeIdRelation[tplId]) {
            //选择题：1
            //填空题(下划线)：2
            //判断题：3
            //完形填空：4
            //阅读理解（选择类型）：5
            case 1:
                returnJSON = separateSelect(_html);
                break;
            case 2:
                returnJSON = separateFill(_html);
                break;
            case 3:
                returnJSON = separateJudge(_html);
                break;
            case 4:
                returnJSON = separateCloze(_html);
                break;
            case 5:
                returnJSON = separateReading(_html);
                break;
            default:
                break;
        }
        return returnJSON;
    };


    //启动：解析数据
    function filterHTML(html) {

        var _html = '', lastHtml = '';
        //todo:筛选下划线(span:text-decoration: underline | u标签 | _____) 和 图片
        _html = html.replace(/<\/p>/g, '<\/p>##newline##');
        var $newHtml = $('<div>' + _html + '</div>');
        $.each($newHtml.find('span'), function (index, spanHtml) {
            if ($(spanHtml)[0].style.textDecoration === 'underline' || $(spanHtml)[0].style.textDecorationLine === 'underline') {
                var uText = $(spanHtml).text() || '      ';
                $(spanHtml).html('#uStart#' + uText + '#uEnd#');
            }
        });

        // $.each($newHtml.find('u'), function (index, uHtml) {
        //     var uText = $(uHtml).text() || '      '
        //     $(uHtml).html('#uStart#' + uText + '#uEnd#');
        // });

        //去除格式:获取纯文本
        _html = $newHtml.text();
        //添加下划线
        _html = _html.replace(/#uStart#/g, '<u>');
        _html = _html.replace(/#uEnd#/g, '<\/u>');

        $.each(_html.split('##newline##'), function (index, pdom) {
            if (pdom) {
                var $p = $('<p>' + pdom + '</p>');
                if ($p.text()) {
                    lastHtml += '<p>' + pdom + '</p>';
                }
            }
        });
        return lastHtml;

        // return html
    }


    // //选择题
    // window.returnJSON = {
    //     // 题号
    //     // 23:{
    //     //     content:'题干内容',
    //     //     index:'小题号',
    //     //     options:['A*','A*''''']
    //     // }
    // };

    //设置选择题类型的JSON
    function setSelectJSON(source) {
        var type = setType;
        var _json = [];
        var count = 0;
        $.each(source, function (key, value) {
            count++;
            var _options = [],
                _answer = {},
                stem = {
                    index: parseInt(value.index),
                    // "title": value.content,
                    "title": (function () {
                        return value.content.replace(regexList.setDataTitle(), '');
                    })(),
                    "sm_topic": {
                        "1": {
                            "title": "",
                            "options": _options,
                            "type": type,
                            "details": ""
                        }
                    },
                    "types": type,
                    "answer": _answer,
                    "details": "",
                    "id": ""
                };
            value.options.forEach(function (option, index) {
                _options.push({
                    "order": index + 1,
                    "optionno": (function () {
                        //获取字母
                        return option.replace(regexList.setDataChar(), '');
                    })(),
                    "content": (function () {
                        //获取文字
                        return option.replace(regexList.setDataContent(), '');
                    })(),
                });
            });
            _answer[1] = {
                "answer": [1],
                "addanswer": "",
                "is_obj": 1
            };
            _json.push(stem);
        });
        //a按题号排序
        _json.sort(function (next, pre) {
            return next.index - pre.index;
        });
        return _json;
    }

    //选择题拆题
    function separateSelect(dom) {
        var count = null, returnJSON = {};
        var dom = dom.replace(regexList.clearSpace(), ' '); //空格转换
        dom = dom.replace(regexList.ignoreImg(), '<todo：img位置记录>'); //图片忽略
        // console.log(dom);
        dom.replace(regexList.filterP(), function (matcher) {

            var pRegx = regexList.getPText(); //获取p标签的内容
            var isStem = regexList.isStem(); //是否是题干

            var p_content = matcher.match(pRegx);

            //选项：一行一个或者一行多个
            var is_select = regexList.options().test(p_content[0]);
            var is_mainStem = isStem.test(p_content[0]);
            var hasWordBeforeNum = regexList.hasWordBeforeNum().test(p_content[0]);
            // console.log('类型：' + (!is_select ? '题干' : '选项'));


            //题干(换行的情况)
            if (is_select) {
                //选项拆题．
                var opRegx = regexList.options(); //拆分x选项
                // console.log('当前小题：' + count);
                // console.log('内容：' + p_content[0]);
                // console.log('小题拆分' + p_content[0].match(opRegx));

                if (count === null) {
                    alert('检查第一题题号是否存在！\n  或者选项和题干之间添加空行！')
                    return matcher;
                }

                if (!returnJSON[count].options.length) {
                    returnJSON[count].options = p_content[0].match(opRegx);
                } else {
                    returnJSON[count].options = returnJSON[count].options.concat(p_content[0].match(opRegx));
                }

            } else {
                if (is_mainStem && !hasWordBeforeNum) {
                    count = p_content[0].match(regexList.getIndex())[0]; //当前题号
                }
                if (!returnJSON[count]) {
                    returnJSON[count] = {
                        index: count,
                        content: '',
                        options: [],
                    }
                }
                returnJSON[count].content += p_content + '<br>';
                // console.log('当前小题：' + count);
                // console.log('内容：' + p_content[0]);
            }
            return matcher;
        });

        return setSelectJSON(returnJSON);
        // return JSON.stringify(setSelectJSON(returnJSON));
    }


    //**************************************************************************************************************************************************
    //填空题拆题************************************************************************************************************************
    //***************************************************************************************************************************


    //填空题规则说明（纯文字）：
    //1. 多个小题不能再同一行
    //2. 每个小题必须包含题号
    //3. 填空的位置必须使用下划线的格式
    //4. 非填空位置不得出现下划线
    //5. 下划线允许跨行，但必须是连续行， 中间不能出现空白行
    //6. 多个下滑线在同一行时候， 中间必须存在空白分割
    //题号符号：.、．  (1)
    //格式 1. 1、 1．  (1)   （1）
    //下划线可以使用英文字符下划线(左侧存在分割符号)或者  格式化里面的下划线_


    // window.returnJSON = {
    //     // 题号
    //     // 55:{
    //     //     content:'整个小题内容',
    //     //     index:'题号55',
    //     //     options:['<u>     </u>','_________'-------]  //包含多少个下划线区域
    //     // }
    // };

    //设置填空题类型的JSON
    function setFillJSON(source) {
        var type = setType;
        var _json = [];
        $.each(source, function (key, value) {
            var _answer = {
                    1: {}
                },
                stem = {
                    index: parseInt(value.index),
                    // "title": value.content,
                    title: (function () {
                        return value.content.replace(regexList.setDataTitle(), '');
                    })(),
                    "sm_topic": {
                        "1": {
                            "title": "",
                            "options": [],
                            "type": type,
                            "details": ""
                        }
                    },
                    "types": type,
                    "answer": _answer,
                    "details": "",
                    "id": ""
                };
            value.options.forEach(function (option, index) {
                _answer[1][index + 1] = {
                    "answer": '',
                    "addanswer": "",
                    "is_obj": 1
                };
            });
            _json.push(stem);
        });
        //a按题号排序
        _json.sort(function (next, pre) {
            return next.index - pre.index;
        });
        return _json;
    }

    //填空题拆题
    function separateFill(dom) {
        var returnJSON = {};
        var count = null;
        var uList = '';
        var dom = dom.replace(regexList.clearSpace(), ' '); //空格转换
        dom = dom.replace(regexList.ignoreImg(), '<todo：img位置记录>'); //图片忽略

        // console.log(dom);
        dom.replace(regexList.filterP(), function (matcher) {

            var pRegx = regexList.getPText(); //正则：获取p标签的内容
            var p_content = matcher.match(pRegx); //内容：p标签
            var isFill = regexList.isFill(); //是否是题干
            var is_mainStem = isFill.test(p_content[0]);
            if (is_mainStem) {
                count = p_content[0].match(regexList.getFillIndex())[0]; //当前题号
                var uMatch = p_content[0].match(regexList.getFillUStem());
                if (!returnJSON[count]) {
                    returnJSON[count] = {
                        index: count,
                        content: p_content[0],
                        options: uMatch ? uMatch : [],
                    }
                }
                // console.log('当前小题：' + count);
                // console.log('内容：' + p_content[0]);
                // console.log('填空个数：' + returnJSON[count].options.length);
            } else if (count === null) {
                console.error('请标注小题题号:' + p_content[0]);
            } else {
                var uMatch = p_content[0].match(regexList.getFillUStem());
                returnJSON[count].content += '<br>'+p_content[0];
                if (uMatch) {
                    returnJSON[count].options = returnJSON[count].options.concat(uMatch);
                }
                // console.log('当前小题：' + count);
                // console.log('内容：' + p_content[0]);
                // console.log('填空个数：' + returnJSON[count].options.length);
            }
            return matcher;
        });
        return setFillJSON(returnJSON);
        // return JSON.stringify(setFillJSON(returnJSON));
    }


    //**************************************************************************************************************************************************
    //判断题************************************************************************************************************************
    //***************************************************************************************************************************

    // window.returnJSON = {
    //     // //题号
    //     // 15:{
    //     //     content:'题干内容',
    //     //     index:'题号15',
    //     // }
    // };

    //设置判断题类型的JSON
    function setJudgeJSON(source) {
        var type = setType;
        var _json = [];
        $.each(source, function (key, value) {
            var _answer = {},
                stem = {
                    index: parseInt(value.index),
                    // "title": value.content,
                    title: (function () {
                        return value.content.replace(regexList.setDataTitle(), '');
                    })(),
                    "sm_topic": {
                        "1": {
                            "title": "",
                            "options": [
                                {		//选项1
                                    "order": 1,		//选项序号，INT
                                    "optionno": "对",	//选项标识，字串
                                    "content": ""		//选项内容，字串
                                },
                                {		//选项2
                                    "order": 2,
                                    "optionno": "错",
                                    "content": ""
                                }
                            ],
                            "type": type,
                            "details": ""
                        }
                    },
                    "types": type,
                    "answer": _answer,
                    "details": "",
                    "id": ""
                };
            _answer[1] = {
                "answer": [1],
                "addanswer": "",
                "is_obj": 1
            };
            _json.push(stem);
        });
        //a按题号排序
        _json.sort(function (next, pre) {
            return next.index - pre.index;
        });
        return _json;
    }

    //判断题拆题
    function separateJudge(dom) {
        var returnJSON = {};
        var count = null;
        var uList = '';
        var dom = dom.replace(regexList.clearSpace(), ' '); //空格转换
        dom = dom.replace(regexList.ignoreImg(), '<todo：img位置记录>'); //图片忽略

        // console.log(dom);
        // dom.replace(regexList.filterP(), function (matcher) {
        //
        //     //判断题：获取纯文本，直接判断小题个数
        //     var p_content = [$(matcher).text()]; //内容：p标签
        //     var isJudge = regexList.getJudgeIndex(); //是否是题干
        //     var is_mainStem = isJudge.test(p_content[0]);
        //     if (is_mainStem) {
        //         count = p_content[0].match(isJudge)[0]; //当前题号
        //         if (!returnJSON[count]) {
        //             returnJSON[count] = {
        //                 index: count,
        //                 content: p_content[0],
        //             }
        //         }
        //         // console.log('当前小题：' + count);
        //         // console.log('内容：' + p_content[0]);
        //     } else if (count === null) {
        //         console.error('请标注小题题号:' + p_content[0]);
        //     } else {
        //         returnJSON[count].content += p_content[0] + '<br>';
        //         // console.log('当前小题：' + count);
        //         // console.log('内容：' + p_content[0]);
        //     }
        //     return matcher;
        // });

        dom.replace(regexList.filterP(), function (matcher) {

            var pRegx = regexList.getPText(); //正则：获取p标签的内容
            var p_content = matcher.match(pRegx); //内容：p标签
            var isFill = regexList.isFill(); //是否是题干
            var is_mainStem = isFill.test(p_content[0]);
            if (is_mainStem) {
                count = p_content[0].match(regexList.getFillIndex())[0]; //当前题号
                var uMatch = p_content[0].match(regexList.getFillUStem());
                if (!returnJSON[count]) {
                    returnJSON[count] = {
                        index: count,
                        content: p_content[0],
                        options: uMatch ? uMatch : [],
                    }
                }
                // console.log('当前小题：' + count);
                // console.log('内容：' + p_content[0]);
                // console.log('填空个数：' + returnJSON[count].options.length);
            } else if (count === null) {
                console.error('请标注小题题号:' + p_content[0]);
            } else {
                var uMatch = p_content[0].match(regexList.getFillUStem());
                returnJSON[count].content += '<br>'+p_content[0];
                if (uMatch) {
                    returnJSON[count].options = returnJSON[count].options.concat(uMatch);
                }
                // console.log('当前小题：' + count);
                // console.log('内容：' + p_content[0]);
                // console.log('填空个数：' + returnJSON[count].options.length);
            }
            return matcher;
        });

        return setJudgeJSON(returnJSON);
        // return JSON.stringify(setJudgeJSON(returnJSON));
    }


    //**************************************************************************************************************************************************
    //句子改错题************************************************************************************************************************
    //***************************************************************************************************************************


    //**************************************************************************************************************************************************
    //完形填空************************************************************************************************************************
    //***************************************************************************************************************************


    // window.returnJSON = {
    //     // //第几篇完形填空
    //     // 0: {
    //     //     content: '',//文章主体
    //     // // 15（题号）:
    //     //     {
    //     //         index:'题号',
    //     //         belongTo:'0',//属于第几篇文章阅读
    //     //         options:['A*','B*'----]
    //     //     }
    //     // // 16（题号）:
    //     // {
    //     //     index:'题号',
    //     //     belongTo:'0',//属于第几篇文章阅读
    //     //     options:['A*','B*'----]
    //     // }
    //     // }
    // };

    //设置完形填空类型的JSON
    function setClozeJSON(source) {
        var type = setType;
        var _json = [];
        $.each(source, function (key, value) {
            //key: 第几篇
            //value: 包含了选项以及题干
            var _option = [];
            var _answer = {},
                _subStemList = [],
                _subStem = {},
                stem = {
                    index: parseInt(key),
                    "title": value.content,
                    "sm_topic": _subStem,
                    "types": type,
                    "answer": _answer,
                    "details": "",
                    "id": ""
                };
            $.each(value, function (stemIndex, option) {
                if (stemIndex !== 'content') {
                    _option = [];
                    option.options.forEach(function (oneOp, oneIndex) {
                        _option.push({
                            "order": oneIndex + 1,
                            "optionno": (function () {
                                //获取字母
                                return oneOp.replace(regexList.setDataChar(), '');
                            })(),
                            "content": (function () {
                                //获取文字
                                return oneOp.replace(regexList.setDataContent(), '');
                            })(),
                        });
                    });
                    _subStemList.push({
                        index: option.index, //记录小题号
                        "title": "",
                        "options": _option,
                        "type": type,
                        "details": ""
                    });
                }
            });
            //每个完形填空内的小题排序
            _subStemList.sort(function (next, pre) {
                return next.index - pre.index;
            });
            _subStemList.forEach(function (stem, index) {
                _subStem[index + 1] = stem;
                _answer[index + 1] = {
                    "answer": [1],
                    "addanswer": "",
                    "is_obj": 1
                }
            });

            _json.push(stem);
        });
        //a按题号排序
        _json.sort(function (next, pre) {
            return next.index - pre.index;
        });
        return _json;
    }

    //匹配文章开始，然后小题，匹配小题结束； 如果出现下一个完形填空，则继续匹配
    function separateCloze(dom) {
        var returnJSON = {};
        var articleCount = null; //文章个数
        var count = null;
        var uList = '';
        var dom = dom.replace(regexList.clearSpace(), ' '); //空格转换
        dom = dom.replace(regexList.ignoreImg(), '<todo：img位置记录>'); //图片忽略

        // console.log(dom);
        dom.replace(regexList.filterP(), function (matcher) {

            var pRegx = regexList.getPText(); //正则：获取p标签的内容
            var p_content = matcher.match(pRegx); //内容：p标签
            if (!p_content || !p_content.length) {
                return matcher;
            }
            var $content = p_content[0];
            var getClozeIndex = regexList.getClozeIndex();
            var has_stem_index = getClozeIndex.test($content) && regexList.hasOption().test($content); //是否选项区域

            if (has_stem_index) {
                //（数字）或者数字开头的，才可以判定位选项
                var hasWordBeforNum = regexList.hasWordBeforeNum().test($content);
                has_stem_index = hasWordBeforNum ? false : true;
            }


            //错误处理（没有复制阅读文章）
            if (has_stem_index && articleCount === null) {
                console.error('请注意：缺少阅读文章！');
                return matcher;
            }

            //文章主体(不是选项区域)
            if (!has_stem_index) {
                //第一篇文章开始
                if (articleCount === null) {
                    articleCount = 0;
                    returnJSON[articleCount] = {
                        content: $content + '<br>', //文章内容
                        // questions: {
                        //     index: 0,    //小题题号
                        //     options: [],  //关联小题题号
                        //     belongTo: articleCount, //属于哪一篇文章
                        // }
                    }
                } else if (count === null) {
                    //补全文章内容
                    returnJSON[articleCount].content += $content + '<br>';
                } else {
                    //是否匹配到选项， 没有匹配到选项， 说明进入下一篇
                    var uMatch = $content.match(regexList.options());

                    //继续匹配未完成的第count题
                    if (uMatch) {
                        returnJSON[articleCount][count].options = returnJSON[articleCount][count].options.concat(uMatch);
                    } else {
                        //下一个完形填空大题目, count需要重新计数
                        articleCount++;
                        count = null;
                        returnJSON[articleCount] = {
                            content: $content + '<br>', //文章内容
                            // questions: {
                            //     index: 0,    //小题题号
                            //     options: [],  //关联小题题号
                            //     belongTo: articleCount, //属于哪一篇文章
                            // }
                        }
                    }
                }

            } else {


                //是选项区域？
                //小题号是否为空? 为空表示刚开始匹配

                //初次匹配到题号
                if (count === null) {

                    count = $content.match(regexList.getClozeIndex())[0];
                    returnJSON[articleCount][count] = {
                        index: count, //小题题号
                        options: [], //关联小题题号
                        belongTo: articleCount, //属于哪一篇文章
                    };
                    var uMatch = $content.match(regexList.options());
                    if (!uMatch || !uMatch.length) {
                        console.error('完形填空的选项： 题号和选项A必须在同一【块】！');
                    } else {
                        returnJSON[articleCount][count].options = uMatch;
                    }
                } else {
                    //匹配新的一题： 第二题开始

                    count = $content.match(regexList.getClozeIndex())[0];
                    returnJSON[articleCount][count] = {
                        index: count,
                        options: [],
                        belongTo: articleCount, //属于哪一篇文章
                    };
                    var uMatch = $content.match(regexList.options());
                    if (!uMatch || !uMatch.length) {
                        console.error('完形填空的选项： 题号和选项A必须在同一【块】！');
                    } else {
                        returnJSON[articleCount][count].options = uMatch;
                    }
                }
            }

            return matcher;
        });
        return setClozeJSON(returnJSON);
        // return JSON.stringify(setClozeJSON(returnJSON));
    }


    //**************************************************************************************************************************************************
    //阅读理解（只针对选择题题型）************************************************************************************************************************
    //***************************************************************************************************************************


    // window.returnJSON = {
    //     // //第几篇阅读
    //     // 0: {
    //     //     content: '',//文章主体
    //     // // 15（题号）:
    //     //     {
    //     //         content:'', //小题问题
    //     //         index:'题号',
    //     //         belongTo:'0',//属于第几篇文章阅读
    //     //         options:['A*','B*'----]
    //     //     }
    //     // // 16（题号）:
    //     // {
    //     //     content:'', //小题问题
    //     //     index:'题号',
    //     //     belongTo:'0',//属于第几篇文章阅读
    //     //     options:['A*','B*'----]
    //     // }
    //     // }
    // };


    //文章部分：块开头不可以出现 『数字.』这种类型
    //匹配文章开始，然后小题，匹配小题结束； 如果出现下一个阅读理解，则继续匹配
    //发现小题号：开始匹配题干
    //发现选项A：开始匹配选项

    //设置阅读理解类型的JSON
    function setReadingJSON(source) {
        var type = setType;
        var _json = [];
        $.each(source, function (key, value) {
            //key: 第几篇
            //value: 包含了选项以及题干
            var _option = [];
            var _answer = {},
                _subStemList = [],
                _subStem = {},
                stem = {
                    index: parseInt(key),
                    "title": value.content,
                    "sm_topic": _subStem,
                    "types": type,
                    "answer": _answer,
                    "details": "",
                    "id": ""
                };
            $.each(value, function (stemIndex, option) {
                if (stemIndex !== 'content') {
                    _option = [];
                    option.options.forEach(function (oneOp, oneIndex) {
                        _option.push({
                            "order": oneIndex + 1,
                            "optionno": (function () {
                                //获取字母
                                return oneOp.replace(regexList.setDataChar(), '');
                            })(),
                            "content": (function () {
                                //获取文字
                                return oneOp.replace(regexList.setDataContent(), '');
                            })(),
                        });
                    });
                    _subStemList.push({
                        index: option.index, //记录小题号
                        // "title": option.content,
                        title: (function () {
                            return option.content.replace(regexList.setDataTitle(), '');
                        })(),
                        "options": _option,
                        "type": 1, //todo：默认选择类型，待扩展其他类型
                        "details": ""
                    });
                }
            });
            //每个完形填空内的小题排序
            _subStemList.sort(function (next, pre) {
                return next.index - pre.index;
            });
            _subStemList.forEach(function (stem, index) {
                _subStem[index + 1] = stem;
                _answer[index + 1] = {
                    1: {
                        "answer": [1],
                        "addanswer": "",
                        "is_obj": 1
                    }
                }
            });

            _json.push(stem);
        });
        //a按题号排序
        _json.sort(function (next, pre) {
            return next.index - pre.index;
        });
        return _json;
    }


    function separateReading(dom) {
        var returnJSON = {};
        var articleCount = null; //文章个数
        var count = null;
        var uList = '';
        var dom = dom.replace(regexList.clearSpace(), ' '); //空格转换
        dom = dom.replace(regexList.ignoreImg(), '<todo：img位置记录>'); //图片忽略

        // console.log(dom);
        dom.replace(regexList.filterP(), function (matcher) {

            var pRegx = regexList.getPText(); //正则：获取p标签的内容
            var p_content = matcher.match(pRegx); //内容：p标签
            if (!p_content || !p_content.length) {
                return matcher;
            }
            var $content = p_content[0];
            var isStartWithNum = regexList.isStartWithNum();
            var hasWordBeforNum = regexList.hasWordBeforeNum().test($content);
            var hasNum = isStartWithNum.test($content); //是否选项区域
            var has_stem_index = !hasWordBeforNum && hasNum ? true : false;


            //错误处理（没有复制阅读文章）
            if (has_stem_index && articleCount === null) {
                console.error('请注意：缺少阅读文章！');
                return matcher;
            }

            //文章主体(不是选项区域)
            if (!has_stem_index) {
                //第一篇文章开始
                if (articleCount === null) {
                    articleCount = 0;
                    returnJSON[articleCount] = {
                        content: $content + '<br>', //文章内容
                    }
                } else if (count === null) {
                    //补全文章内容
                    returnJSON[articleCount].content += $content + '<br>';
                } else {

                    //步骤：
                    //1. 先判断时是不是还在抓取count小题？
                    //2. 抓取题干还是小题？

                    // //继续匹配未完成的第count题
                    // returnJSON[articleCount][count]：存在表示抓取小题中
                    // uMatch: 
                    // returnJSON[articleCount][count].options.length: 长度没空表示未抓取小题

                    //是否匹配到选项
                    var uMatch = $content.match(regexList.options());
                    if (uMatch) {
                        //抓取小题的选项过程
                        returnJSON[articleCount][count].options = returnJSON[articleCount][count].options.concat(uMatch);
                    } else {

                        //第count题 匹配项为空，表示第一次抓取小题选项
                        if (!returnJSON[articleCount][count].options.length) {
                            returnJSON[articleCount][count].content += $content + '<br>';
                        } else {
                            //第count题不为空: 表示已经开始下一篇阅读
                            //下一个阅读理解, count需要重新计数
                            articleCount++;
                            count = null;
                            returnJSON[articleCount] = {
                                content: $content + '<br>', //文章内容
                            }
                        }

                    }
                }

            } else {


                //是选项区域？
                //小题号是否为空? 为空表示刚开始匹配

                //初次匹配到题号
                if (count === null) {

                    count = $content.match(isStartWithNum)[0];
                    returnJSON[articleCount][count] = {
                        index: count, //小题题号
                        options: [], //关联小题题号
                        belongTo: articleCount, //属于哪一篇文章
                        content: $content,
                    };

                } else {
                    //匹配新的一题： 第二题开始

                    count = $content.match(isStartWithNum)[0];
                    returnJSON[articleCount][count] = {
                        index: count,
                        options: [],
                        belongTo: articleCount, //属于哪一篇文章
                        content: $content,
                    };
                    // var uMatch = $content.match(regexList.options());
                    // if (!uMatch || !uMatch.length) {
                    //     console.error('完形填空的选项： 题号和选项A必须在同一【块】！');
                    // } else {
                    //     returnJSON[articleCount][count].options = uMatch;
                    // }
                }
            }

            return matcher;
        });
        return setReadingJSON(returnJSON);
        // return JSON.stringify(setReadingJSON(returnJSON));
    }


})()
