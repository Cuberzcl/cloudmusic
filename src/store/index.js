import Vue from 'vue'
import Vuex from 'vuex'

import search from './Search'
import play from './Play'
import like from './Like'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { search, play, like }
})
