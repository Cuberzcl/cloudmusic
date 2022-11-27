<template>
  <div id="find-music-container">
    <!-- 标签页 -->
    <div class="tabs">
      <ul>
        <li
          v-for="(item, index) in tabs"
          :key="index"
          :data-routeName="item.routeName"
          :class="{ selected: index == tabIndex }"
          @click="changeTabIndex(index)"
        >
          <i></i>
          {{ item.name }}
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'FindMusicVue',
  data() {
    return {
      tabIndex: this.$route.meta.tabIndex, //选中的标签序号
      tabs: [
        { name: '个性推荐', routeName: 'recommend' },
        { name: '专属定制', routeName: 'custom_made' },
        { name: '歌单', routeName: 'song_list' },
        { name: '排行榜', routeName: 'rank' },
        { name: '歌手', routeName: 'artist_in_find_music' },
        { name: '最新音乐', routeName: 'latest_music' }
      ]
    }
  },
  methods: {
    /**改变标签页序号并跳转路由 */
    changeTabIndex(index) {
      this.$router.push({ name: this.tabs[index].routeName })
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
#find-music-container {
  .tabs {
    margin-top: 20px;
    margin-left: 20px;
    .selected {
      font-size: 28px;
      font-weight: bolder;
      i {
        border-bottom: 5px solid @primaryColor;
      }
    }
    li {
      display: inline-block;
      margin: 0 15px;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      text-align: center;
      position: relative;
      font-family: @primaryFontFamily;
      cursor: pointer;
      i {
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        height: 60px;
        width: 90%;
        border-radius: 15px;
        z-index: -1;
      }
    }
  }
}
</style>
