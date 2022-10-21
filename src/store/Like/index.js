const state = {
  likes: [],
  likesId: []
}

const mutations = {
  GETLIKESID(state, likesId) {
    state.likesId = likesId
  },
  GETLIKES(state, likes) {
    state.likes = likes
  }
}

const actions = {
  getLikesId({ commit }, { likesId }) {
    commit('GETLIKESID', likesId)
  },
  getLikes({ commit }, { likes }) {
    commit('GETLIKES', likes)
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
