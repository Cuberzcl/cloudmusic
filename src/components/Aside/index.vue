<template>
  <div
    class="aside-container"
    @mouseenter="scrollerLive = true"
    @mouseleave="scrollerLive = false"
    :class="{ scroller: scrollerLive }"
    :style="{ '--myColor': color }"
  >
    <div class="base-functions">
      <ul>
        <li v-for="(item, index) in baseFunctions" :key="index" @click="changeBaseIndex(index)">
          <router-link :to="item.path" :class="{ changeBGC: baseIndex == index }">{{
            item.name
          }}</router-link>
        </li>
      </ul>
    </div>
    <div class="my-music">
      <p>我的音乐</p>
      <ul>
        <li v-for="(item, index) in myMusic" :key="index" @click="changeMusicIndex(index)">
          <router-link :to="item.path" :class="{ changeBGC: musicIndex == index }"
            ><i :class="item.icon"></i>{{ item.name }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from '@/EventBus'

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
      myMusic: [
        {
          name: '我喜欢的音乐',
          path: '/index/mymusic/like',
          icon: 'glyphicon glyphicon-heart-empty'
        },
        {
          name: '本地与下载',
          path: '/index/mymusic/saved',
          icon: 'glyphicon glyphicon-download-alt'
        },
        { name: '最近播放', path: '/index/mymusic/recent', icon: 'glyphicon glyphicon-time' },
        {
          name: '我的音乐云盘',
          path: '/index/mymusic/cloud',
          icon: 'glyphicon glyphicon-cloud'
        },
        { name: '我的博客', path: '/index/mymusic/podcast', icon: 'glyphicon glyphicon-equalizer' },
        {
          name: '我的收藏',
          path: '/index/mymusic/collection',
          icon: 'glyphicon glyphicon-star-empty'
        }
      ],
      scrollerLive: false,
      baseIndex: -1,
      musicIndex: -1,
      key: 1,
      color: bus.color
    }
  },
  methods: {
    changeBaseIndex(i) {
      this.musicIndex = -1
      this.baseIndex = i
    },
    changeMusicIndex(i) {
      this.baseIndex = -1
      this.musicIndex = i
    }
  },
  created() {
    this.baseIndex = this.$route.meta.baseIndex
    this.musicIndex = this.$route.meta.musicIndex
  },
  watch: {
    $route: {
      handler() {
        this.baseIndex = this.$route.meta.baseIndex
        this.musicIndex = this.$route.meta.musicIndex
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.aside-container {
  @color: var(--myColor);
  width: 200px;
  min-width: 200px;
  height: 100%;
  overflow: auto;
  border-right: 1px solid #e0e0e0;
  background-color: @color;
  position: relative;
  z-index: 999;
  a {
    color: black;
    text-decoration: none;
    display: block;
    &:hover {
      color: black;
    }
  }
  .changeBGC {
    background-color: #f6f6f7;
  }

  .my-ul {
    li {
      width: 100%;
      height: @liHeight;
      text-align: left;
      padding: 0 5px;
      a {
        height: @liHeight;
        padding-left: 15px;
        line-height: @liHeight;
        font-size: 16px;
        font-family: @my-font-family;
        border-radius: 4px;
        i {
          margin: 5px;
          position: relative;
          top: 3px;
          .wordGradientColor(pink,#ffffaa);
        }
        &:hover {
          .changeBGC();
        }
      }
    }
  }
  .base-functions {
    float: left;
    width: 100%;
    height: auto;
    margin-top: 10px;
    .my-ul();
  }

  .my-music {
    float: left;
    width: 100%;
    margin-top: 5px;
    p {
      width: 100%;
      height: @liHeight;
      line-height: @liHeight;
      text-align: left;
      padding: 0 20px;
      margin: -5px 0;
      font-size: 14px;
      color: #9f9f9f;
    }
    .my-ul();
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
