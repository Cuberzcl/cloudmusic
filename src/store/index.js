import Vue from 'vue'
import Vuex from 'vuex'

import search from './Search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { search }
})
