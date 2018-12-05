import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyEdit from '@/components/MyEdit/MyEdit'
import Trend from '@/components/Trend/Trend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/edit',
      name: 'MyEdit',
      component: MyEdit
    },
    {
      path: '/trend',
      name: 'Trend',
      component: Trend
    }
  ]
})
