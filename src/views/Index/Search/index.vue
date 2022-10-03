<template>
  <div class="search-container">
    <!-- <div style="width: 100%; background-color: yellow">123</div> -->
    <transition name="el-fade-in-linear">
      <div v-show="show" class="transition-box">
        <table class="search-table" border="0">
          <thead>
            <th></th>
            <th class="song-title">歌曲标题</th>
            <th class="artist">歌手</th>
            <th class="album">专辑</th>
            <th class="time">时长</th>
          </thead>
          <tbody cellpadding="0" cellspacing="0" @dblclick="sendChosenSong" @click="changeIndex">
            <tr
              v-for="(item, index) in songsList"
              :key="item.id"
              class="song-line"
              :class="{ current: currentIndex == index }"
            >
              <td :data-songInfo="item.id" :data-index="index" class="index">
                <span v-if="playIndex != index">{{ index + 1 }}</span>
                <span v-else class="el-icon-star-on"></span>
              </td>
              <td :data-songInfo="item.id" :data-index="index" class="">
                {{ item.name }}
              </td>
              <td class="">
                <span v-for="(item2, index) in item.ar" :key="item2.id">
                  <a href="javascript:;">{{ item2.name }}</a
                  ><span v-if="index !== item.ar.length - 1" style="font-weight: bolder"> / </span>
                </span>
              </td>
              <td>{{ item.al.name }}</td>
              <td :data-songInfo="item.id" :data-index="index" class="">
                {{ tranformTime(item.dt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import bus from '@/EventBus'

export default {
  name: 'SearchVue',
  data() {
    return {
      show: false,
      currentIndex: -1,
      playIndex: -1
    }
  },
  computed: {
    ...mapState({
      songsList: state => state.search.searchResult.songs,
      audioList: state => state.search.audioList
    })
  },
  methods: {
    sendChosenSong(event) {
      //利用vuex发送与获取歌曲
      let { songinfo, index } = event.target.dataset
      this.$store.dispatch('getSongUrl', { id: songinfo })
      this.currentIndex = index
      this.playIndex = index
    },
    changeIndex(event) {
      let { index } = event.target.dataset
      if (index) {
        this.currentIndex = index
      }
    },
    tranformTime(dt) {
      var s = Math.floor(dt / 1000)
      var m = Math.floor(s / 60)
      s %= 60
      s = s < 10 ? '0' + s : s
      m = m < 10 ? '0' + m : m
      return m + ':' + s
    }
  },
  watch: {
    songsList() {
      this.currentIndex = -1
      this.playIndex = -1
    }
  },
  created() {
    setTimeout(() => {
      this.show = true
    }, 100)
  }
}
</script>

<style lang="less" scoped>
.search-container {
  flex: auto;
  overflow: auto;

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
  .search-table {
    margin-top: 20px;
    width: 100%;
    // border-collapse: collapse !important;
    th {
      color: grey;
      padding-left: 20px;
      font-family: '宋体';
    }
    .current {
      background-color: #f0ffff !important;
      td:nth-child(n + 2) {
        border-left: 2px solid #f0ffff !important;
      }
    }
    .song-line {
      height: 60px;
      line-height: 60px;
      td {
        position: relative;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        border: none;
        font-family: '华文宋体';
        font-size: 16px;
        .el-icon-star-on {
          height: 40px;
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-40%);
          color: #ffddff;
          font-size: 30px;
          transition-property: font-size, left, top;
          transition-duration: 0.5s;
          &:hover {
            top: 25px;
            font-size: 40px;
            left: 5px;
          }
        }
      }
      td:nth-child(n + 2) {
        border-left: 2px solid white;
      }
      .index {
        width: 100px;
      }

      &:hover {
        .current();
      }
    }
    .song-line:nth-child(odd) {
      background-color: ivory;
      td:nth-child(n + 2) {
        border-left: 2px solid ivory;
      }
      &:hover {
        .current();
      }
    }
  }
}
</style>
