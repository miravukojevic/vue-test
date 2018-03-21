import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/Welcome'
import AircraftList from '@/AircraftList.vue'
import DetailRow from '@/DetailRow.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/detailrow/:id',
      name: 'DetailRow',
      component: DetailRow
    }
  ]
})
