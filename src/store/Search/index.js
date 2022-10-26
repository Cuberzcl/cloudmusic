import { get_search_res, get_song_url } from '@/api'
import bus from '@/EventBus'

const state = {
  searchResult: [],
  audioList: []
}

const mutations = {
  //清空搜索结果
  ClEARSEARCHRES(state) {
    state.searchResult = []
  },
  //依据搜索内容获取搜索结果
  GETSEARCHRES(state, searchResult) {
    state.searchResult = searchResult
  },

  //依据id获取指定歌曲url
  GETSONGURL(state, { url, id }) {
    let length = state.audioList.length

    // 利用bus向AudioControl传递信息，播放歌曲
    bus.$emit('playAudio', url)
    if (length === 0) {
      state.audioList[0] = { url: url, id: id }
    } else if (length === 1) {
      if (state.audioList[0].id !== id) state.audioList = [{ url: url, id: id }, state.audioList[0]]
    } else {
      let index = state.audioList.findIndex(item => item.id === id)
      if (index !== -1) {
        state.audioList = [...state.audioList.slice(index), ...state.audioList.slice(0, index)]
      } else {
        state.audioList = [
          { url: url, id: id },
          ...state.audioList.slice(1, length),
          state.audioList[0]
        ]
      }
    }
  }
}

const actions = {
  async getSearchRes({ commit }, { searchInput }) {
    commit('ClEARSEARCHRES')
    let { data: res } = await get_search_res({ keywords: searchInput })
    if (res.code === 200) {
      // this.searchResult = res.result
      commit('GETSEARCHRES', res.result)
    } else {
      console.log('err')
    }
  },
  async getSongUrl({ commit }, { id }) {
    let { data: res } = await get_song_url({ id: id })
    if (res.code === 200) {
      commit('GETSONGURL', { url: res.data[0].url, id: id })
    } else {
      console.log('err')
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
