<template>
  <div class="audio-control-container" @keyup="keyOperation">
    <div class="audio">
      <div class="play-mask" v-show="playMask"></div>
      <audio-player
        ref="audioPlayer"
        :audio-list="audioList.map(elm => elm.url)"
        :theme-color="controlsColor"
        :progress-interval="50"
        :show-play-button="audioList[0].url != ''"
        :show-volume-button="false"
        :show-prev-button="false"
        :show-next-button="false"
        :show-playback-rate="false"
        @play="rotate"
        @pause="stop_rotate"
        @ended="clearDeg"
        @timeupdate="sendCurInfo"
      />
      <div class="audio-volume" @mouseleave="showSlider = false">
        <!--  -->
        <span
          class="icon glyphicon glyphicon-volume-up"
          v-if="volume != 0"
          @mouseenter="showSlider = true"
          @click="
            volume = 0
            showSlider = false
          "
        ></span>
        <span
          class="icon1 glyphicon glyphicon-volume-off"
          v-else
          @click="
            volume = 50
            showSlider = true
          "
        ></span>
        <el-collapse-transition>
          <div v-show="showSlider" class="transition-box block">
            <el-slider v-model="volume" :show-tooltip="false"> </el-slider>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/EventBus'
import axios from 'axios'
import { get_song_url } from '@/api'
export default {
  name: 'AudioControlVue',
  data() {
    return {
      deg: 0, //旋转度数
      speed: 10, //旋转速度
      time: 0, //记录定时器
      setTime: 0, //记录储存播放时间的定时器
      controlsColor: this.Global.theme.color.primaryColor, //主题颜色
      volume: 50, //音量
      showSlider: false, //是否出现音量滑块
      currentAudioName: '',
      audioList: [{ url: '' }],
      songData: {},
      lastUrl: localStorage.getItem('url'),
      autoPlay: false, //用于防止一开始就播放
      volumeTime: 0, //记录声音缓动的计时器
      playMask: false //用于播放防抖的遮罩
    }
  },
  methods: {
    rotate() {
      //播放暂停防抖
      this.playMask = true
      setTimeout(() => {
        this.playMask = false
      }, 500)

      if (this.$route.path == '/play') bus.$emit('changeRotate', 1)

      let tempVolume = this.volume
      if (tempVolume !== 0) {
        this.volume = 1
        this.volumeTime = setInterval(() => {
          this.volume += 1
        }, 1000 / tempVolume)

        setTimeout(() => {
          this.volume = tempVolume
          clearInterval(this.volumeTime)
        }, 1000)
      }

      bus.isRotate = true

      clearInterval(this.time)
      clearInterval(this.setTime)
      var slider_btn = document.querySelector('.audio__progress-point')

      this.time = setInterval(() => {
        this.deg += 0.15

        slider_btn.style.transform = 'rotate(' + this.deg + 'rad)'
      }, 5 * this.speed)

      var audio = document.querySelector('.audio-player__audio')
      localStorage.setItem('duration', audio.duration)
      this.setTime = setInterval(() => {
        localStorage.setItem('currentTime', audio.currentTime)
      }, 1000)
    },
    stop_rotate() {
      //播放暂停防抖
      this.playMask = true
      setTimeout(() => {
        this.playMask = false
      }, 500)

      var audio = document.querySelector('.audio-player__audio')
      audio.play()

      let tempVolume = this.volume
      this.volumeTime = setInterval(() => {
        this.volume -= 1
        if (this.volume < 5) {
          clearInterval(this.volumeTime)
          this.volumeTime = 1
        }
      }, 1000 / tempVolume)

      setTimeout(() => {
        audio.pause()
        this.volume = tempVolume
        if (this.volumeTime !== -1) clearInterval(this.volumeTime)
      }, 1000)

      if (this.$route.path == '/play') bus.$emit('changeRotate', 0)
      bus.isRotate = false

      clearInterval(this.time)
      clearInterval(this.setTime)
    },
    //设置音量
    setVolume() {
      var audio = document.querySelector('audio')
      audio.volume = this.volume / 100
    },
    //清除旋转度数
    clearDeg() {
      this.deg = 0
    },
    //发送歌曲信息到Play
    sendCurInfo() {
      var data = this.$refs.audioPlayer.currentTime
      bus.currentTime = data
      bus.$emit('curInfo', data)
    },
    //播放上一次的歌曲
    lastSong() {
      let currentTime = localStorage.getItem('currentTime')
      let duration = localStorage.getItem('duration')
      if (currentTime) {
        var audio = document.querySelector('.audio-player__audio')
        var wrap = document.querySelector('.audio__progress-wrap')
        var progress = document.querySelector('.audio__progress')
        var point = document.querySelector('.audio__progress-point')

        audio.load()
        audio.currentTime = currentTime
        this.$refs.audioPlayer.currentTime = currentTime
        bus.currentTime = currentTime

        let propor = currentTime / duration
        let width = propor * wrap.clientWidth
        progress.style.width = width + 'px'
        point.style.left = width - point.clientWidth / 2 + 'px'
      }
    },
    //用于获取上一次的歌曲url
    async getSongUrl(id) {
      let { data: res } = await get_song_url({ id: id })
      if (res.code === 200) {
        this.audioList[0].url = res.data[0].url
        localStorage.setItem('url', res.data[0].url)
        this.lastSong()
      } else {
        console.log('err')
      }
    },
    //监听键盘事件
    keyOperation(e) {
      console.log(1)
      console.log(e)
    }
  },
  created() {},
  mounted() {
    //初始主题图片
    let renewPic = () => {
      let play = document.querySelector('.audio__progress-point')
      let volume = document.querySelector('.el-slider__button')
      play.style.backgroundImage =
        'url(' + require('@/assets/theme/' + this.Global.theme.themeName + '/play.png') + ')'
      volume.style.backgroundImage =
        'url(' + require('@/assets/theme/' + this.Global.theme.themeName + '/volume.png') + ')'
    }

    let remountAudioControl = () => {
      this.controlsColor = this.Global.theme.color.primaryColor
      renewPic()
    }
    //重新渲染
    bus.$off('remount', remountAudioControl)
    bus.$on('remount', remountAudioControl)

    renewPic()

    this.setVolume()

    let songData = localStorage.getItem('songData')
    if (songData) {
      this.songData = JSON.parse(songData)
      if (this.lastUrl == '') {
        this.getSongUrl(this.songData.id)
        return
      }
      axios
        .head(this.lastUrl)
        .then(() => {
          this.audioList[0].url = this.lastUrl
          this.lastSong()
        })
        .catch(() => {
          this.getSongUrl(this.songData.id)
        })
    }

    bus.$on('playAudio', val => {
      this.audioList[0].url = val
      localStorage.setItem('url', val)
      setTimeout(() => {
        this.$refs.audioPlayer.play()
      }, 100)
    })
    bus.$on('changeSongTime', val => {
      var audio = document.querySelector('.audio-player__audio')
      audio.load()
      audio.currentTime = val
      this.$refs.audioPlayer.play()
    })
  },
  watch: {
    //监听音量变化
    volume() {
      this.setVolume()
    }
  }
}
</script>

