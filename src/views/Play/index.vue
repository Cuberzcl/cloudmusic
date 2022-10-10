<template>
  <div class="play-container">
    <transition name="show">
      <div class="show" v-if="showPlay">
        <PlaySongInfoVue :songData="songData" class="info"></PlaySongInfoVue>
        <LyricsVue :lyrics="lyrics" class="lyrics"></LyricsVue>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '@/EventBus'
import PlaySongInfoVue from './PlaySongInfo'
import LyricsVue from './Lyrics'

export default {
  name: 'PlayVue',
  data() {
    return {
      songData: {},
      showPlay: false
    }
  },
  components: {
    PlaySongInfoVue,
    LyricsVue
  },
  methods: {},
  computed: {
    ...mapState({
      lyrics: state => state.play.lyrics
    })
  },
  created() {
    bus.$off('songInfo')
    bus.$on('songInfo', data => {
      this.songData = data

      // this.$store.dispatch('getSongLyrics', { id: data.id })
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.showPlay = true
    })

    bus.$on('goPrev', () => {
      this.showPlay = false
    })
  }
}
</script>

<style lang="less" scoped>
.play-container {
  position: relative;
  display: flex;
  order: 2;
  height: 795px;
  .show {
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    background: linear-gradient(to bottom right, #ffeeff, #ffffee, #eeffff);

    .info {
      width: 600px;
      margin: 0 auto;
    }
    .lyrics {
      margin: 0 auto;
    }
  }
  .show-enter {
    top: 795px;
    height: 0;
  }
  .show-enter-to {
    top: 0;
    height: 100%;
  }
  .show-enter-active {
    transition: all 0.2s linear;
  }
  .show-leave {
    top: 0;
    height: 100%;
  }
  .show-leave-to {
    top: 795px;
    height: 0;
  }
  .show-leave-active {
    transition: all 0.2s linear;
  }
}
</style>
