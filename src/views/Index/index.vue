<template>
  <div class="index-container">
    <AsideVue></AsideVue>
    <div class="view-container">
      <transition name="view">
        <router-view class="view" v-if="viewLive"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import AsideVue from '@/components/Aside'

export default {
  name: 'IndexVue',
  data() {
    return { viewLive: false }
  },
  components: {
    AsideVue
  },
  created() {
    setTimeout(() => {
      this.viewLive = true
    }, 50)
  },
  watch: {
    $route: {
      handler() {
        this.viewLive = false
        setTimeout(() => {
          this.viewLive = true
        }, 100)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.index-container {
  display: flex;
  order: 2;
  height: 800px;

  .view-container {
    flex: auto;
    overflow: hidden;
    background-color: @indexViewColor;
    .view {
      height: 800px;
      overflow: auto;
      position: relative;
      z-index: 0;

      &::-webkit-scrollbar {
        width: 6px;

        height: 10px;

        background-color: #eee;
      }

      /*定义滚动条轨道

内阴影+圆角*/

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);

        border-radius: 3px;

        background-color: #f5f5f5;
      }

      /*定义滑块

内阴影+圆角*/

      &::-webkit-scrollbar-thumb {
        border-radius: 3px;

        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

        background-color: #ff94a9;
      }
    }
  }

  .view-enter {
    opacity: 0;
    left: 1605px;
  }
  .view-enter-to {
    opacity: 1;
    left: 0;
  }
  .view-enter-active {
    transition: all 0.5s linear;
  }
  .view-leave {
    opacity: 1;
    left: 0;
  }
  .view-leave-to {
    opacity: 0;
    left: -1800px;
  }
  .view-leave-active {
    transition: all 0.5s linear;
  }
}
</style>