<style lang="less" scoped>
.audio-control-container {
  width: 600px;
  height: 70px;
  position: absolute;
  left: 50%;
  top: 3px;
  transform: translateX(-50%);
  // background-color: pink;
  text-align: center;

  .audio {
    position: absolute;
    top: 0;
    left: 0;
    .play-mask {
      float: left;
      position: absolute;
      top: 0px;
      left: 230px;
      width: 42px;
      height: 42px;
      background-color: transparent;
      // background-color: pink;
      z-index: 10000;
    }
    /deep/ .audio-player {
      .audio__btn-wrap {
        margin-bottom: 0;
        // .audio__play-icon {
        .audio__play-volume-wrap {
          margin-bottom: 10px;
          height: 100px;
          width: 10px;
          .audio__play-volume {
            height: 100px;
            width: 10px;
          }
        }
      }
      .audio__progress-wrap {
        margin-top: 20px;
        width: 500px;
        .audio__progress-point {
          border: 0;
          position: relative;
          top: -9px;
          left: -10px;
          width: 20px;
          height: 20px;
          background-color: transparent !important;
          box-shadow: 0 0 0 0 !important;
          background-size: contain;
          &:after {
            display: none;
          }
        }
      }
      .audio__time-wrap {
        width: 500px;
        position: relative;
        top: -17px;
        .audio__current-time {
          position: absolute;
          left: -45px;
          color: @primaryColor;
        }
        .audio__duration {
          position: absolute;
          right: -42px;
          color: @primaryColor;
        }
      }
    }

    .audio-volume {
      width: 170px;
      height: 50px;
      position: relative;
      top: -70px;
      left: 345px;
      // background-color: #aaa;
      .icon {
        position: absolute;
        left: 17px;
        top: 20px;
        color: @primaryColor;
        transform: scale(1.6, 2.4);
      }
      .icon1 {
        position: absolute;
        left: 17px;
        top: 20px;
        color: @primaryColor;
        transform: scale(1.6, 2.4);
      }
      .block {
        width: 120px;
        // background-color: #000;
        position: absolute;
        bottom: 4px;
        left: 45px;
        /deep/ .el-slider__runway {
          margin-top: 20px;
          margin-left: 6px;
          width: 100px !important;

          .el-slider__bar {
            width: 100%;
            background-color: @primaryColor;
          }
        }
        /deep/ .el-slider__button-wrapper {
          cursor: default;
          .el-slider__button {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 20px;
            height: 20px;
            cursor: default;
            border: 0;
            background-color: transparent !important;
            background-size: cover;
            transition: none;
          }
        }
      }
    }
  }
}
</style>
