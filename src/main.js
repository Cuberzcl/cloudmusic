import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AudioPlayer from '@liripeng/vue-audio-player'
import 'bootstrap/less/bootstrap.less'
import global from '@/tools/set'
import SongTableVue from '@/components/SongTable'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(AudioPlayer)
Vue.prototype.Global = global
Vue.component(SongTableVue.name, SongTableVue)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
