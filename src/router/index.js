import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/Welcome'
import AircraftList from '@/AircraftList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/aircraft',
      name: 'AircraftList',
      component: AircraftList
    }
  ]
})
