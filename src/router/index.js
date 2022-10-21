import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/views/Index'
import BaseFunc from '@/views/Index/BaseFunc'
import MyMusic from '@/views/Index/MyMusic'
import Search from '@/views/Index/Search'
import Play from '@/views/Play'

import FindMusic from '@/views/Index/BaseFunc/FindMusic'
import Blog from '@/views/Index/BaseFunc/Blog'
import Video from '@/views/Index/BaseFunc/Video'
import Subscription from '@/views/Index/BaseFunc/Subscription'
import Live from '@/views/Index/BaseFunc/Live'
import FM from '@/views/Index/BaseFunc/FM'

import Like from '@/views/Index/MyMusic/Like'
import Saved from '@/views/Index/MyMusic/Saved'
import Recent from '@/views/Index/MyMusic/Recent'
import Cloud from '@/views/Index/MyMusic/Cloud'
import Podcast from '@/views/Index/MyMusic/Podcast'
import Collection from '@/views/Index/MyMusic/Collection'

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
          name: 'base_func',
          children: [
            { path: 'findmusic', component: FindMusic, name: 'find_music', meta: { baseIndex: 0 } },
            { path: 'blog', component: Blog, name: 'blog', meta: { baseIndex: 1 } },
            { path: 'video', component: Video, name: 'video', meta: { baseIndex: 2 } },
            {
              path: 'subscription',
              component: Subscription,
              name: 'subscription',
              meta: { baseIndex: 3 }
            },
            { path: 'live', component: Live, name: 'live', meta: { baseIndex: 4 } },
            { path: 'FM', component: FM, name: 'FM', meta: { baseIndex: 5 } }
          ]
        },
        {
          path: 'mymusic',
          component: MyMusic,
          name: 'my_music',
          children: [
            { path: 'like', component: Like, name: 'like', meta: { musicIndex: 0 } },
            { path: 'saved', component: Saved, name: 'saved', meta: { musicIndex: 1 } },
            { path: 'recent', component: Recent, name: 'recent', meta: { musicIndex: 2 } },
            {
              path: 'cloud',
              component: Cloud,
              name: 'cloud',
              meta: { musicIndex: 3 }
            },
            { path: 'podcast', component: Podcast, name: 'podcast', meta: { musicIndex: 4 } },
            {
              path: 'collection',
              component: Collection,
              name: 'collection',
              meta: { musicIndex: 5 }
            }
          ]
        },
        { path: 'search/:keyword?', component: Search, name: 'search' }
      ]
    },
    { path: '/play', component: Play }
  ]
})
