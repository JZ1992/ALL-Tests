#encoding=utf-8
from .convert_latex import to_latex
import mammoth
import sys,os, base64,re,uuid
from .config import ques_types
from .config import key_words
from .config import subjects
from .config import ques_types_class
from . import pymysql_lib
from ..settings import IMGS_DIRS
from . import py_curl 
from ..settings import DATABASES

import time,json
import hashlib
# from utils.remove_file_folder import delete_file_folder


# inputFile = 'D:/TOM/docx2html/bank/2017届小升初第七次模拟考试卷（英语）.docx'
# newFile = 'D:/TOM/docx2html/bank/n2017届小升初第七次模拟考试卷（英语）.docx'
# outputFile = 'D:/TOM/docx2html/bank/2017届小升初第七次模拟考试卷（英语）.html'


#大题切分
# bigQues_re = {1:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*一\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 2:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*二\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 3:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*三\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 4:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*四\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 5:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*五\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 6:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*六\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 7:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*七\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 8:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*八\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 9:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*九\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 10:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*十\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 11:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*十一\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)>",
#                 12:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*十二\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 13:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*十三\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 14:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*十四\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##)",
#                 15:r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*十五\s*(<[^>]+>)*\s*[\.、．].*?(</p>|##"}

bigQues_re1 = r"(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*{0}\s*(<[^>]+>)*\s*[\.、．].*?((</p>)|##)"


