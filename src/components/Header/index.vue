<template>
  <!-- 1 -->
  <div
    id="header-container"
    :style="{ '--WP': Global.widthProportion, '--HP': Global.heightProportion }"
  >
    <div id="logo">
      <a href="#/index"></a>
    </div>
    <div id="search-input" @keyup.enter="sendSearchInput">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        size="mini"
        @focus="searchDropdown = true"
        @blur="searchDropdown = false"
      >
      </el-input>
    </div>
    <transition name="search-dropdown-menu">
      <div id="search-dropdown-menu" class="search-dropdown-menu" v-if="!searchDropdown">
        <div class="blank" v-if="searchInput == ''">
          <div class="history">
            <p class="top">
              <span class="title">搜索历史<span class="icon el-icon-delete"> </span></span>
              <span class="all" v-if="false">查看全部</span>
            </p>
          </div>
        </div>
        <div class="searchSuggest" v-else>2</div>
      </div>
    </transition>
    <div id="function-area">
      <div id="user">
        <div class="user-img">
          <el-avatar :src="userImgUrl"></el-avatar>
        </div>
        <div id="dropdown" class="dropdown" placement="top">
          <span class="dropdown-link el-icon-arrow-down" @click="dropdown = !dropdown">
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
          <li class="el-icon-brush menu-item" title="主题"></li>
          <li class="el-icon-message menu-item" title="消息"></li>
          <li class="el-icon-setting menu-item" title="设置"></li>
          <li class="el-icon-document menu-item" title="日志"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/EventBus'

export default {
  name: 'HeaderVue',
  data() {
    return {
      searchInput: '',
      userImgUrl: require('@/assets/白花.png'),
      username: '1111',
      dropdown: false,
      searchDropdown: false, //搜索下拉框
      history: new Set()
    }
  },

  methods: {
    sendSearchInput() {
      if (this.history.has(this.searchInput)) {
        this.history.delete(this.searchInput)
      }
      this.history.add(this.searchInput)
      localStorage.setItem('history', JSON.stringify(Array.from(this.history)))

      bus.$emit('toSearch', this.searchInput)
      this.$router.push({
        name: 'search',
        params: { keyword: this.searchInput || undefined },
        query: { k: this.searchInput || undefined }
      })
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
      }
    },
    //获取历史记录
    getHistory() {
      let historyStr = localStorage.getItem('history')
      if (historyStr != '') this.history = new Set(JSON.parse(historyStr))
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

    //移除与添加 click 事件，用于收起下拉栏
    document.removeEventListener('click', this.dropdownToFalse)
    document.addEventListener('click', this.dropdownToFalse)
  }
}
</script>

<style lang="less" scoped>
#header-container {
  @WP: var(--WP);
  @HP: var(--HP);
  @themeColor: #ec4141;

  position: relative;
  padding: 0 40px;
  display: flex;
  order: 1;
  height: 60px;
  line-height: 60px;
  background-color: #ec4141;

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
      background-color: rgba(230, 0, 38, 0.5);
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

          .title {
            float: left;
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
          }
        }
      }
    }
  }

  .search-dropdown-menu-enter {
    height: 0;
  }
  .search-dropdown-menu-enter-to {
    height: 750px;
  }

  .search-dropdown-menu-enter-active {
    transition: all 0.3s linear;
  }
  .search-dropdown-menu-leave {
    height: 750px;
  }
  .search-dropdown-menu-leave-to {
    height: 0;
  }

  .search-dropdown-menu-leave-active {
    transition: all 0.3s linear;
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
    }

    .my-dropdown-menu-enter {
      height: 0;
    }
    .my-dropdown-menu-enter-to {
      height: 400px;
    }

    .my-dropdown-menu-enter-active {
      transition: all 0.3s linear;
    }
    .my-dropdown-menu-leave {
      height: 400px;
    }
    .my-dropdown-menu-leave-to {
      height: 0;
    }

    .my-dropdown-menu-leave-active {
      transition: all 0.3s linear;
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
        color: #ec4141 !important;
        background-color: #fff;
      }
    }
  }
}
</style>
