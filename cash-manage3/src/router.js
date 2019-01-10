import Vue from 'vue'
import Router from 'vue-router'
import Manage from './views/Manage.vue'
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/manage',
      name: 'manage',
      component: Manage
    },
    {
      path: '/',
      name: 'content',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Content.vue')
    },{
      path:'/login',
      name: 'login',
      component:() => import('./views/Login.vue')
    },{
      path:'*',
      name:'404,',
      component:() => import('./views/404.vue')
    }
  ]
})



//路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('weiToken');

  if(to.path === '/login' || to.path == '/register'){
    next();
  }else{
    isLogin ? next() : next('/login');
  }
})

export default router;
