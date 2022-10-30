<template>
  <div id="header-container" :style="{}">
    <div id="logo">
      <a href="#/index"></a>
    </div>
    <div id="search-input" @keyup.enter="sendSearchInput">
      <el-input
        :data-nothide="1"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        size="mini"
        @focus="inputFocus"
        @input="getSearchSuggest"
        ref="input"
      >
      </el-input>
    </div>
    <transition name="search-dropdown-menu">
      <div
        :data-nothide="1"
        id="search-dropdown-menu"
        class="search-dropdown-menu"
        v-if="searchDropdown"
      >
        <div class="blank" v-if="searchInput == ''">
          <div class="history" :key="historyKey" v-if="history.size != 0">
            <p class="top">
              <span class="title"
                >搜索历史<span class="icon el-icon-delete" @click="clearHistory"> </span
              ></span>
              <span
                :data-nothide="1"
                class="all"
                v-if="all"
                @click="
                  showAll = true
                  all = false
                "
                >查看全部</span
              >
            </p>
            <div
              class="pieces"
              @mouseover="changeHistoryIndex"
              @mouseout="renewHistoryIndex"
              @click="operateHistory"
              :class="{ 'show-all': showAll }"
            >
              <span
                :data-val="item"
                :data-index="index"
                class="piece"
                v-for="(item, index) in Array.from(history).reverse()"
                :key="index"
              >
                {{ item }}
                <i
                  :data-nothide="1"
                  :data-del_val="item"
                  :data-index="index"
                  class="el-icon-close"
                  v-show="index == historyIndex"
                ></i>
              </span>
            </div>
          </div>
        </div>
        <div class="search-suggest" v-if="searchInput != '' && searchSuggest">
          <div class="song" v-if="searchSuggest.songs">
            <p class="title"><i class="glyphicon glyphicon-music"></i><span> 单曲</span></p>
            <ul>
              <li v-for="item in searchSuggest.songs" :key="item.id">
                <p>
                  <span v-html="highlightKeyword(item.name)"></span>&nbsp;&nbsp;-
                  <span
                    v-for="ar in item.artists"
                    :key="ar.id"
                    v-html="highlightKeyword(ar.name) + ' '"
                  ></span>
                </p>
              </li>
            </ul>
          </div>
          <div class="artist" v-if="searchSuggest.artists">
            <p class="title"><i class="glyphicon glyphicon-user"></i><span> 歌手</span></p>
            <ul>
              <li v-for="item in searchSuggest.artists" :key="item.id">
                <p>
                  <span v-html="highlightKeyword(item.name)"></span>
                </p>
              </li>
            </ul>
          </div>
          <div class="album" v-if="searchSuggest.albums">
            <p class="title"><i class="glyphicon glyphicon-cd"></i><span> 专辑</span></p>
            <ul>
              <li v-for="item in searchSuggest.albums" :key="item.id">
                <p>
                  <span v-html="highlightKeyword(item.name)"></span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <div id="function-area">
      <div id="user">
        <div class="user-img">
          <el-avatar :src="userImgUrl"></el-avatar>
        </div>
        <div id="dropdown" class="dropdown" placement="top">
          <span class="dropdown-link el-icon-arrow-down" @click="dropdownLinkClick">
            {{ username }}
          </span>
        </div>
      </div>
      <transition name="my-dropdown-menu">
        <div id="dropdown-menu" class="my-dropdown-menu" v-if="dropdown">
          <div class="menu-top">
            <span>动态</span><span>关注</span><span>粉丝</span>
            <div>签到</div>
          </div>
          <p class="line"></p>
          <div class="menu-bottom">
            <ul>
              <li class="line-li">
                <ul>
                  <li>
                    <h5>会员中心</h5>
                  </li>
                  <li>
                    <h5>等级</h5>
                  </li>
                  <li>
                    <h5>商城</h5>
                  </li>
                </ul>
              </li>
              <p class="line"></p>
              <li class="line-li">
                <ul>
                  <li>
                    <h5>个人信息设置</h5>
                  </li>
                  <li>
                    <h5>绑定社交账号</h5>
                  </li>
                </ul>
              </li>
              <p class="line"></p>
              <li class="line-li">
                <ul>
                  <li><h5>我的客服</h5></li>
                </ul>
              </li>
              <p class="line"></p>
              <li class="line-li">
                <ul>
                  <li><h5>退出登录</h5></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="menu-demo">
        <ul>
          <li class="el-icon-brush menu-item" title="皮肤" @click="skinItemClick"></li>
          <li class="el-icon-message menu-item" title="消息"></li>
          <li class="el-icon-setting menu-item" title="设置"></li>
          <li class="el-icon-document menu-item" title="日志"></li>
        </ul>
      </div>
      <transition name="skin">
        <SkinVue class="skin" v-if="skin" @hide="skin = false"></SkinVue>
      </transition>
    </div>
  </div>
