<template>
  <div id="song-container">
    <SongTableVue :songsList="songsList" v-if="songsList"></SongTableVue>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SongVue',
  computed: {
    ...mapState({
      songsList: state => state.search.searchResult,
      audioList: state => state.search.audioList
    })
  }
}
</script>

<style lang="less" scoped></style>
