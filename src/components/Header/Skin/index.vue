<template>
  <div id="skin-container" ref="skin">
    <el-tabs type="border-card">
      <el-tab-pane label="主题">
        <div class="content">
          <ul class="themes" @click="changeTheme">
            <li
              :data-theme_name="item.name"
              :data-index="index"
              v-for="(item, index) in themes"
              :key="index"
              :class="{ 'theme-selected': index == themeIndex }"
              :style="{
                'background-image':
                  'url(' + require('@/assets/theme/' + item.name + '/play.png') + ')'
              }"
            >
              <p
                :data-theme_name="item.name"
                :data-index="index"
                :style="{ color: item.primaryColor, fontFamily: item.font }"
              >
                {{ item.alias }}
              </p>
            </li>
          </ul>
        </div></el-tab-pane
      >
      <el-tab-pane label="纯色"
        ><div class="content">
          <div class="pre-define" @click="choosePre">
            <ul>
              <li
                :data-color="item"
                :data-index="index"
                v-for="(item, index) in predefineColors"
                :key="index"
                :style="{ backgroundColor: item, border: '1px dotted {{item}}' }"
              >
                <i class="el-icon-check selected" v-if="preIndex == index"></i>
              </li>
            </ul>
          </div>
          <div class="self-define">
            <h5>自定义颜色</h5>
            <el-color-picker
              v-model="primaryColor"
              show-alpha
              @change="changePrimaryColor(0)"
              class="color-picker"
            ></el-color-picker>
            <i class="el-icon-check selected" v-if="!isPre && !isTheme" @click="selectedClick"></i>
          </div></div
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import bus from '@/EventBus'

export default {
  name: 'SkinVue',
  data() {
    return {
      primaryColor: localStorage.getItem('primaryColor') || 'rgba(19, 206, 102, 0.8)',
      themes: [
        {
          name: 'cherry',
          alias: '落樱粉',
          primaryColor: 'rgb(255,192,203)',
          font: '华光行草_CNKI'
        },
        { name: 'orange', alias: '柑橘橙', primaryColor: 'rgb(255,165,0)', font: '华文行楷' },
        {
          name: 'snowflake',
          alias: '飘雪蓝',
          primaryColor: 'rgb(105, 235, 255)',
          font: '方正舒体'
        }
      ], //主题
      predefineColors: [
        'rgba(240,240,240,0.8)',
        'rgba(236,65,65,0.8)',
        'rgba(255,140,0,0.8)',
        'rgba(255,215,0,0.8)',
        'rgba(144,238,144,0.8)',
        'rgba(0,206,209,0.8)',
        'rgba(30,144,255,0.8)',
        'rgba(255, 69, 0, 0.68)',
        'rgba(255, 120, 0,0.8)',
        'rgba(105, 235, 255,0.8)',
        'rgba(255,165,0,0.8)',
        'rgba(245, 153, 184,0.8)'
      ],
      isPre: false, //是否是预选颜色
      preIndex: localStorage.getItem('preIndex') || -1, //选中判断
      isTheme: false, //是否为主题
      themeIndex: -1, //主题选中判断
      hideDisabled: true //避免第一次点击时隐藏
    }
  },
  methods: {
    //隐藏 skin
    hideSkin() {
      let docClick = e => {
        if (this.hideDisabled) return (this.hideDisabled = false)
        //判断是否是 skin 内部元素
        if (!e.path.some(item => item == this.$refs.skin)) {
          this.$emit('hide')
          document.removeEventListener('click', docClick)
          this.hideDisabled = true
        }
      }
      document.removeEventListener('click', docClick)
      document.addEventListener('click', docClick)
    },
    //更改主题
    changeTheme(e) {
      let { theme_name, index } = e.target.dataset
      this.Global.theme.changeTheme(theme_name)
      this.themeIndex = +index

      this.preIndex = -1
      this.isPre = false
      this.isTheme = true
      localStorage.setItem('theme', theme_name)
      bus.$emit('remount') //重新渲染
    },
    //选择预选颜色
    choosePre(e) {
      let { color, index } = e.target.dataset
      if (color) {
        this.changePrimaryColor(color)
        this.preIndex = index
        this.isPre = true
      }
    },
    //更改主题颜色
    changePrimaryColor(c) {
      let color
      if (c == 0) {
        color = this.primaryColor
        this.preIndex = -1
        this.isPre = false
      } else color = c

      this.isTheme = false
      this.themeIndex = -1
      this.Global.theme.changePrimaryColor(color)
      localStorage.setItem('primaryColor', color)
      localStorage.removeItem('theme')
      bus.$emit('remount') //重新渲染
    },
    //处理 自定义的对钩的click
    selectedClick() {
      let picker = document.querySelector('.el-color-picker__trigger')
      picker.click()
    }
  },
  created() {
    //初始化数据
    let index = localStorage.getItem('preIndex')
    let theme = localStorage.getItem('theme')
    if (!index || index == '-1') {
      this.isPre = false
    } else {
      this.isPre = true
    }

    if (theme) {
      this.isPre = true
      this.isTheme = true
      this.themeIndex = this.themes.findIndex(item => item.name == theme)
    }
  },
  mounted() {
    this.hideSkin()
  },
  beforeDestroy() {
    localStorage.setItem('preIndex', this.preIndex)
  }
}
</script>

<style lang="less" scoped>
#skin-container {
  width: 400px;
  height: auto;
  z-index: 1001;

  .selected {
    position: relative;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border: 2px #eee solid;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    text-align: center;
    cursor: pointer;
  }
  /deep/ .el-tabs {
    border-radius: 5px;
    .el-tabs__header {
      background-color: darken(#f0ffff, 50%);
      // background-color: lighten(rgb(255, 192, 203), 5%);
      .el-tabs__nav-scroll {
        .el-tabs__item {
          font-weight: bold;
          font-size: 16px;
          font-family: '仿宋';
        }
        .el-tabs__item:hover,
        .is-active {
          color: @primaryColor;
        }
      }
    }

    .themes {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .theme-selected {
        border: @primaryColor 5px solid;
        p {
          font-size: 20px;
        }
      }
      li {
        float: left;
        margin: 5px 10px;
        cursor: pointer;
        width: 80px;
        height: 80px;
        border-radius: 40px;
        background-size: 70px;
        background-repeat: no-repeat;
        text-align: center;
        p {
          display: inline-block;
          width: 100%;
          height: 20px !important;
          height: auto;
          font-size: 16px;
          text-align: center;
          position: relative;
          bottom: -60px;
        }
      }
    }
    .content {
      width: 400px;
      height: 200px !important;
      margin: 0 auto;
      overflow: hidden;
      .pre-define {
        width: 100%;
        height: auto;
        float: left;
        overflow: hidden;
        li {
          float: left;
          width: 40px;
          height: 40px;
          margin: 5px 10px;
          border-radius: 7px;
          cursor: pointer;
          text-align: center;
          line-height: 45px;
        }
      }
      .self-define {
        width: 100%;
        float: left;
        .color-picker {
          margin-left: 8px;
          z-index: 1002;
          .el-color-picker__trigger {
            width: 44px;
            height: 44px;
            .el-icon-arrow-down:before {
              content: '';
            }
          }
        }
        i {
          top: -14px;
          left: -32px;
          z-index: 1002;
        }
      }
    }
  }
}
</style>
