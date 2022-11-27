<template>
  <div id="recommend-container">
    <!-- 轮播图  -->
    <el-carousel :interval="6000" type="card" height="220px" v-if="bannerShow">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
        <span class="typeTitle" :style="{ '--titleColor': item.titleColor }">
          {{ item.typeTitle }}
        </span>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { get_banners } from '@/api'
export default {
  name: 'RecommendVue',
  data() {
    return {
      banners: [], //轮播图数据
      bannerShow: false
    }
  },
  methods: {
    /**获取banners */
    async getBanners() {
      let { data: res } = await get_banners()
      if (res.code === 200) {
        this.banners = res.banners.map(item => ({
          imageUrl: item.imageUrl,
          titleColor: item.titleColor,
          typeTitle: item.typeTitle
        }))

        /**暂存banners，减少访问服务器次数 */
        sessionStorage.setItem('banners', JSON.stringify(this.banners))
      } else {
        console.log('banner err')
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
#recommend-container {
  /deep/ .el-carousel {
    width: 1194px;
    margin: 50px auto;
    button {
      i {
        font-weight: bold;
      }
    }

    .el-carousel__item {
      border-radius: 20px !important;
      width: 594px;
      cursor: pointer;

      img {
        width: 100%;
      }
      .typeTitle {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 5px 10px;
        border-top-left-radius: 20px;
        display: inline-block;
        background-color: var(--titleColor);
        color: white;
        font-weight: bold;
        font-size: 16px;
        z-index: 999;
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
