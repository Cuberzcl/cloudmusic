<template>
  <div
    class="lyrics-container"
    :class="{ scroller: scroller }"
    @mouseenter="scroller = true"
    @mouseleave="scroller = false"
  >
    <div class="lyrics" ref="lyrics">
      <h1></h1>
      <h1></h1>
      <p v-for="(i, index) in lyricsArr" :key="index" :class="{ cur: index == 0 }">
        {{ i.lyric }}
      </p>
      <h1></h1>
    </div>
  </div>
</template>

<script>
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
      scroller: false
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
        document.querySelector('.lyrics').scrollTo({ top: scrollY - 280, behavior: 'smooth' })
      })
    }
  },
  mounted() {
    this.updateCur(this.index, 0)
  },
  watch: {
    index(nv, ov) {
      console.log(1)
      if (ov == -1) ov = 0
      this.updateCur(nv, ov)
    }
  }
}
</script>

<style lang="less" scoped>
.lyrics-container {
  margin-top: 5px;
  width: 40%;
  height: 55%;
  overflow: auto;
  text-align: center;

  // background-color: #fff;
  p,
  h1 {
    text-align: center;
    margin: 50px 20px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: #555;
  }
  .cur {
    height: 50px;
    line-height: 50px;
    font-weight: bolder;
    font-size: 30px;
    font-family: '黑体';
    margin: 90px 20px;
    color: #0f0f0f;
  }
  .prev {
    background: linear-gradient(180deg, #ffffff 10%, #0f0f0f 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .lyrics {
    height: 100%;
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

  background-color: #eee;
}

/*定义滚动条轨道

内阴影+圆角*/

.scroller::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);

  border-radius: 3px;

  background-color: #e5ffff;
}

/*定义滑块

内阴影+圆角*/

.scroller::-webkit-scrollbar-thumb {
  border-radius: 3px;

  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

  background-color: #aff;
}
</style>
