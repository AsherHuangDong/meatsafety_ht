import Vue from 'vue'
import Router from 'vue-router'
import { perm } from './perm'
import { generalview } from './generalView'
import { usermanage } from './userManage'
import { datamanage } from './dataManage'
import { templatemanage } from './templateManage'
import { groupmanage } from './groupManage'
import { noticemanage } from './noticeManage'
import { setting } from './setting'
import { standard } from './standard'
import { Message } from "iview"

import Login from '@/components/page/Login'
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: () => import("../components/page/index"),
      children: [
        generalview,
        usermanage,
        datamanage,
        templatemanage,
        groupmanage,
        noticemanage,
        setting,
        perm,
        standard
      ]
    },
  ]
});
console.log(router)
router.beforeEach((to, from, next) => {
  // console.log(to.path)
  // const permPathArr = JSON.parse(localStorage.getItem('permPath'))
  // const noPerm = ['/', '/index']
  // console.log(permPathArr);
  //console.log(permPathArr.indexOf(to.path))
  //if (permPathArr) {
  //   if (permPathArr.indexOf(to.path) !== -1 || noPerm.indexOf(to.path) !== -1) {
  //     sessionStorage.setItem('currentRoute', to.path)
  //     next()
  //     return null
  //   }
  //   Message.error('无权限操作');
  //   return null
  // }else{
  //   next();
  //   return null;
  // }
  console.log('to',to.path);
  if(to.path != "/"){
    if(sessionStorage.getItem('token')){
      console.log('ffff')
      next();
    }else{
      window.newVue.$router.push('/')
      window.newVue.$Message.info("请先登陆");
      return null;
      //next();
    }
  }else{
    next();
  }
})



export default router
