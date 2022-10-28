<template>
  <div
    id="app"
    :key="key"
    :style="{
      '--WP': Global.widthProportion,
      '--HP': Global.heightProportion,
      '--primaryColor': Global.theme.color.primaryColor,
      '--primaryColorH': Global.theme.color.primaryColorH,
      '--indexViewColor': Global.theme.color.indexViewColor,
      '--tableColor': Global.theme.color.tableColor
    }"
  >
    <transition name="wel">
      <div class="wel" v-if="welcome">
        <p>欢迎来到网易云！</p>
        <div class="start" @click="enter">Get Started</div>
      </div>
    </transition>

    <HeaderVue v-if="!welcome"></HeaderVue>
    <FooterVue v-if="!welcome"></FooterVue>
    <router-view v-if="!welcome" />
  </div>
</template>

<script>
import HeaderVue from '@/components/Header'
import FooterVue from '@/components/Footer'
import bus from '@/EventBus'
export default {
  name: 'AppVue',
  components: {
    HeaderVue,
    FooterVue
  },
  data() {
    return { key: 1, welcome: true }
  },
  methods: {
    enter() {
      this.welcome = false
      bus.$emit('prePlay')
    }
  },
  created() {
    let primaryColor = localStorage.getItem('primaryColor')
    let theme = localStorage.getItem('theme')
    if (theme) {
      this.Global.theme.changeTheme(theme)
    } else if (primaryColor) {
      this.Global.theme.changePrimaryColor(primaryColor)
    }
  },
  mounted() {
    let remountApp = () => {
      this.$forceUpdate()
    }
    //重新渲染
    bus.$off('remount', remountApp)
    bus.$on('remount', remountApp)

    let w = window.innerWidth / 1805
    let h = window.innerHeight / 937
    this.Global.changeProportion(w, h)
    this.key = 1 - this.key

    window.addEventListener('resize', () => {
      let w = window.innerWidth / 1805
      let h = window.innerHeight / 937
      this.Global.changeProportion(w, h)
      this.key = 1 - this.key
    })
  }
}
</script>

<style lang="less" scoped>
#app {
  @WP: var(--WP);
  @HP: var(--HP);
  @min: min(@WP, @HP);

  // background-color: red;
  width: 1805px;
  height: 937px;
  transform: scale(@min);
  transform-origin: 0 0;

  overflow: hidden;

  display: flex;
  position: relative;
  flex-direction: column;

  .wel {
    position: absolute;
    width: 1805px;
    height: 937px;
    z-index: 999;
    background-color: pink;
    background-image: url(./assets/白花.png);
    background-size: cover;
    p {
      display: inline-block;
      font-size: 100px;
      font-family: '华文行楷';
      background-image: -webkit-gradient(linear, left 0, right 0, from(pink), to(#ec4141));
      background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: default;
      &:hover {
        background-image: -webkit-gradient(linear, left 0, right 0, from(#ec4141), to(pink));
      }
    }
    .start {
      width: 200px;
      height: 100px;
      line-height: 100px;
      margin-top: 300px;
      margin-left: 200px;
      border-radius: 50px;
      background: linear-gradient(to bottom right, #ddffff, #ffffdd, #ffddff);
      text-align: center;
      font-size: 30px;
      color: #aaa;
      transition-property: background font-size color font-family;
      transition-duration: 0.5s;
      cursor: pointer;
      &:hover {
        background: linear-gradient(to bottom right, #eeffff, #ffffee, #ffeeff);
        font-size: 32px;
        color: #aaeeff;
        font-family: '微软雅黑';
      }
    }
  }
  .wel-leave {
    opacity: 1;
  }
  .wel-leave-to {
    opacity: 0;
  }
  .wel-leave-active {
    transition: all 0.5s linear;
  }
}
</style>
