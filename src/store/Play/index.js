import { get_song_lyrics, get_song_comments } from '@/api'
import bus from '@/EventBus'

const state = {
  lyrics: '',
  hotComments: [], //热门评论
  comments: [], //所有评论
  total: 0 //评论总数量
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
    state.total = res.total
  }
}

const actions = {
  async getSongLyrics({ commit }, { id }) {
    let songId = sessionStorage.getItem('songId')
    let lyrics = localStorage.getItem('lyrics')
    if (lyrics && songId) {
      if (parseInt(songId) == id) {
        if (state.lyrics == '') {
          state.lyrics = lyrics
        }
        return
      }
    }

    let { data: res } = await get_song_lyrics({ id })
    if (res.code === 200) {
      commit('GETSONGLYRICS', res.lrc.lyric)

      /**保存歌词 */
      localStorage.setItem('lyrics', res.lrc.lyric)
    } else {
      console.log('lyrics err')
    }
  },

  /**获取歌曲评论 */
  async getSongComments({ commit }, { id }) {
    let songId = sessionStorage.getItem('songId')
    let comments = localStorage.getItem('comments')
    if (comments && songId) {
      if (parseInt(songId) == id) {
        if (!state.comments[0]) {
          commit('GETSONGCOMMENTS', JSON.parse(comments))
        }
        return
      }
    }

    /**向Comments组件通信，评论更新 */
    bus.$emit('commentsChange')

    let { data: res } = await get_song_comments({ id })
    if (res.code === 200) {
      let comments = {
        hotComments: res.hotComments,
        comments: res.comments,
        total: res.total
      }
      commit('GETSONGCOMMENTS', comments)

      /**保存评论 */
      localStorage.setItem('comments', JSON.stringify(comments))
    } else {
      console.log('comment err')
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
