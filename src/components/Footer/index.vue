<template>
  <div id="footer-container">
    <!-- 歌曲信息 -->
    <SongInfoVue></SongInfoVue>
    <!-- 音频控制 -->
    <AudioControlVue></AudioControlVue>
    <!-- 其他功能 -->
    <OtherChangeVue></OtherChangeVue>
  </div>
</template>

<script>
import SongInfoVue from './SongInfo'
import AudioControlVue from './AudioControl'
import OtherChangeVue from './OtherChange'
import bus from '@/EventBus'
import { mapState } from 'vuex'

export default {
  name: 'FooterVue',
  data() {
    return {
      searchInput: '',
      searchResult: [],
      songUrl: ''
    }
  },
  components: { SongInfoVue, AudioControlVue, OtherChangeVue },
  computed: {
    ...mapState({
      audio_List: state => state.search.audioList
    })
  },
  methods: {},
  created() {
    bus.$on('toSearch', val => {
      this.searchInput = val
    })
  }
}
</script>

<style lang="less" scoped>
#footer-container {
  // display: flex;
  position: fixed;
  bottom: 5px;
  height: 70px;
  width: 100%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #aaa;
  order: 3;
  align-self: flex-end;
  // flex: 70px;
  background-color: #fff;
}
</style>
