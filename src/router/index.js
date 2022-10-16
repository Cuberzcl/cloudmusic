import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/views/Index'
import BaseFunc from '@/views/Index/BaseFunc'
import Search from '@/views/Index/Search'
import Play from '@/views/Play'

import FindMusic from '@/views/Index/BaseFunc/FindMusic'
import Blog from '@/views/Index/BaseFunc/Blog'
import Video from '@/views/Index/BaseFunc/Video'
import Subscription from '@/views/Index/BaseFunc/Subscription'
import Live from '@/views/Index/BaseFunc/Live'
import FM from '@/views/Index/BaseFunc/FM'

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
      redirect: '/index/basefunc',
      name: 'index',
      children: [
        {
          path: 'basefunc',
          component: BaseFunc,
          redirect: 'basefunc/findmusic',
          name: 'basefunc',
          children: [
            { path: 'findmusic', component: FindMusic, name: 'find_music', meta: { index: 0 } },
            { path: 'blog', component: Blog, name: 'blog', meta: { index: 1 } },
            { path: 'video', component: Video, name: 'video', meta: { index: 2 } },
            {
              path: 'subscription',
              component: Subscription,
              name: 'subscription',
              meta: { index: 3 }
            },
            { path: 'live', component: Live, name: 'live', meta: { index: 4 } },
            { path: 'FM', component: FM, name: 'FM', meta: { index: 5 } }
          ]
        },
        { path: 'search/:keyword?', component: Search, name: 'search' }
      ]
    },
    { path: '/play', component: Play }
  ]
})
