<template>
  <div class="like-container">
    <SongTableVue :songsList="likes"></SongTableVue>
  </div>
</template>

<script>
export default {
  name: 'LikeVue',
  data() {
    return {
      likes: []
    }
  },
  created() {
    let likes = JSON.parse(localStorage.getItem('likes'))
    if (likes) {
      this.likes = likes
    }
  }
}
</script>

<style lang="less" scoped>
// .like-container {
// }
</style>
