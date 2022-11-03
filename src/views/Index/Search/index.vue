<template>
  <div class="search-container">
    <h2>搜索 {{ $route.params.keyword }}</h2>
    <ul class="router-menu" @click="changeSearchType">
      <li :class="{ selected: 'song' == activeIndex }" data-name="song" index="song">单曲</li>
      <li :class="{ selected: 'artist' == activeIndex }" data-name="artist" index="artist">歌手</li>
      <li :class="{ selected: 'album' == activeIndex }" data-name="album" index="album">专辑</li>
    </ul>
    <div class="transition-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import bus from '@/EventBus'
export default {
  name: 'SearchVue',
  data() {
    return {
      activeIndex: bus.activeIndex || 'song' //激活菜单的index
    }
  },
  methods: {
    //改变搜索类型（跳转路由）
    changeSearchType(e) {
      let { name } = e.target.dataset
      if (name) {
        this.$router.push({
          name,
          params: { keyword: this.$route.params.keyword || undefined },
          query: { k: this.$route.params.keyword || undefined }
        })

        this.activeIndex = name
        bus.activeIndex = name
      }
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('getSearchRes', { searchInput: this.$route.params.keyword })
    }
  },
  beforeCreate() {
    this.$store.dispatch('getSearchRes', { searchInput: this.$route.params.keyword })
  },
  beforeDestroy() {
    bus.searchInput = ''
  }
}
</script>

<style lang="less" scoped>
.search-container {
  flex: auto;
  // font-weight: bold;
  h2 {
    margin: 20px;
    font-family: '楷体';
    font-weight: bold;
  }
  a {
    text-decoration: none;
  }
  .router-menu {
    li {
      width: 50px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      text-align: center;
      margin: 0 20px;
      font-size: 16px;
      font-family: @primaryFontFamily;
      cursor: pointer;

      &:hover {
        .selected();
      }
    }
    .selected {
      color: @primaryColor;
      border-bottom: 2px @primaryColor solid;
    }
  }
}
</style>
