<template>
  <div
    id="app"
    :style="{
      transform: `scale(${scalesNum}) translate(-50%,0)`,
      '-webkit-transform': `scale(${scalesNum}) translate(-50%,0)`,
      '-moz-transform': `scale(${scalesNum}) translate(-50%,0)`,
      '-o-transform': `scale(${scalesNum}) translate(-50%,0)`,
      '-ms-transform': `scale(${scalesNum}) translate(-50%,0)`
    }"
  >
    <HeaderVue></HeaderVue>
    <FooterVue></FooterVue>
    <router-view />
  </div>
</template>

<script>
import HeaderVue from '@/components/Header'
import FooterVue from '@/components/Footer'
export default {
  name: 'AppVue',
  components: {
    HeaderVue,
    FooterVue
  },
  data() {
    return {
      scalesNum: 1 // 缩放比例
    }
  },
  mounted() {
    // 计算缩放比例

    this.resize_window()

    window.addEventListener('resize', () => {
      this.resize_window()
    })
  },
  methods: {
    resize_window() {
      // 因为设计图是带1788*920的，但是浏览器本身带顶部工具栏，所以缩放到时候稍微更小一点，这样不会有滚动条，这个值可以选择更大些，比如2300，这样左右两边会有空白
      let myWidth = document.documentElement.clientWidth
      let myHeight = document.documentElement.clientHeight
      // console.log(myWidth + ' ' + myHeight)
      if (myHeight / 1788 !== 0 && myWidth / 1788 / (myHeight / 920) >= 1) {
        // console.log()
        this.scalesNum = myHeight / 920
      } else {
        this.scalesNum = myWidth / 1788
      }
    }
  }
}
</script>

<style>
body,
html {
  overflow: hidden;
}
#app {
  margin: 0;

  padding: 0;

  transform-origin: 0 0;

  position: relative;

  width: 1788px;

  height: 940px;

  left: 50%;

  overflow: hidden;

  display: flex;
  flex-direction: column;
}
</style>
