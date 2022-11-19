import { get_song_lyrics, get_song_comments } from '@/api'

const state = {
  lirics: '还没有找到歌词~',
  hotComments: [], //热门评论
  comments: [] //所有评论
}

const mutations = {
  GETSONGLYRICS(state, lyrics) {
    if (lyrics != '') state.lyrics = lyrics
    else state.lyrics = '0'
  },
  /**整理评论数据 */
  GETSONGCOMMENTS(state, res) {
    state.hotComments = res.hotComments
    state.comments = res.comments
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
  },
  /**获取歌曲评论 */
  async getSongComments({ commit }, { id }) {
    let { data: res } = await get_song_comments({ id })
    if (res.code === 200) {
      commit('GETSONGCOMMENTS', res)
    } else {
      console.log('com err')
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
