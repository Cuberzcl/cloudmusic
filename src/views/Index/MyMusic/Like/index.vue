<template>
  <div class="like-container">
    <div class="info">
      <div class="img"><img :src="likes[0].al.picUrl" alt="" /></div>
      <div class="intro">
        <h3>我喜欢的音乐</h3>
        <p>歌曲：{{ likes.length }}</p>
      </div>
    </div>
    <SongTableVue :songsList="likes" :key="key"></SongTableVue>
  </div>
</template>

<script>
import bus from '@/EventBus'
export default {
  name: 'LikeVue',
  data() {
    return {
      likes: [],
      key: 1
    }
  },
  methods: {
    getLikes() {
      let likes = JSON.parse(localStorage.getItem('likes'))
      if (likes) {
        this.likes = likes.reverse()
      }
    }
  },
  created() {
    this.getLikes()
    bus.$on('updateLikes', () => {
      this.getLikes()
      this.key = 1 - this.key
    })
  }
}
</script>

<style lang="less" scoped>
.like-container {
  .info {
    height: 250px;
    margin: 20px;
    overflow: hidden;
    .img {
      float: left;
      width: 200px;
      height: 200px;
      margin-top: 20px;
      img {
        height: 200px;
        width: 200px;
        border-radius: 10px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      }
    }
    .intro {
      float: left;
      height: 250px;
      width: auto;
      margin-left: 20px;
      h3 {
        font-family: '黑体';
        font-weight: bold;
      }
    }
  }
}
</style>
