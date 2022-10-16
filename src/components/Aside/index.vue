<template>
  <div
    class="find-music-container"
    @mouseenter="scrollerLive = true"
    @mouseleave="scrollerLive = false"
    :class="{ scroller: scrollerLive }"
  >
    <ul class="base-functions">
      <li v-for="(item, index) in baseFunctions" :key="index" @click="changeBaseIndex(index)">
        <router-link :to="item.path" :class="{ changeBGC: baseIndex == index }">{{
          item.name
        }}</router-link>
      </li>
    </ul>
    <!-- <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'AsideVue',
  data() {
    return {
      baseFunctions: [
        { name: '发现音乐', path: '/index/basefunc/findmusic' },
        { name: '博客', path: '/index/basefunc/blog' },
        { name: '视频', path: '/index/basefunc/video' },
        { name: '关注', path: '/index/basefunc/subscription' },
        { name: '直播', path: '/index/basefunc/live' },
        { name: '私人FM', path: '/index/basefunc/FM' }
      ],
      scrollerLive: false,
      baseIndex: 0
    }
  },
  methods: {
    changeBaseIndex(i) {
      this.baseIndex = i
    }
  },
  watch: {
    $route() {
      if (this.$route.meta.index) {
        this.baseIndex = this.$route.meta.index
      } else {
        this.baseIndex = -1
      }
    }
  }
}
</script>

<style lang="less" scoped>
@liHeight: 40px;
.find-music-container {
  display: flex;
  float: left;
  width: 200px;
  min-width: 200px;
  height: 100%;
  overflow: auto;
  border-right: 1px solid #e0e0e0;
  // background-color: pink;

  a {
    color: black;
    text-decoration: none;
    display: block;
  }
  .changeBGC {
    background-color: #f6f6f7;
  }
  .base-functions {
    width: 100%;
    li {
      width: 100%;
      height: @liHeight;
      text-align: left;
      padding: 15px 5px;
      a {
        height: @liHeight;
        padding-left: 15px;
        line-height: @liHeight;
        font-size: 16px;
        border-radius: 4px;
        &:hover {
          .changeBGC();
        }
      }
    }
  }
  &::-webkit-scrollbar {
    width: 8px;

    height: 10px;

    background-color: transparent;
  }
}

.scroller::-webkit-scrollbar {
  width: 8px;

  height: 10px;

  // background-color: #eee;
}

.scroller::-webkit-scrollbar-track {
  // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);

  border-radius: 4px;

  background-color: transparent;
}

.scroller::-webkit-scrollbar-thumb {
  border-radius: 4px;

  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);

  background-color: #e0e0e0;
}
</style>
