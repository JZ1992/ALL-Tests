// var $dom ='<p>3.矩形、菱形都具有的性质是（　　）</p><p style="margin-left:-6.4000pt;">A.每一条对角线平分一组对角B.对角线相等</p><p style="margin-left:-6.4000pt;">C.对角线互相平分D.对角线互相垂直</p><p style="margin-left:-35.9500pt;">  4.检查一个门框是矩形的方法是（ ）</p><p style="margin-left:6.1500pt;">A、测量两条对角线是否相等. B、测量有三个角是直角. </p><p style="margin-left:-0.2500pt;">  C、测量两条对角线是否互相平分. D、 测量两条对角线是否互相垂直.</p><p style="margin-left:6.0500pt;">5.菱形的周长等于高的8倍，则其最大内角等于（ ） </p><p>A、60° B、90° C、120° D、150°</p>';
// // var _regex = /<p.*?>.*?<\/p.*?>/g;  //版本一: 检索所有的p标签（题干 和 选项（可能包含多个））
// var _regex = /<p.*?>\s*\d+.*?<\/p.*?>/g;  //版本二：检索题干
// $dom.match(_regex);


// // 选择题规则说明（纯文字）：
// 1. 题干和选项不能是同一行
// 2. 选项可以显示在同一行
// 3. 必须包含小题号
// 3. 小题命名必须是  1.  或者  1、  这样的格式 (符号：.、．  不支持1.1.2这种格式; 必须手写，不可以是图片)
// 4. 选项必须是大写字母 ； A. 或者 A、  这样的格式 (符号：.、． 选项内容不能出现选项格式； 必须手写，不可以是图片)； 


//选择题
window.cache = {
    // 题号
    // 23:{
    //     content:'题干内容',
    //     index:'小题号',
    //     options:['A*','A*''''']
    // }
};

function separateSelect(dom) {
    cache = {};
    var count = null;
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

            if (!cache[count].options.length) {
                cache[count].options = p_content[0].match(opRegx);
            } else {
                cache[count].options = cache[count].options.concat(p_content[0].match(opRegx));
            }

        } else {
            if (is_mainStem) {
                count = p_content[0].match(regexList.getIndex())[0]; //当前题号
            }
            if (!cache[count]) {
                cache[count] = {
                    index: count,
                    content: '',
                    options: [],
                }
            }
            cache[count].content += p_content + '\n';
            // console.log('当前小题：' + count);
            // console.log('内容：' + p_content[0]);
        }



        // console.log('\n');
        return matcher;
    });
    console.log(cache);
}



//选择题拆题
$(document).on('click', '.choiceQuestion', function () {
    // //删除空白p[只有空白和换行]标签
    // var pList = '';
    // var $dom = $('#content').clone();
    // $.each($dom.find('p'), function (index, pdom) {
    //     if ($(pdom).text()) {
    //         pList += $(pdom)[0].outerHTML;
    //     }
    // });
    // separateSelect(pList);


    //测试
    var pList = '';
    var $dom = $('#content').clone();
    console.log(separateTestQuestion(1, $dom[0].innerHTML));
});


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



window.fillCache = {
    // 题号
    // 55:{
    //     content:'整个小题内容',
    //     index:'题号55',
    //     options:['<u>     </u>','_________'-------]  //包含多少个下划线区域
    // }
};

function separateFill(dom) {
    fillCache = {};
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
            if (!fillCache[count]) {
                fillCache[count] = {
                    index: count,
                    content: p_content[0],
                    options: uMatch ? uMatch : [],
                }
            }
            // console.log('当前小题：' + count);
            // console.log('内容：' + p_content[0]);
            // console.log('填空个数：' + fillCache[count].options.length);
        } else if (count === null) {
            console.error('请标注小题题号:' + p_content[0]);
        } else {
            var uMatch = p_content[0].match(regexList.getFillUStem());
            fillCache[count].content += p_content[0] + '\n';
            if (uMatch) {
                fillCache[count].options = fillCache[count].options.concat(uMatch);
            }
            // console.log('当前小题：' + count);
            // console.log('内容：' + p_content[0]);
            // console.log('填空个数：' + fillCache[count].options.length);
        }

        // console.log('\n');
        return matcher;
    });
    console.log(fillCache);
}



//填空题拆题
$(document).on('click', '.fillQuestion', function () {
    // //删除空白p[只有空白和换行]标签
    // var pList = '';
    // var $dom = $('#content').clone();
    // $.each($dom.find('p'), function (index, pdom) {
    //     if ($(pdom).text()) {
    //         pList += $(pdom)[0].outerHTML;
    //     }
    // });
    // separateFill(pList);

    //测试
    var pList = '';
    var $dom = $('#content').clone();
    console.log(separateTestQuestion(2, $dom[0].innerHTML));
});



