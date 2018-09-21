import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import layout from '@/components/layout/layout'
import login from '@/components/login/login'
import main from '@/components/layout/main'
import psychological from '@/components/main/psychological'
import examlist from '@/components/main/examlist'
import examreport from '@/components/main/examreport'
import psychologicalpaper from '@/components/main/psychologicalpaper'
import psychologicalreport from '@/components/main/psychologicalreport'
import setting from '@/components/setting/setting'
export default new Router({
  //todo:解决地址的#问题
  // mode:"history",
  routes: [
    //登录页面
    {
      path: '/',
      name: 'login',
      component: login,
      alias: '/login'
    },
    //主界面
    {
      path: '/main',
      name: 'main',
      redirect:'/main/examlist',
      component: layout,
      children: [
        //初始页面-查看报告
        {
          path: 'examreport',
          name: 'examreport',
          component: examreport,
        },
        //考试列表
        {
          path: 'examlist',
          name: 'examlist',
          component: examlist,
        },
        //心理测评-dashboard
        {
          path: 'psychological',
          name: 'psychological',
          component: psychological,
        },
        //心理测评-试题
        {
          path: 'psychologicalpaper',
          name: 'psychologicalpaper',
          component: psychologicalpaper,
        },
        //心理测评-测试结果
        {
          path: 'psychologicalreport',
          name: 'psychologicalreport',
          component: psychologicalreport,
        },
        //账号信息
        {
          path: '/setting',
          name: 'setting',
          component: setting
        },
      ]
    },
  ]
})
