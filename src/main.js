import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AudioPlayer from '@liripeng/vue-audio-player'
import 'bootstrap/less/bootstrap.less'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(AudioPlayer)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
