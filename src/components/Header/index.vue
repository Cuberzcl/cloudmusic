<template>
  <!-- 1 -->
  <div id="header-container">
    <div id="logo">
      <a href="#/index"></a>
    </div>
    <div id="search-input" @keyup.enter="sendSearchInput">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        size="mini"
      >
      </el-input>
    </div>
    <div id="function-area">
      <div id="user" @mouseleave="dropdown = false">
        <div class="user-img" @mouseenter="dropdown = false">
          <el-avatar :src="userImgUrl"></el-avatar>
        </div>
        <div id="dropdown" class="dropdown" placement="top">
          <span class="dropdown-link el-icon-arrow-down" @mouseenter="dropdown = true">
            {{ username }}
          </span>
        </div>
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
      </div>
      <div class="menu-demo">
        <ul>
          <li class="el-icon-brush menu-item"></li>
          <li class="el-icon-message menu-item"></li>
          <li class="el-icon-setting menu-item"></li>
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
      userImgUrl: require('@/assets/03b0d39583f48206768a7534e55bcpng.png'),
      username: '1111',
      dropdown: false
    }
  },
  methods: {
    sendSearchInput() {
      bus.$emit('toSearch', this.searchInput)
      this.$router.push({ name: 'search' })
      this.$store.dispatch('getSearchRes', { searchInput: this.searchInput })
    }
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
    /deep/.el-icon-search:before {
      align-self: center;
      font-size: 14px;
      color: white !important;
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
      left: 0;
      width: 300px;
      height: 465px;
      // background-color: pink;
      .user-img {
        left: 80px;
        display: inline-block;
        position: absolute;
        top: 30px;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
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
        }
      }
      .my-dropdown-menu {
        position: absolute;
        // left: -80px;
        top: 65px;
        // transform: translateY(100%);
        width: 300px;
        height: 400px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;

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