//**************************************************************************************************************************************************
//判断题************************************************************************************************************************
//***************************************************************************************************************************



window.judgeCache = {
    // //题号
    // 15:{
    //     content:'题干内容',
    //     index:'题号15',
    // }
};

function separateJudge(dom) {
    judgeCache = {};
    var count = null;
    var uList = '';
    var dom = dom.replace(regexList.clearSpace(), ' '); //空格转换
    dom = dom.replace(regexList.ignoreImg(), '<todo：img位置记录>'); //图片忽略

    // console.log(dom);
    dom.replace(regexList.filterP(), function (matcher) {

        //判断题：获取纯文本，直接判断小题个数
        var p_content = [$(matcher).text()]; //内容：p标签
        var isJudge = regexList.getJudgeIndex(); //是否是题干
        var is_mainStem = isJudge.test(p_content[0]);
        if (is_mainStem) {
            count = p_content[0].match(isJudge)[0]; //当前题号
            if (!judgeCache[count]) {
                judgeCache[count] = {
                    index: count,
                    content: p_content[0],
                }
            }
            // console.log('当前小题：' + count);
            // console.log('内容：' + p_content[0]);
        } else if (count === null) {
            console.error('请标注小题题号:' + p_content[0]);
        } else {
            judgeCache[count].content += p_content[0] + '\n';
            // console.log('当前小题：' + count);
            // console.log('内容：' + p_content[0]);
        }

        // console.log('\n');
        return matcher;
    });
    console.log(judgeCache);
}



//判断题拆题
$(document).on('click', '.judgeQuestion', function () {
    // //删除空白p[只有空白和换行]标签
    // var pList = '';
    // var $dom = $('#content').clone();
    // $.each($dom.find('p'), function (index, pdom) {
    //     if ($(pdom).text()) {
    //         pList += $(pdom)[0].outerHTML;
    //     }
    // });
    // separateJudge(pList);

    //测试
    var pList = '';
    var $dom = $('#content').clone();
    console.log(separateTestQuestion(3, $dom[0].innerHTML));
});





//**************************************************************************************************************************************************
//句子改错题************************************************************************************************************************
//***************************************************************************************************************************





//**************************************************************************************************************************************************
//完形填空************************************************************************************************************************
//***************************************************************************************************************************


window.clozeCache = {
    // //第几篇完形填空
    // 0: {
    //     content: '',//文章主体
    // // 15（题号）:
    //     {
    //         index:'题号',
    //         belongTo:'0',//属于第几篇文章阅读
    //         options:['A*','B*'----]
    //     }
    // // 16（题号）:
    // {
    //     index:'题号',
    //     belongTo:'0',//属于第几篇文章阅读
    //     options:['A*','B*'----]
    // }
    // }
};

//匹配文章开始，然后小题，匹配小题结束； 如果出现下一个完形填空，则继续匹配
function separateCloze(dom) {
    clozeCache = {};
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
                clozeCache[articleCount] = {
                    content: $content + '\n', //文章内容
                    // questions: {
                    //     index: 0,    //小题题号
                    //     options: [],  //关联小题题号
                    //     belongTo: articleCount, //属于哪一篇文章
                    // }
                }
            } else if (count === null) {
                //补全文章内容
                clozeCache[articleCount].content += $content + '\n';
            } else {
                //是否匹配到选项， 没有匹配到选项， 说明进入下一篇
                var uMatch = $content.match(regexList.options());

                //继续匹配未完成的第count题
                if (uMatch) {
                    clozeCache[articleCount][count].options = clozeCache[articleCount][count].options.concat(uMatch);
                } else {
                    //下一个完形填空大题目, count需要重新计数
                    articleCount++;
                    count = null;
                    clozeCache[articleCount] = {
                        content: $content + '\n', //文章内容
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
                clozeCache[articleCount][count] = {
                    index: count, //小题题号
                    options: [], //关联小题题号
                    belongTo: articleCount, //属于哪一篇文章
                };
                var uMatch = $content.match(regexList.options());
                if (!uMatch || !uMatch.length) {
                    console.error('完形填空的选项： 题号和选项A必须在同一【块】！');
                } else {
                    clozeCache[articleCount][count].options = uMatch;
                }
            } else {
                //匹配新的一题： 第二题开始

                count = $content.match(regexList.getClozeIndex())[0];
                clozeCache[articleCount][count] = {
                    index: count,
                    options: [],
                    belongTo: articleCount, //属于哪一篇文章
                };
                var uMatch = $content.match(regexList.options());
                if (!uMatch || !uMatch.length) {
                    console.error('完形填空的选项： 题号和选项A必须在同一【块】！');
                } else {
                    clozeCache[articleCount][count].options = uMatch;
                }
            }
        }

        return matcher;
    })
    console.log(clozeCache);
}

