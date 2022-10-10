<template>
  <div class="lyrics-container">
    <div class="lyrics">
      <p v-for="(i, index) in lyricsArr" :key="index">{{ i.slice(i.indexOf(']') + 1) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LyricsVue',
  props: {
    lyrics: {
      type: String
    }
  },
  data() {
    return {
      lyricsArr: this.lyrics.split('\n')
    }
  },
  watch: {
    lyrics() {
      this.$nextTick(() => {
        this.lyricsArr = this.lyrics.split('\n')
      })
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
  // background-color: #fff;

  &::-webkit-scrollbar {
    width: 6px;

    height: 10px;

    background-color: #eee;
  }

  /*定义滚动条轨道

内阴影+圆角*/

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);

    border-radius: 3px;

    background-color: #e5ffff;
  }

  /*定义滑块

内阴影+圆角*/

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;

    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

    background-color: #aff;
  }

  .lyrics {
    height: 100%;
  }
}
</style>
