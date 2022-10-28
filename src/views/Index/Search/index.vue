<template>
  <div class="search-container">
    <h2>搜索 {{ $route.params.keyword }}</h2>
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
    return {}
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
}
</style>
