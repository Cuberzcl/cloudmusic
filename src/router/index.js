import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/views/Index'
import Home from '@/views/Index/Home'
import Search from '@/views/Index/Search'

Vue.use(VueRouter)
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/index' },
    {
      path: '/index',
      component: Index,
      redirect: '/index/home',
      children: [
        { path: 'home', component: Home, name: 'home' },
        { path: 'search', component: Search, name: 'search' }
      ]
    }
  ]
})
