import _request from './request'

//请求搜索建议
export const get_search_suggest = params =>
  _request({ url: '/search/suggest', method: 'get', params })

//请求搜索结果
export const get_search_res = params => _request({ url: '/cloudsearch', method: 'get', params })

//依据id搜索歌曲url
export const get_song_url = params => _request({ url: '/song/url', method: 'get', params })

//依据id搜索歌词
export const get_song_lyrics = params => _request({ url: '/lyric', method: 'get', params })

//依据歌曲id请求评论
export const get_song_comments = params =>
  _request({ url: '/comment/music', method: 'get', params })
