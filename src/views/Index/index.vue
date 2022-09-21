<template>
  <div class="index-container">
    <FindMusicVue></FindMusicVue>
    <router-view></router-view>
  </div>
</template>

<script>
import FindMusicVue from '@/components/FindMusic'

export default {
  name: 'IndexVue',
  components: {
    FindMusicVue
  }
}
</script>

<style lang="less" scoped>
.index-container {
  display: flex;
  // background-color: aqua;
  order: 2;
  height: 795px;
}
</style>
