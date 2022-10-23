<template>
  <div class="search-container">
    <h2>搜索 {{ $route.params.keyword }}</h2>
    <div class="transition-box">
      <SongTableVue :songsList="songsList" v-if="songsList"></SongTableVue>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchVue',
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapState({
      songsList: state => state.search.searchResult.songs,
      audioList: state => state.search.audioList
    })
  },
  watch: {
    $route() {
      this.$store.dispatch('getSearchRes', { searchInput: this.$route.params.keyword })
    }
  },
  beforeCreate() {
    this.$store.dispatch('getSearchRes', { searchInput: this.$route.params.keyword })
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
  }
  a {
    text-decoration: none;
  }
}
</style>