#大题中文题标
bigQnoZHArr = {1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',7:'七',8:'八',9:'九',10:'十',11:'十一',12:'十二',13:'十三',14:'十四',15:'十五'}

#大题查找
bigQues_search_re = r"(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*{0}\s*(<[^>]+>)*\s*[\.、．]"

#小题切分
smQues_re = r'<p>(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*{0}(<[^>]+>)*[\.．、].*?</p>'
smQues_re1 = r'(<p>(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*){0}(<[^>]+>)*[\.．、](.*?)((<p>(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*(2)[\.．、])|$)'
smAnswer_re1 = r'(<p>(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*){0}(<[^>^/]+>)*[\.．、](.*?)((<p>(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*([1-9][0-9]{1})[\.．、])|$)'
#答案连续小题切分
smLineQues_re = r'(\d*)[-—]+(\d*)([^\d^-^—]*)'

#答案去标签后匹配
sqnotags_re = r'(\d*[\.．、])(.*)'

#全英文字符匹配
allEnText_re = re.compile(r'^[A-H]*$')

#小题答案切分
smAnswer_re = r'<p>(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*{0}(<[^>^/]+>)*[\.．、].*?(</p><p>(\s*\(\s*\)\s*|\s*)(<[^>^/]+>)*\s*(<\s*/\s*[^>]+>)*[1-100](<[^>^/]+>)*[\.．、])'

#切卷
#试题和答案切分
ques_answer_re = re.compile(r'<p>(\s*<[^>]+>\s*)*【(\s*<[^>]+>\s*)*答(\s*<[^>]+>\s*)*案(\s*<[^>]+>\s*)*】(\s*<[^>]+>\s*)*</p>')

#答案详情匹配
answer_detail_re = re.compile(r'(<p>(\s*<[^>]+>\s*)*)【(\s*<[^>]+>\s*)*解(\s*<[^>]+>\s*)*析(\s*<[^>]+>\s*)*】(.*)$')

#取出HTML标签正则
html_tag_re = re.compile(r'<[^>]+>',re.S)

#不可拆分题目的标记匹配正则
db_sharp_re = re.compile(r'((<[^>]+>)+)\s*##.*?',re.IGNORECASE)

#试题选项匹配
# ques_option_re = re.compile(r'.*([ABCDEFG]((\s*<[^>]+>\s*)*)[\.、．])*?',re.IGNORECASE)
ques_option_re = re.compile(r'(\s+|(<[^>]+>)+)([A-F])((\s*<[^>]+>\s*)*[\.、．])')

#wmf文件夹路径
wmfPathArr = []

def mkdir(path):
    global wmfPathArr
    # 去除首位空格
    path = path.strip()
    # 去除尾部 \ 符号
    path = path.rstrip("\\")
    if(path not in wmfPathArr):
        wmfPathArr.append(path)
    # 判断路径是否存在
    # 存在     True
    # 不存在   False
    isExists = os.path.exists(path)
    # 判断结果
    if not isExists:
        # 如果不存在则创建目录
        #  创建目录操作函数
        os.makedirs(path)
        # print(path + ' 创建成功')
        return True
    else:
        # 如果目录存在则不创建，并提示目录已存在
        # print(path + ' 目录已存在')
        return False

#base64转图片
def base64ToFile(baseData,imgType,file_name=''):
    imgData = base64.b64decode(baseData)

    # print(time.struct_time())
    # print()
    if(file_name):
        imgPath = str(IMGS_DIRS[0])
    else:
        imgPath = "/mfs/xuesongwan/sCloud/img"
        localtime = time.localtime(time.time())
        lastNum = str(int(time.time()*1000000))[-6:]
        year = str(localtime.tm_year)[-2:]
        mon = str(localtime.tm_mon).zfill(2)
        mday = str(localtime.tm_mday).zfill(2)
        hour = str(localtime.tm_hour).zfill(2)
        min = str(localtime.tm_min).zfill(2)
        sec = str(localtime.tm_sec).zfill(2)
        imgPath = '{0}/{1}/{2}/{3}/{4}'.format(imgPath,year,mon,mday,hour)
        file_name = '{0}{1}{2}{3}{4}{5}{6}.{7}'.format(year,mon,mday,hour,min,sec,lastNum,imgType)
        mkdir(imgPath)

    filePath = os.path.join(imgPath,file_name)
    imgFile = open(filePath,'wb')
    imgFile.write(imgData)
    imgFile.close()

    imgUrl = ''
    if('wmf' in imgType):
        file_name = '{0}{1}{2}{3}{4}{5}{6}.png'.format(year, mon, mday, hour, min, sec, lastNum)

    imgUrl = '{0}/{1}'.format('http://img1.shidaceping.com', file_name)
    return imgUrl




"""
src标签中的base64编码的图片写到文件中
"""
def convert_image(image):
    with image.open() as image_bytes:
        encoded_src = base64.b64encode(image_bytes.read()).decode("ascii")
    #print image.__dict__
    img_type=image.content_type.split("/")[1]
    img_data=encoded_src




    ##使用图片上传接口保存图片
    # nowTime = int(time.time())
    # enStr = '{0}XuESONgWaN2016'.format(nowTime).encode("utf-8")
    # m = hashlib.md5()
    # m.update(enStr)
    # psw = m.hexdigest()
    # uploadUrl = 'http://upload.shidaceping.com/?time={0}&key={1}'.format(nowTime,psw)
    # img_file_name="".join((str(uuid.uuid1()),".",img_type))
    # imgPath = base64ToFile(img_data,img_file_name)
    # fileInfo = py_curl.postFile(imgPath,uploadUrl)
    # fileUrl = ''
    # if(int(fileInfo['state']) == 1):
    #     fileUrl = fileInfo['url']
    #     print(fileUrl)

    ##本地上传图片程序
    fileUrl = base64ToFile(img_data,img_type)


    return {
        "src": fileUrl
    }


#替换docx中的公式为latex
# to_latex(filename,newFilename)


"""
生成html
"""
def to_html(newFile,sub_id,grade):
    # #匹配科目ID
    # sub_id = 0
    # #匹配科目名称
    # sub_str = ''
    
    # for sub_k,sub_s in subjects.items():
    #     sub_search = re.search(sub_s,newFile)
    #     if(sub_search):
    #         sub_id = sub_k
    #         sub_str = sub_search.group(0)
    # if(not sub_id):
    #     return

    

    document=u"<!DOCTYPE html><html lang='zh_CN'><head><meta charset='UTF-8'><title>Document</title><style>table,table td,table th{border:1px solid;border-collapse: collapse;}</style></head><body>";
    style_map = "u => u"
    with open(newFile, "rb") as docx_file:
        result = mammoth.convert_to_html(docx_file,convert_image=mammoth.images.img_element(convert_image),style_map=style_map)
        html = result.value
        messages = result.messages

    # print(html)

    #wmf转PNG
    global wmfPathArr
    if(wmfPathArr):
        for wmfPath in wmfPathArr:
            # os.system('java -cp /swfToPng/bin:/swfToPng/bin/lib/batik-all-1.8pre-r1084380.jar:/swfToPng/bin/lib/batik-parser-1.6-1.jar:/swfToPng/bin/lib/wmf2svg-0.9.3.jar:/swfToPng/bin/lib/xml-apis-ext.jar wmfToPng.WmfToPng {0} {1}'.format())
            # os.system(
            #     'java -cp /swfToPng/bin:/swfToPng/bin/lib/batik-all-1.8pre-r1084380.jar:/swfToPng/bin/lib/batik-parser-1.6-1.jar:/swfToPng/bin/lib/wmf2svg-0.9.3.jar:/swfToPng/bin/lib/xml-apis-ext.jar wmfToPng.WmfToPng {0} {0}'.format(wmfPath)
            # )
            # print('java -cp /swfToPng/bin:/swfToPng/bin/lib/batik-all-1.8pre-r1084380.jar:/swfToPng/bin/lib/batik-parser-1.6-1.jar:/swfToPng/bin/lib/wmf2svg-0.9.3.jar:/swfToPng/bin/lib/xml-apis-ext.jar wmfToPng.WmfToPng {0} {0}'.format(wmfPath))
            pass
        wmfPathArr = []
    # exit()
    # #document+=html #不能使用+=的方式这样会出现乱码
    # document=document+html
    # document=document+u"<script type='text/x-mathjax-config'>MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['@@','@@']]}});</script>"
    # document=document+u"<script type='text/javascript' async src='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML'></script></body></html>"
    # # document=document.encode('utf-8')
    # with open(outputFile,"w",encoding='utf-8') as f:
    #     f.write(document)
    
    # print(html)
    # examdetail = {}

    quesdetail = {}
    splitHtml = re.split(ques_answer_re,html)
    answerHtml = False
    if(len(splitHtml) == 1):
        quesHtml = splitHtml[0]
    else:
        quesHtml = splitHtml[0]
        answerHtml = splitHtml[len(splitHtml)-1]

    # print(quesHtml)
    # print(answerHtml)
    
    # quesHtml = html
    # print(html)
    # print('++++++++++++++++++++++++++++++++++++++++++++++++++++')
    # print(quesHtml)
    # exit()
    nowQno = 0
    for bigQno,bigQnoZH in bigQnoZHArr.items():

        hasQno = re.search(re.compile(bigQues_search_re.format(bigQnoZH),re.IGNORECASE),quesHtml)

        if(hasQno):

            bigRe = bigQues_re1.format(bigQnoZH)
            bigQnoDetal = re.search(re.compile(bigRe, re.IGNORECASE), quesHtml)
            quesdetail[bigQno] = {'title':bigQnoDetal.group(0)}

            #匹配大题题型
            
            title_str = html_tag_re.sub('',hasQno.group(0))
            # quesdetail[bigQno] = match_questype(title_str,sub_id)
            quesdetail[bigQno] = dict(quesdetail[bigQno], **match_questype(title_str,sub_id))
            htmlSplit = re.split(re.compile(bigRe,re.IGNORECASE),quesHtml,1)


            quesHtml = htmlSplit[len(htmlSplit)-1]

            #如果是##拆分的则第一小题，假如##在大题标签里的补到题里
            if(hasQno.group(0)[-2:] == '##'):
                quesHtml = '<p>##'+quesHtml
            #试卷抬头信息读取
            # if(nowQno == 0):
            #   examdetail['title'] = htmlSplit[0]
            #   print(htmlSplit[0])
            #试卷试题信息读取
            if(nowQno > 0):
                # print(htmlSplit[0])
                quesdetail[nowQno]['detail'] = htmlSplit[0]
                #判断大题是否需要按小题号拆分还是##标记拆分
                sharp_search = re.search(db_sharp_re,htmlSplit[0])
                if(sharp_search):
                    sharp_split = re.split(db_sharp_re,htmlSplit[0])
                    del sharp_split[0]
                    quesdetail[nowQno]['ques_contents'] = list(map(lambda x : sharp_split[x*3] + sharp_split[x*3+2], range(0,int(len(sharp_split)/3))))
                    # for bigq in quesdetail[nowQno]['ques_contents']:
                    #     for sNo in range(1,100):
                    #         sno_re = re.compile(r"{0}[\.．、]".format(sNo),re.IGNORECASE)
                    #         if(re.search(sno_re,bigq)):
                    #             sqnoSearch = sno_re.sub('{+}',bigq)
                    #             print(sqnoSearch)
                    #             print('-------------------------------------------')
                    #             break
                    quesdetail[nowQno]['del_num_text'] = 0
                    del quesdetail[nowQno]['detail']
                else:
                    for sNo in range(1,100):

                        quesSearch = re.search(re.compile(smQues_re.format(sNo),re.IGNORECASE),htmlSplit[0])
                        # quesFind = re.findall(re.compile(smQues_re1.format(sNo), re.IGNORECASE), htmlSplit[0])
                        # print(quesFind)
                        if(quesSearch):
                            startIdx = htmlSplit[0].find(quesSearch.group(0))
                            # quesdetail[nowQno]['sques_start_idxs'] = 1
                            quesdetail[nowQno]['del_num_text'] = 1
                            if('sques_start_idxs' not in quesdetail[nowQno].keys()):
                                quesdetail[nowQno]['sques_start_idxs'] = {sNo:startIdx}
                            else:
                                quesdetail[nowQno]['sques_start_idxs'][sNo] = startIdx   
            nowQno = bigQno
            # if(nowQno == 2):
            #     exit()
    # exit()
    #最后一大题拆分        
    quesdetail[nowQno]['detail'] = quesHtml
    # print(quesdetail[nowQno])
    sharp_search = re.search(db_sharp_re,quesHtml)
    if(sharp_search):
        sharp_split = re.split(db_sharp_re,quesHtml)
        del sharp_split[0]
        quesdetail[nowQno]['ques_contents'] = list(map(lambda x : sharp_split[x*3] + sharp_split[x*3+2], range(0,int(len(sharp_split)/3))))
        # for bigq in quesdetail[nowQno]['ques_contents']:
        #     for sNo in range(1,100):
        #         sno_re = re.compile(r"{0}[\.．、]".format(sNo),re.IGNORECASE)
        #         if(re.search(sno_re,bigq)):
        #             sqnoSearch = sno_re.sub('{+}',bigq)
        #             print(sqnoSearch)
        #             print('-------------------------------------------')
        #             break
        quesdetail[nowQno]['del_num_text'] = 0
        del quesdetail[nowQno]['detail']
    else:
        for sNo in range(1,100):
            quesSearch = re.search(re.compile(smQues_re.format(sNo),re.IGNORECASE),quesHtml)
            if(quesSearch):
                startIdx = quesHtml.find(quesSearch.group(0))
                # quesdetail[nowQno]['sques_start_idxs'] = 1
                quesdetail[nowQno]['del_num_text'] = 1
                if('sques_start_idxs' not in quesdetail[nowQno].keys()):
                    quesdetail[nowQno]['sques_start_idxs'] = {sNo:startIdx}
                else:
                    quesdetail[nowQno]['sques_start_idxs'][sNo] = startIdx

    # print(quesdetail[nowQno])
    for bqno,bdata in quesdetail.items():
        if(bdata):
            # print(bdata['title'])
            # print(bdata['sques_start_idxs'].keys())
            if('sques_start_idxs' in bdata.keys()):
                idxKeys = list(bdata['sques_start_idxs'].keys())
                idxKeysLen = len(idxKeys)
                bdata['ques_contents'] = []
                bdata['sno'] = []
                for skey,sno in enumerate(idxKeys):
                    bdata['sno'].append(sno)
                    startIdx = bdata['sques_start_idxs'][sno]
                    if(skey+1 == idxKeysLen):
                        bdata['ques_contents'].append(bdata['detail'][startIdx:])
                        pass
                    else:
                        endIdx = bdata['sques_start_idxs'][idxKeys[skey+1]]
                        bdata['ques_contents'].append(bdata['detail'][startIdx:endIdx])
            else:
                if('ques_contents' not in bdata.keys()):
                    bdata['ques_contents'] = [bdata['detail']]
                pass
        else:
            pass

    if(answerHtml):
        split_answer(answerHtml,quesdetail,sub_id)

    # sqlObj = pymysql_lib.irtsql(dbname='xsw_main_db', dbhost='192.168.1.200', dbport=3306, dbuser='ccda', dbpasswd='jvL5cHAjzSawHUq9')
    sqlObj = pymysql_lib.irtsql(dbname=DATABASES['default']['NAME'], dbhost=DATABASES['default']['HOST'], dbport=3306, dbuser=DATABASES['default']['USER'], dbpasswd=DATABASES['default']['PASSWORD'])

    (filepath,tempfilename) = os.path.split(newFile)
    (shotFilename,extension) = os.path.splitext(tempfilename)

    #存储试卷试题内容
    examId = sqlObj.createExam(sub_id,grade,shotFilename[1:])
    sqlObj.insertExamQues(sub_id,grade,examId,quesdetail)

    
    # 解析答案
    
    
    return examId
    
        # if(nowQno == 2):
        #   os._exit(0)
    
    # print(html)

def match_questype(title,sub_id):
    for key_word in key_words[sub_id]:
        type_search = re.search(re.compile(key_word['key_word']),title)
        if(type_search):
            ques_type = int(key_word['type'])
            return {'type_id':ques_type,'type_text':ques_types[sub_id][ques_type]['name'],'option':ques_types[sub_id][ques_type]['option']}
    return {'type_id':0,'type_text':'未匹配到题型','option':0}

def split_answer(answerHtml,quesdetail,sub_id):
    nowQno = 0

    for bigQno,bigQnoZH in bigQnoZHArr.items():

        hasQno = re.search(re.compile(bigQues_search_re.format(bigQnoZH),re.IGNORECASE),answerHtml)
        if(hasQno):
            bigRe = bigQues_re1.format(bigQnoZH)
            answerQno = re.search(re.compile(bigRe, re.IGNORECASE), answerHtml)
            if(nowQno > 0):
                #当有大题题目时
                if('ques_contents' in quesdetail[nowQno].keys()):
                    quesdetail[nowQno]['answers']={}
                    quesdetail[nowQno]['option_num'] = []
                    andetail = answerHtml[0:answerQno.span()[0]]
                    quesisType = ques_types_class(quesdetail[nowQno]['type_id'],sub_id)
                    for sNo in range(1,100):


                        # print(answerSearch1)
                        # answerSearch = re.search(re.compile(smQues_re.format(sNo),re.IGNORECASE),andetail)
                        answerSearch = re.findall(re.compile(smAnswer_re1.format(sNo, '{0,1}'), re.IGNORECASE), andetail)
                        # answerSearch = re.findall(re.compile(smAnswer_re1.format(sNo), re.IGNORECASE), andetail)


                        if(answerSearch):
                            # print(answerSearch)
                            fullanswerContent = answerSearch[0][0] + answerSearch[0][1] +answerSearch[0][2]+ answerSearch[0][3] +answerSearch[0][4] + answerSearch[0][5]
                            # 检测是否有答案详情
                            answerSplit = re.split(answer_detail_re,fullanswerContent,1)
                            answerContent = answerSplit[0]
                            detailContent = answerContent
                            if(len(answerSplit) > 1):
                                detailSearch = re.findall(answer_detail_re, fullanswerContent)
                                # print(detailSearch)
                                detailContent = detailSearch[0][0] + detailSearch[0][1] +detailSearch[0][2]+ detailSearch[0][3] +detailSearch[0][4] + detailSearch[0][5]
                            # print(answerContent)
                            # print(detailContent)
                            # exit()
                            if (quesisType == 1 or quesisType == 2 or quesisType == 3):
                                sqanText = re.sub('\s', '', html_tag_re.sub('', answerContent))

                                # sqanSplits = re.findall(re.compile(sqnotags_re, re.IGNORECASE), sqanText)
                                if (sqanText):
                                    # 减少干扰保证答案准确性
                                    sqanText = re.split(re.compile(r'\d+'), sqanText)[0]
                                    if (quesisType == 1):
                                        optionNum = 4
                                        if('sno' in quesdetail[nowQno].keys()):
                                            if (sNo in quesdetail[nowQno]['sno']):
                                                detail_idx = quesdetail[nowQno]['sno'].index(sNo)
                                                qdetal = quesdetail[nowQno]['ques_contents'][detail_idx]

                                                optionList = re.findall(ques_option_re, qdetal)
                                                if (optionList):
                                                    optionNum = len(list(set([x[2] for x in optionList])))

                                        else:
                                            qdetal = quesdetail[nowQno]['ques_contents'][sNo - 1]
                                            optionList = re.findall(ques_option_re, qdetal)
                                            if (optionList):
                                                optionNum = len(list(set([x[2] for x in optionList])))

                                        if (len(sqanText) > 1):
                                            xzanswers = ','.join(list(sqanText))
                                        else:
                                            xzanswers = sqanText
                                        quesdetail[nowQno]['answers'][sNo] = {'options': optionNum, 'answer': xzanswers,
                                                                                'details': detailContent}
                                    elif(quesisType == 2):
                                        tfanswer = 0
                                        if(sqanText in ['T','对','true']):
                                            tfanswer = 1
                                        quesdetail[nowQno]['answers'][sNo] = {'options': 2, 'answer': tfanswer,
                                                                                'details': detailContent}
                                    elif(quesisType == 3):
                                        # print(sqanSplits)
                                        answers = []
                                        if (sqanTex):
                                            answers.append(list(sqanText))
                                            quesdetail[nowQno]['answers'][sNo] = {'options': 3, 'answer': json.dumps(answers),
                                                                                  'details': detailContent}
                                            # print(json.dumps(answers))

                            else:
                                # print(answerContent)
                                # zganswer = re.compile(r'\d+').sub('', answerContent, 1)
                                # zganswer = re.compile(r'[\.、．]').sub('', zganswer, 1)
                                # print(zganswer)
                                quesdetail[nowQno]['answers'][sNo] = {'options': 0, 'answer': answerContent,
                                                                          'details': detailContent}
                    answerText = re.sub('\s','',html_tag_re.sub('',andetail))
                    answerInfos = re.findall(re.compile(smLineQues_re,re.IGNORECASE),answerText)

                    #处理连续题号
                    if(answerInfos):
                        for ani in answerInfos:
                            if not re.search(allEnText_re,ani[2]):
                                break
                            endQno = int(ani[1])+1 if len(ani[2]) > int(ani[1])-int(ani[0]) else int(ani[0])+len(ani[2])+1

                            for qno in range(int(ani[0]),endQno):

                                listAnswer = ani[2][qno-int(ani[0])]
                                if (quesisType == 1 or quesisType == 2):
                                    if (quesisType == 1):
                                        quesdetail[nowQno]['answers'][qno] = {'options': 4, 'answer': listAnswer,
                                                                              'details': listAnswer}
                                    elif (quesisType == 2):
                                        tfanswer = 0
                                        if (listAnswer in ['T', '对', 'true']):
                                            tfanswer = 1
                                        quesdetail[nowQno]['answers'][qno] = {'options': 2, 'answer': listAnswer,
                                                                                  'details': listAnswer}

            answerHtml = answerHtml[answerQno.span()[1]:]
            nowQno = bigQno

    # exit()
    # smAnswer_re1 = r'[1-9][0-9]{1,2}'
    if(nowQno and answerHtml):
        quesdetail[nowQno]['answers'] = {}
        quesisType = ques_types_class(quesdetail[nowQno]['type_id'], sub_id)
        # print(answerHtml)
        for sNo in range(1, 100):
            # print(answerHtml)
            answerSearch = re.findall(re.compile(smAnswer_re1.format(sNo,'{0,1}'), re.IGNORECASE), answerHtml)
            # print(smAnswer_re1.format(sNo,'0,1'))
            # print(answerSearch)


            if (answerSearch):
                # print(answerSearch)
                answerContent = answerSearch[0][0] + answerSearch[0][1] +answerSearch[0][2]+ answerSearch[0][3] +answerSearch[0][4] + answerSearch[0][5]
                fullanswerContent = answerSearch[0][0] + answerSearch[0][1] + answerSearch[0][2] + answerSearch[0][3] + answerSearch[0][4] + answerSearch[0][5]
                # 检测是否有答案详情
                answerSplit = re.split(answer_detail_re, fullanswerContent, 1)
                answerContent = answerSplit[0]
                detailContent = answerContent
                if (len(answerSplit) > 1):
                    detailSearch = re.findall(answer_detail_re, fullanswerContent)
                    detailContent = detailSearch[0][0] + detailSearch[0][1] + detailSearch[0][2] + detailSearch[0][3] + detailSearch[0][4] + detailSearch[0][5]
                # print(answerContent)
                # exit()
                # print(answerHtml)
                # print(answerSearch.group(0))
                if (quesisType == 1 or quesisType == 2 or quesisType == 3):
                    sqanText = re.sub('\s', '', html_tag_re.sub('', answerContent))
                    # sqanSplits = re.findall(re.compile(sqnotags_re, re.IGNORECASE), sqanText)
                    if (sqanText):
                        # 减少干扰保证答案准确性
                        sqanText = re.split(re.compile(r'\d+'), sqanText)[0]
                        if (quesisType == 1):
                            optionNum = 4
                            if ('sno' in quesdetail[nowQno].keys()):
                                if (sNo in quesdetail[nowQno]['sno']):
                                    detail_idx = quesdetail[nowQno]['sno'].index(sNo)
                                    qdetal = quesdetail[nowQno]['ques_contents'][detail_idx]

                                    optionList = re.findall(ques_option_re, qdetal)
                                    if(optionList):
                                        optionNum = len(list(set([x[2] for x in optionList])))
                            else:
                                qdetal = quesdetail[nowQno]['ques_contents'][sNo - 1]
                                optionList = re.findall(ques_option_re, qdetal)
                                if (optionList):
                                    optionNum = len(list(set([x[2] for x in optionList])))

                            if(len(sqanText)>1):
                                xzanswers = ','.join(list(sqanText))
                            else:
                                xzanswers = sqanText

                            quesdetail[nowQno]['answers'][sNo] = {'options': optionNum, 'answer': xzanswers,
                                                                  'details': detailContent}
                        elif (quesisType == 2):

                            if (len(sqanText) > 1):
                                tfanswerArr = []
                                for x in list(sqanText):
                                    tfanswerArr.append(1 if x in ['T', '对', 'true'] else 0)
                                tfanswer = ','.join(tfanswerArr)
                            else:
                                tfanswer = 1 if sqanText in ['T', '对', 'true'] else 0
                            quesdetail[nowQno]['answers'][sNo] = {'options': 2, 'answer': tfanswer,
                                                                  'details': detailContent}
                        elif (quesisType == 3):
                            answers = []
                            if (sqanText):
                                answers.append(list(sqanText))
                                quesdetail[nowQno]['answers'][sNo] = {'options': 3, 'answer': json.dumps(answers),
                                                                      'details': detailContent}
                else:
                    # print(answerSearch.group(0))
                    # zganswer = re.compile(r'\d+').sub('', answerContent, 1)
                    # zganswer = re.compile(r'[\.、．]').sub('', zganswer, 1)
                    quesdetail[nowQno]['answers'][sNo] = {'options': 0, 'answer': answerContent,
                                                          'details': detailContent}

        answerText = re.sub('\s', '', html_tag_re.sub('', answerHtml))
        answerInfos = re.findall(re.compile(smLineQues_re, re.IGNORECASE), answerText)

        if (answerInfos):
            for ani in answerInfos:
                if not re.search(allEnText_re, ani[2]):
                    break
                endQno = int(ani[1]) + 1 if len(ani[2]) > int(ani[1]) - int(ani[0]) else int(ani[0]) + len(
                    ani[2]) + 1

                for qno in range(int(ani[0]), endQno):
                    # print(qno)
                    # print(ani[2][qno - int(ani[0])])
                    listAnswer = ani[2][qno - int(ani[0])]
                    if (quesisType == 1 or quesisType == 2):
                        if (quesisType == 1):
                            optionNum = 4
                            if('sno' in quesdetail[nowQno].keys() and qno in quesdetail[nowQno]['sno']):
                                detail_idx = quesdetail[nowQno]['sno'].index(qno)
                                qdetal = quesdetail[nowQno]['ques_contents'][detail_idx]
                                optionList = re.findall(ques_option_re, qdetal)
                                # print(optionList)
                            else:
                                qdetal = quesdetail[nowQno]['ques_contents'][qno-1]
                                optionList = re.findall(ques_option_re, qdetal)
                                # print(optionList)
                            quesdetail[nowQno]['answers'][qno] = {'options': optionNum, 'answer': listAnswer,
                                                                  'details': listAnswer}
                        elif (quesisType == 2):
                            tfanswer = 0
                            if (listAnswer in ['T', '对', 'true']):
                                tfanswer = 1
                            quesdetail[nowQno]['answers'][qno] = {'options': 2, 'answer': listAnswer,
                                                                  'details': listAnswer}
    return quesdetail