</template>

<script>
import bus from '@/EventBus'
import SkinVue from '@/components/Header/Skin'
import _ from 'lodash'
import { get_search_suggest } from '@/api'

export default {
  name: 'HeaderVue',
  data() {
    return {
      searchInput: '',
      searchSuggest: {},
      userImgUrl: require('@/assets/白花.png'),
      username: '1111',
      dropdown: false,
      searchDropdown: false, //搜索下拉框
      all: false, //展示全部按钮
      showAll: false, //是否展示全部
      history: new Set(), //搜索记录
      historyKey: 1, //刷新
      historyIndex: -1, //锁定选择的记录的序号
      skin: false //皮肤组件是否出现
    }
  },
  components: { SkinVue },
  methods: {
    sendSearchInput() {
      this.searchDropdown = false
      this.$refs.input.blur()

      //整理顺序，保存搜索记录
      if (this.history.has(this.searchInput)) {
        this.history.delete(this.searchInput)
      }
      this.history.add(this.searchInput)
      localStorage.setItem('history', JSON.stringify(Array.from(this.history)))

      bus.$emit('toSearch', this.searchInput)
      this.$router.push({
        name: 'song',
        params: { keyword: this.searchInput || undefined },
        query: { k: this.searchInput || undefined }
      })
      bus.searchInput = this.searchInput
    },
    //点击 dropdown-link
    dropdownLinkClick() {
      if (this.dropdown == false) {
        //添加 click 事件，用于收起下拉栏
        this.dropdown = true
        document.addEventListener('click', this.dropdownToFalse)
      } else {
        this.dropdown = false

        document.removeEventListener('click', this.dropdownToFalse)
      }
    },
    //鼠标点击事件，用于收起下拉栏
    dropdownToFalse(e) {
      let dropdownLink = document.querySelector('.dropdown-link')
      let dropdownMenu = document.querySelector('#dropdown-menu')
      if (
        !(
          e.target == dropdownLink ||
          e.target == dropdownMenu ||
          e.target.offsetParent == dropdownMenu
        )
      ) {
        this.dropdown = false

        document.removeEventListener('click', this.dropdownToFalse)
      }
    },
    //搜索框获取焦点时
    inputFocus() {
      //重置查看全部
      if (this.showAll) {
        this.all = false
        this.showAll = false
      }

      this.searchDropdown = true
      this.hideSearchDropdown()
      if (this.searchInput == '' && !this.showAll) this.piecesOverflow()
    },
    //判断历史记录是否溢出
    piecesOverflow() {
      this.$nextTick(() => {
        if (this.history.size !== 0) {
          let pieces = document.querySelector('.pieces')
          let lastPiece = pieces.children[pieces.childElementCount - 1]
          let style = window.getComputedStyle(lastPiece, null)
          if (
            lastPiece.offsetTop <
            pieces.offsetTop + 2 * lastPiece.clientHeight + 4 * parseInt(style.marginTop)
          ) {
            //重置 查看全部
            this.all = false
            this.showAll = false
            this.historyKey = 1 - this.historyKey
          } else {
            this.all = true
          }
        }
      })
    },
    //获取搜索建议
    getSearchSuggest: _.debounce(
      async function () {
        if (this.searchInput == '') return
        let { data: res } = await get_search_suggest({ keywords: this.searchInput })
        if (res.code === 200) {
          this.searchSuggest = res.result
        } else {
          console.log('err')
        }
      },
      500,
      { trailing: true }
    ),
    //高亮搜索建议中的关键字
    highlightKeyword(s) {
      let res = new RegExp(this.searchInput, 'i')
      let newS = s.replace(res, '<span class="keywords">' + this.searchInput + '</span>')
      return newS
    },
    //隐藏搜索下拉栏
    hideSearchDropdown() {
      let notHide = e => {
        let { nothide } = e.target.dataset
        let searchDropdownMenu = document.querySelector('#search-dropdown-menu')
        if (!(nothide || e.target.offsetParent == searchDropdownMenu)) {
          this.searchDropdown = false
          this.showAll = false
          document.removeEventListener('click', notHide)
        }
      }
      document.removeEventListener('click', notHide)
      document.addEventListener('click', notHide)
    },
    //获取历史记录
    getHistory() {
      let historyStr = localStorage.getItem('history')
      if (historyStr != '') this.history = new Set(JSON.parse(historyStr))
    },
    //改变  historyIndex
    changeHistoryIndex(e) {
      let { index } = e.target.dataset
      if (index) {
        this.historyIndex = index
      }
    },
    //鼠标离开时，还原 historyIndex
    renewHistoryIndex(e) {
      let { val } = e.target.dataset
      if (val) {
        this.historyIndex = -1
      }
    },
    //搜索或删除历史
    operateHistory(e) {
      let { val, del_val } = e.target.dataset
      if (val) {
        this.historyIndex = -1
        this.searchInput = val
        bus.searchInput = val
        this.sendSearchInput()
        this.getSearchSuggest()
      } else if (del_val) {
        this.history.delete(del_val)
        localStorage.setItem('history', JSON.stringify(Array.from(this.history)))
        this.historyKey = 1 - this.historyKey
        this.piecesOverflow()
      }
    },
    //清空历史记录
    clearHistory() {
      this.history.clear()
      // this.historyKey = 1 - this.historyKey
      localStorage.setItem('history', JSON.stringify(Array.from(this.history)))
    },
    //点击 skin按钮
    skinItemClick() {
      if (this.skin == false) this.skin = true
      // this.skin = !this.skin
    }
  },
  created() {
    this.getHistory()
  },
  mounted() {
    let searchIcon = document.querySelector('.el-icon-search')
    searchIcon.setAttribute('title', '搜索')
    //添加搜索点击事件
    searchIcon.addEventListener('click', () => {
      this.sendSearchInput()
    })

    let header = document.querySelector('#header-container')
    //禁止复制
    header.onselectstart = () => false
  }
}
</script>

