import Vue from 'vue'
import Vuex from 'vuex'

import search from './Search'
import play from './Play'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { search, play }
})
