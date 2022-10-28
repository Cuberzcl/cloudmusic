<template>
  <div class="song-table-container">
    <table class="song-table" border="0">
      <thead>
        <th></th>
        <th class="song-title">音乐标题</th>
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
          <td :data-songId="item.id" :data-index="index" class="index">
            <span v-if="playIndex != index">{{ transformIndex(index + 1) }}</span>
            <span v-else class="el-icon-star-on"></span>
          </td>
          <td :data-songId="item.id" :data-index="index" class="" style="max-width: 800px">
            {{ item.name }}
          </td>
          <td class="" style="min-width: 300px" :data-songId="item.id" :data-index="index">
            <span v-for="(item2, index) in item.ar" :key="item2.id + index">
              <span class="hoverPointer" @click="arRouter">{{ item2.name }}</span
              ><span v-if="index !== item.ar.length - 1" style="font-weight: bolder"> / </span>
            </span>
          </td>
          <td style="min-width: 300px" :data-songId="item.id" :data-index="index">
            <i @click="alRouter" class="hoverPointer">{{ item.al.name }}</i>
          </td>
          <td :data-songId="item.id" :data-index="index" class="time" style="min-width: 100px">
            {{ transformTime(item.dt) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '@/EventBus'

export default {
  name: 'SongTableVue',
  data() {
    return {
      currentIndex: -1,
      playIndex: -1
    }
  },
  props: {
    songsList: {
      type: Array
    }
  },
  methods: {
    sendChosenSong(event) {
      //利用vuex发送与获取歌曲
      let { songid, index } = event.target.dataset
      if (!songid) return

      this.$store.dispatch('getSongUrl', { id: songid })

      this.$store.dispatch('getSongLyrics', { id: songid })
      this.currentIndex = index
      this.playIndex = index

      let item = this.songsList[index]
      let data = { name: item.name, id: item.id, ar: item.ar, al: item.al, dt: item.dt }
      bus.$emit('showSongInfo', data)
      bus.rad = 0 //换歌时唱片旋转为0
    },
    changeIndex(event) {
      let { index } = event.target.dataset
      if (index) {
        this.currentIndex = index
      }
    },
    transformTime(dt) {
      var s = Math.floor(dt / 1000)
      var m = Math.floor(s / 60)
      s %= 60
      s = s < 10 ? '0' + s : s
      m = m < 10 ? '0' + m : m
      return m + ':' + s
    },
    transformIndex(i) {
      return (i < 10 ? '0' : '') + i
    },
    //跳转到歌手页面
    arRouter() {},
    //跳转到专辑页面
    alRouter() {},
    //判断当前播放的歌曲是否在此页面上
    ensurePlayIndex() {
      if (bus.playId) {
        let id = bus.playId
        this.songsList.forEach((item, index) => {
          if (item.id == id) {
            this.playIndex = index
          }
        })
      }
    }
  },
  mounted() {
    this.ensurePlayIndex()
  },
  watch: {
    songsList() {
      this.currentIndex = -1
      this.playIndex = -1
      this.ensurePlayIndex()
    },
    'bus.playId'() {
      this.ensurePlayIndex()
    }
  }
}
</script>

<style lang="less" scoped>
.song-table-container {
  @first-color: #fffffa;
  @second-color: #fffaff;
  @selected-color: #f0ffff;
  @direction: to right;
  // font-weight: bold;;
  background-color: #fff;
  h2 {
    margin-left: 20px;
    margin-bottom: 20px;
    font-family: '楷体';
  }
  a {
    text-decoration: none;
  }
  .hoverPointer:hover {
    cursor: pointer;
    color: hotpink;
  }
  .line-color(@color) {
    background: linear-gradient(
      @direction,
      @tableColor,
      @color 1%,
      darken(@color, 1%) 90%,
      @tableColor 99%
    );
  }

  .song-table {
    margin-top: 20px;
    width: 100%;
    // border-collapse: collapse !important;
    th {
      color: grey;
      padding-left: 20px;
      font-family: '宋体';
    }
    .current {
      .line-color(@selected-color) !important;
      .time {
        border-bottom: 1px solid darken(@selected-color, 10%);
      }
      td:nth-child(n + 2) {
        border-left: 0px solid transparent !important;
      }
    }
    .song-line {
      width: auto;
      height: 40px;
      line-height: 40px;
      .line-color(@second-color);
      .time {
        border-bottom: 1px solid darken(@second-color, 10%);
      }
      td {
        position: relative;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        border: none;
        font-family: '华文粗黑';
        font-size: 14px;
        .el-icon-star-on {
          height: 40px;
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-40%);
          color: #ffddff;
          font-size: 30px;
          transition-property: font-size left top color;
          transition-duration: 0.5s;
          &:hover {
            top: 15px;
            font-size: 40px;
            left: 5px;

            color: @primaryColor;
          }
        }
      }
      td:nth-child(n + 2) {
        border-left: 0px solid transparent;
      }
      .index {
        width: 100px;
      }

      &:hover {
        .current();
      }
    }
    .song-line:nth-child(odd) {
      .line-color(@first-color);
      .time {
        border-bottom: 1px solid darken(@first-color, 10%);
      }
      td:nth-child(n + 2) {
        border-left: 0px solid transparent;
      }
      &:hover {
        .current();
      }
    }
  }
}
</style>
