<template>
  <div
    class="lyrics-container"
    :class="{ scroller: scroller }"
    @mouseenter="scroller = true"
    @mouseleave="scroller = false"
    @scroll="changeScrollIndex"
  >
    <div class="lyrics clearfix" ref="lyrics">
      <div class="timePointer" v-if="pointer">
        <div class="left" v-if="scrollIndex !== -1">{{ timeFormat(lyrics[scrollIndex].time) }}</div>
        <div class="right" v-if="scrollIndex !== -1">
          <i
            class="el-icon-video-play"
            @click="changeSongTime"
            v-if="scrollIndex != -1 && scrollIndex != lyrics.length - 1"
          ></i>
        </div>
      </div>
      <h1></h1>
      <h1></h1>
      <p v-for="(i, index) in lyricsArr" :key="index" :class="{ cur: index == 0 }">
        {{ i.lyric }}
      </p>
      <h1></h1>
      <h1></h1>
      <h1></h1>
    </div>
    <div class="bottom-border"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import bus from '@/EventBus'

export default {
  name: 'LyricsVue',
  props: {
    lyrics: {
      type: Array
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      lyricsArr: this.lyrics,
      scroller: false,
      scrollIndex: -1,
      changeScrollIndexLive: true,
      scrollTime: 0,
      pointer: false
    }
  },
  methods: {
    updateCur(nv, ov) {
      this.$nextTick(() => {
        var ls = this.$refs.lyrics.querySelectorAll('p')[nv]
        var ols = this.$refs.lyrics.querySelectorAll('p')[ov]
        ols.className = ''
        ls.className = 'cur'
        var scrollY = ls.offsetTop

        this.changeScrollIndexLive = false
        $('.lyrics').animate({ scrollTop: scrollY - 280 + 'px' }, 'swing', () => {
          setTimeout(() => {
            this.changeScrollIndexLive = true
          }, 200)
        })
      })
    },
    changeScrollIndex(e) {
      if (!this.changeScrollIndexLive) return
      this.pointer = true
      clearTimeout(this.scrollTime)
      this.scrollTime = setTimeout(() => {
        this.pointer = false
        this.scrollChange = false
        var ls = this.$refs.lyrics.querySelectorAll('p')[this.index]
        var scrollY = ls.offsetTop

        this.changeScrollIndexLive = false
        $('.lyrics').animate({ scrollTop: scrollY - 280 + 'px' }, 'swing', () => {
          this.changeScrollIndexLive = true
        })
      }, 2000)

      var lss = this.$refs.lyrics.querySelectorAll('p')
      for (var i = 0; i < lss.length; i++) {
        let margin = getComputedStyle(lss[i], null).marginTop
        margin = parseInt(margin.slice(0, margin.length - 2))

        let height = getComputedStyle(lss[i], null).height
        height = parseInt(height.slice(0, height.length - 2))

        if (
          e.target.scrollTop + 350 <= lss[i].offsetTop + margin + height &&
          e.target.scrollTop + 350 > lss[i].offsetTop
        ) {
          this.scrollIndex = i
          break
        }
      }
    },
    timeFormat(time) {
      if (time) {
        if (this.scrollIndex == this.lyrics.length - 1) return '終わり'
        let s = Math.floor(time)
        let m = parseInt(s / 60)
        s = s % 60
        if (m < 10) m = '0' + m
        if (s < 10) s = '0' + s
        return m + ':' + s
      }
    },
    changeSongTime() {
      clearTimeout(this.scrollTime)
      bus.$emit('changeSongTime', this.lyrics[this.scrollIndex].time)
    }
  },
  mounted() {
    this.updateCur(this.index, 0)
  },
  watch: {
    index(nv, ov) {
      if (ov == -1) ov = 0
      if (nv == -1) return
      this.updateCur(nv, ov)
    },
    scrollIndex(nv, ov) {
      if (ov == -1) ov = 0
      if (nv == -1) return

      var ls = this.$refs.lyrics.querySelectorAll('p')[nv]
      var ols = this.$refs.lyrics.querySelectorAll('p')[ov]
      if (ov != this.index) ols.className = ''
      if (nv != this.index) ls.className = 'scrollCur'
    }
  }
}
</script>

<style lang="less" scoped>
.lyrics-container {
  margin-top: 5px;
  width: 50%;
  height: 55%;
  overflow: auto;
  text-align: center;

  // background-color: #fff;

  .lyrics {
    height: 100%;
    width: 100%;
    .timePointer {
      width: 38%;
      height: 40px;
      position: fixed;
      top: 350px;
      left: 550px;
      .left,
      .right {
        position: absolute;
        height: 40px;
        width: 100px;
        line-height: 50px;
        text-align: center;
        border-bottom: aquamarine 1px solid;
      }
      .left {
        left: -20px;
        font-size: 16px;
        font-family: '仿宋';
        font-weight: bold;
        border-image: linear-gradient(to right, aqua, yellow) 30 30;
      }
      .right {
        right: -20px;
        color: pink;
        font-size: 24px;
        cursor: pointer;
        border-image: linear-gradient(to left, aqua, yellow) 30 30;
      }
    }
    p,
    h1 {
      text-align: center;
      margin: 50px 200px;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #999;
    }
    p {
      height: auto;
    }
    .cur {
      height: auto;
      line-height: 50px;
      font-weight: bolder;
      font-size: 30px;
      font-family: '黑体';
      margin: 90px 200px;
      color: #0f0f0f;
    }
    .scrollCur {
      font-weight: 600;
      color: #555;
    }
    .prev {
      background: linear-gradient(180deg, #ffffff 10%, #0f0f0f 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .bottom-border {
    width: 50%;
    margin: 0 auto;
    position: absolute;
    bottom: 240px;
    border-bottom: 0.5px dotted #000;
    border-image: linear-gradient(
        to left,
        rgba(200, 200, 200, 0.1),
        rgba(200, 200, 200, 0.3) 40%,
        rgba(200, 200, 200, 0.1)
      )
      30 30;
  }
  &::-webkit-scrollbar {
    width: 6px;

    height: 10px;

    background-color: transparent;
  }
}

.scroller::-webkit-scrollbar {
  width: 6px;

  height: 10px;

  // background-color: #eee;
}

/*定义滚动条轨道

内阴影+圆角*/

.scroller::-webkit-scrollbar-track {
  // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);

  border-radius: 3px;

  background-color: transparent;
}

/*定义滑块

内阴影+圆角*/

.scroller::-webkit-scrollbar-thumb {
  border-radius: 3px;

  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

  background-color: #aff;
}
</style>
