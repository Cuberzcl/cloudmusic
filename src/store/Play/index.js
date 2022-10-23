import { get_song_lyrics } from '@/api'

const state = {
  lirics: '还没有找到歌词~'
}

const mutations = {
  GETSONGLYRICS(state, lyrics) {
    if (lyrics != '') state.lyrics = lyrics
    else state.lyrics = '0'
  }
}

const actions = {
  async getSongLyrics({ commit }, { id }) {
    let { data: res } = await get_song_lyrics({ id })
    if (res.code === 200) {
      commit('GETSONGLYRICS', res.lrc.lyric)
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
