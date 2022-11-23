<template>
  <div id="find-music-container">
    <!-- 轮播图  -->
    <el-carousel :interval="4000" type="card" height="200px" v-if="bannerShow">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt=""
      /></el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { get_banners } from '@/api'
export default {
  name: 'FindMusicVue',
  data() {
    return {
      banners: [],
      bannerShow: false
    }
  },
  methods: {
    /**获取banners */
    async getBanners() {
      let { data: res } = await get_banners()
      if (res.code === 200) {
        this.banners = res.banners
        sessionStorage.setItem('banners', JSON.stringify(this.banners))
      } else {
        console.log('err')
      }
    }
  },
  created() {
    let banners = sessionStorage.getItem('banners')
    if (banners) {
      this.banners = JSON.parse(banners)
    } else this.getBanners()
    this.$nextTick(() => {
      this.bannerShow = true
    })
  }
}
</script>

<style lang="less" scoped>
#find-music-container {
  /deep/ .el-carousel {
    width: 1080px;
    margin: 50px auto;
    button {
      i {
        font-weight: bold;
      }
    }

    .el-carousel__item {
      border-radius: 20px !important;
      width: 540px;

      img {
        width: 100%;
      }
    }
    .el-carousel__mask {
      border-radius: 20px;
    }
    .el-carousel__indicators--outside button {
      background-color: @primaryColor !important;
    }
  }
}
</style>