//完形填空拆题
$(document).on('click', '.clozeQuestion', function () {

    console.time('cloze');

    // //删除空白p[只有空白和换行]标签
    // var pList = '';
    // var $dom = $('#content').clone();
    // $.each($dom.find('p'), function (index, pdom) {
    //     if ($(pdom).text()) {
    //         pList += $(pdom)[0].outerHTML;
    //     }
    // });
    // separateCloze(pList);


    //测试
    var pList = '';
    var $dom = $('#content').clone();
    console.log(separateTestQuestion(4, $dom[0].innerHTML));




    console.timeEnd('cloze');
});









//**************************************************************************************************************************************************
//阅读理解（只针对选择题题型）************************************************************************************************************************
//***************************************************************************************************************************



//正则记录
window.regexList = {
    //浏览器兼容问题：使用最新版本的chrome，因为涉及到了正则表达式里面的后置约束（也就是回顾断言），其他浏览器不支持这种解析方式
    //块级概念：基于p标签
    //注意：正则匹配前， 转换前【除下划线的填空题】利用$dom.text()获取纯文本
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
    }

    //2. hasOption 判断是不是开始选项匹配
    //3. options  拆分选项



};


window.readingCache = {
    // //第几篇阅读
    // 0: {
    //     content: '',//文章主体
    // // 15（题号）:
    //     {
    //         content:'', //小题问题
    //         index:'题号',
    //         belongTo:'0',//属于第几篇文章阅读
    //         options:['A*','B*'----]
    //     }
    // // 16（题号）:
    // {
    //     content:'', //小题问题
    //     index:'题号',
    //     belongTo:'0',//属于第几篇文章阅读
    //     options:['A*','B*'----]
    // }
    // }
};

//文章部分：块开头不可以出现 『数字.』这种类型
//匹配文章开始，然后小题，匹配小题结束； 如果出现下一个阅读理解，则继续匹配
//发现小题号：开始匹配题干
//发现选项A：开始匹配选项
function separateReading(dom) {
    readingCache = {};
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
                readingCache[articleCount] = {
                    content: $content + '\n', //文章内容
                }
            } else if (count === null) {
                //补全文章内容
                readingCache[articleCount].content += $content + '\n';
            } else {

                //步骤：
                //1. 先判断时是不是还在抓取count小题？
                //2. 抓取题干还是小题？

                // //继续匹配未完成的第count题
                // readingCache[articleCount][count]：存在表示抓取小题中
                // uMatch: 
                // readingCache[articleCount][count].options.length: 长度没空表示未抓取小题

                //是否匹配到选项
                var uMatch = $content.match(regexList.options());
                if (uMatch) {
                    //抓取小题的选项过程
                    readingCache[articleCount][count].options = readingCache[articleCount][count].options.concat(uMatch);
                } else {

                    //第count题 匹配项为空，表示第一次抓取小题选项
                    if (!readingCache[articleCount][count].options.length) {
                        readingCache[articleCount][count].content += $content + '\n';
                    } else {
                        //第count题不为空: 表示已经开始下一篇阅读
                        //下一个阅读理解, count需要重新计数
                        articleCount++;
                        count = null;
                        readingCache[articleCount] = {
                            content: $content + '\n', //文章内容
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
                readingCache[articleCount][count] = {
                    index: count, //小题题号
                    options: [], //关联小题题号
                    belongTo: articleCount, //属于哪一篇文章
                    content: $content,
                };

            } else {
                //匹配新的一题： 第二题开始

                count = $content.match(isStartWithNum)[0];
                readingCache[articleCount][count] = {
                    index: count,
                    options: [],
                    belongTo: articleCount, //属于哪一篇文章
                    content: $content,
                };
                // var uMatch = $content.match(regexList.options());
                // if (!uMatch || !uMatch.length) {
                //     console.error('完形填空的选项： 题号和选项A必须在同一【块】！');
                // } else {
                //     readingCache[articleCount][count].options = uMatch;
                // }
            }
        }

        return matcher;
    })
    console.log(readingCache);
}


//阅读理解拆题
$(document).on('click', '.readingQuestion', function () {

    console.time('reading');

    //删除空白p[只有空白和换行]标签
    var pList = '';
    var $dom = $('#content').clone();
    $.each($dom.find('p'), function (index, pdom) {
        if ($(pdom).text()) {
            pList += $(pdom)[0].outerHTML;
        }
    });
    separateReading(pList);

    //测试
    var pList = '';
    var $dom = $('#content').clone();
    console.log(separateTestQuestion(5, $dom[0].innerHTML));

    console.timeEnd('reading');
});
