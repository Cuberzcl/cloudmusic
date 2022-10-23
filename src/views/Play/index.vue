<template>
  <div class="play-container">
    <transition name="show">
      <div class="show" v-if="showPlay">
        <div class="arm" ref="arm" :class="{ 'arm-rotate': armRotate }">
          <img src="@/assets/唱臂.png" />
        </div>
        <div class="disk" :style="{ '--Rad': rad }">
          <div class="grey" ref="rotateDisk">
            <div class="black"><img :src="songData.al.picUrl" /></div>
          </div>
        </div>
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
      timeOffset: 0.1,
      time: 0, //旋转计时器
      rad: 0, //记录旋转度数
      isRotate: false, //用于判断是旋转还是停止旋转,
      armRotate: false //唱臂旋转状态
    }
  },
  components: {
    PlaySongInfoVue,
    LyricsVue
  },
  methods: {
    //图片旋转
    rotate() {
      this.armRotate = true
      clearInterval(this.time)
      setTimeout(() => {
        this.time = setInterval(() => {
          this.rad += 0.005

          this.$refs.rotateDisk.style.transform = 'rotate(' + this.rad + 'rad)'
        }, 20)
      }, 500)
    },
    //停止旋转
    stopRotate() {
      this.armRotate = false
      clearInterval(this.time)
    }
  },
  computed: {
    ...mapState({
      lyrics: state => {
        let Arr
        if (state.play.lyrics == '0') Arr = ['[99:00.00]暂无歌词']
        else Arr = state.play.lyrics.split('\n')
        let tempArr = []
        for (let i = 0; i < Arr.length; i++) {
          let time = parseFloat(Arr[i].slice(1, 3)) * 60 + parseFloat(Arr[i].slice(4, 10))
          let lyric = Arr[i].slice(Arr[i].indexOf(']') + 1)
          tempArr.push({ time, lyric })
        }
        if (tempArr.length > 1)
          tempArr[tempArr.length - 1].time = tempArr[tempArr.length - 2].time + 100
        return tempArr
      }
    })
  },
  created() {
    this.isRotate = bus.isRotate
    if (this.isRotate) this.rotate()
    else this.stopRotate()

    if (bus.rad) {
      this.rad = bus.rad
    }

    bus.$off('stopPlayRotate')
    bus.$on('stopPlayRotate', () => this.stopRotate())

    bus.$off('songInfo')
    bus.$on('songInfo', data => {
      this.songData = data
    })

    bus.$off('curInfo')

    if (this.lyrics.length > 2) {
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
    }

    bus.$off('changeRotate')
    bus.$on('changeRotate', val => {
      if (val == 1) {
        this.rotate()
      } else if (val == 0) {
        this.stopRotate()
      }
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
  },
  beforeDestroy() {
    bus.rad = this.rad % (Math.PI * 2)
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

    .arm {
      position: absolute;
      top: 100px;
      left: 345px;
      width: 30px;
      height: 30px;
      perspective: 300px;
      transform: rotate(35deg);
      transition: transform;
      transition-duration: 0.5s;
      z-index: 1000;
      img {
        position: absolute;
        top: -30px;
        left: -40px;
        width: 250px;
        transform: rotateX(-40deg);
      }
    }
    .arm-rotate {
      // .arm();
      transform: rotate(65deg);
    }

    .disk {
      @rad: var(--Rad);
      position: absolute;
      top: 180px;
      left: 200px;
      .grey {
        width: 310px;
        height: 310px;
        line-height: 310px;
        text-align: center;
        border-radius: 155px;
        background-color: #dedede;
        transform: rotate(calc(@rad*1rad));
        .black {
          display: inline-block;
          width: 280px;
          height: 280px;
          line-height: 280px;
          text-align: center;
          border-radius: 140px;
          background-color: #222;
          img {
            width: 200px;
            height: 200px;
            border-radius: 100px;
            background-size: cover;
          }
        }
      }
    }
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
