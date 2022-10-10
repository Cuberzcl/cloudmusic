<template>
  <div class="index-container">
    <AsideVue></AsideVue>
    <router-view></router-view>
  </div>
</template>

<script>
import AsideVue from '@/components/Aside'

export default {
  name: 'IndexVue',
  components: {
    AsideVue
  }
}
</script>

<style lang="less" scoped>
.index-container {
  display: flex;
  order: 2;
  height: 795px;
}
</style>