<style lang="less" scoped>
#header-container {
  position: relative;
  padding: 0 40px;
  display: flex;
  order: 1;
  height: 60px;
  line-height: 60px;
  background-color: @primaryColor;
  // background-color: #ec4141;

  #logo {
    float: left;
    align-self: center;
    width: 170px;
    height: 40px;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: url('@/assets/topbar.png');
      background-position-y: -15px;
    }
  }

  #search-input {
    display: flex;
    float: left;
    align-self: center;
    margin-left: 20px;
    /deep/ .el-input__inner {
      align-self: center;
      padding-left: 35px;
      width: 250px;
      height: 32px;
      line-height: 16px;
      border-radius: 16px !important;
      border: 0 !important;
      background-color: @primaryColor;
      font-size: 13px;
      font-weight: 600;
      color: white !important;
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
        font-weight: 500;
      }
    }
    /deep/.el-icon-search {
      pointer-events: none;
      &:before {
        align-self: center;
        font-size: 14px;
        color: white !important;
        // 启动点击事件
        pointer-events: auto;
        cursor: pointer;
      }
    }
  }
  .search-dropdown-menu {
    position: absolute;
    top: 65px;
    left: 120px;
    width: 400px;
    height: 750px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    z-index: 9999;
    overflow: hidden;
    text-align: center;
    .blank {
      .history {
        margin: 0 auto;
        width: 350px;
        height: auto;
        .top {
          width: 350px;
          height: 40px;
          float: left;

          .title {
            float: left;
            height: 40px;
            color: #aaa;
            .icon {
              margin-left: 5px;
              font-size: 16px;
              &:hover {
                color: #555;
              }
            }
          }
          .all {
            float: right;
            color: #aaa;
            font-size: 12px;
            cursor: pointer;
          }
        }
        .show-all {
          height: auto !important;
          // overflow: visible !important;
        }
        .pieces {
          display: inline-block;
          margin-top: 10px;
          width: 350px;
          height: 70px;
          overflow: hidden;
          .piece {
            @height: 25px;
            position: relative;
            display: block;
            float: left;
            width: auto;
            height: @height;
            line-height: calc(@height - 2px);
            font-size: 14px;
            margin: 5px;
            padding: 0 15px;
            font-family: '华文粗黑';
            border: #ddd 1px solid;
            border-radius: calc(@height / 2);
            cursor: pointer;
            i {
              position: absolute;
              top: 5px;
              color: #777;
            }

            &:hover {
              background-color: #eee;
              color: #777;
            }
          }
        }
      }
    }

    .search-suggest {
      width: 400px;
      .title {
        margin: 0 auto;
        overflow: hidden;
        width: 300px;
        height: 45px;
        line-height: 45px;
        text-align: left;
        font-size: 18px;
        color: @primaryColor;
        font-family: @primaryFontFamily;
        span {
          cursor: pointer;
          transition-property: color font-size;
          transition-duration: 0.3s;
          &:hover {
            font-size: 20px;
            color: @tableColor;
          }
        }
        i {
          height: 45px;
          line-height: 45px;
          position: relative;
          top: 3.5px;
        }
      }
      /deep/ li {
        width: 400px;
        height: 45px;
        line-height: 45px;
        margin: 0 auto;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          background-color: @primaryColorDarken;
          .keywords {
            color: #fff;
          }
        }
        p {
          width: 300px;
          height: 45px;
          line-height: 45px;
          text-align: left;
          margin: 0 auto;
          font-size: 15px;
          /* 默认值为normal  自动换行 */
          white-space: nowrap;

          /* 2.超出部分隐藏 */
          overflow: hidden;

          /* 3.文字用省略号代替超出的部分 */
          text-overflow: ellipsis;
          .keywords {
            color: @primaryColorDarken;
          }
        }
      }
    }
    &-enter {
      height: 0;
    }
    &-enter-to {
      height: 750px;
    }

    &-enter-active {
      transition: all 0.3s linear;
    }
    &-leave {
      height: 750px;
    }
    &-leave-to {
      height: 0;
    }

    &-leave-active {
      transition: all 0.3s linear;
    }
  }

  #function-area {
    display: inline-block;
    width: 700px;
    height: 60px;
    position: absolute;
    right: 100px;

    #user {
      position: absolute;
      display: inline-block;
      left: -50px;
      width: 400px;
      height: 60px;
      z-index: 1000;
      // background-color:
      .user-img {
        left: 80px;
        display: inline-block;
        position: absolute;
        top: 30px;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        cursor: pointer;
        /deep/ img {
          position: relative;
          left: -20px;
        }
      }
      .dropdown {
        position: absolute;
        top: 30px;
        transform: translateY(-50%);
        left: 130px;
        // height: 70px;
        // line-height: 70px;
        .dropdown-link {
          display: inline-block;
          width: 100px;
          color: white;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .my-dropdown-menu {
      position: absolute;
      // left: -80px;
      top: 65px;
      // transform: translateY(100%);
      width: 300px;
      height: 400px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      z-index: 999;
      overflow: hidden;

      .menu-top {
        margin: 0 20px;
      }
      .line {
        margin: 0 10px;
        border: #eeeeee 0.5px solid;
      }
      .line-li {
        li {
          height: 38px;
          line-height: 38px;
          cursor: pointer;
          h5 {
            margin: 0 20px;
            display: inline-block;
            height: 38px;
            line-height: 38px;
            font-size: 16px;
          }
          &:hover {
            background-color: rgb(240, 241, 242);
          }
        }
      }

      &-enter {
        height: 0;
      }
      &-enter-to {
        height: 400px;
      }

      &-enter-active {
        transition: all 0.3s linear;
      }
      &-leave {
        height: 400px;
      }
      &-leave-to {
        height: 0;
      }

      &-leave-active {
        transition: all 0.3s linear;
      }
    }

    .menu-demo {
      margin-top: -1px;
      float: right;
      height: 62px;
      text-align: center;
      .menu-item {
        width: 80px;
        height: 62px;
        line-height: 62px;
        text-align: center;
        color: white;
        font-size: 25px;
        cursor: pointer;
      }
      .menu-item:hover {
        color: @primaryColor!important;
        background-color: #fff;
      }
    }
    .skin {
      position: relative;
      top: 70px;
      left: 220px;
      &-enter {
        opacity: 0;
      }
      &-enter-to {
        opacity: 1;
      }
      &-enter-active {
        transition: all 0.3s linear;
      }
      &-leave {
        opacity: 1;
      }
      &-leave-to {
        opacity: 0;
      }
      &-leave-active {
        transition: all 0.3s linear;
      }
    }
  }
}
</style>
