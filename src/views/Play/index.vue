<template>
  <div class="play-container">
    <transition name="show">
      <div class="show" v-if="showPlay">
        <PlaySongInfoVue :songData="songData" class="info"></PlaySongInfoVue>
        <LyricsVue :lyrics="lyrics" :index="index" class="lyrics"></LyricsVue>
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
      showPlay: false,
      currentTime: bus.currentTime,
      index: -1,
      timeOffset: 0.1
    }
  },
  components: {
    PlaySongInfoVue,
    LyricsVue
  },
  methods: {},
  computed: {
    ...mapState({
      lyrics: state => {
        let Arr = state.play.lyrics.split('\n')
        let tempArr = []
        for (let i = 0; i < Arr.length; i++) {
          let time = parseFloat(Arr[i].slice(1, 3)) * 60 + parseFloat(Arr[i].slice(4, 10))
          let lyric = Arr[i].slice(Arr[i].indexOf(']') + 1)
          tempArr.push({ time, lyric })
        }
        tempArr[tempArr.length - 1].time = tempArr[tempArr.length - 2].time + 100
        return tempArr
      }
    })
  },
  created() {
    bus.$off('songInfo')
    bus.$on('songInfo', data => {
      this.songData = data

      // this.$store.dispatch('getSongLyrics', { id: data.id })
    })
    bus.$off('curInfo')
    bus.$on('curInfo', data => {
      if (data + this.timeOffset >= this.lyrics[this.index + 1].time) {
        for (let i = this.index + 1; i < this.lyrics.length; i++) {
          if (data + this.timeOffset < this.lyrics[i].time) {
            this.index = i - 1
            break
          }
        }
      } else if (data + this.timeOffset < this.lyrics[0].time) {
        this.index = -1
      } else if (data + this.timeOffset < this.lyrics[this.index].time) {
        for (let i = this.index - 1; i >= 0; i--) {
          if (data + this.timeOffset >= this.lyrics[i].time) {
            this.index = i
            break
          }
        }
      }

      this.currentTime = data
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.showPlay = true
    })

    bus.$on('goPrev', () => {
      this.showPlay = false
    })
    bus.$emit('curInfo', bus.currentTime)
  }
}
</script>

<style lang="less" scoped>
.play-container {
  position: relative;
  display: flex;
  order: 2;
  height: 800px;
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
