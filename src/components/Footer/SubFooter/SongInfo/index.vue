<template>
  <div class="song-info-container">
    <div class="alPic">
      <img :src="songData.al.picUrl" alt="" v-if="picShow" />
      <div class="mask" @click="changeRouter()">
        <i class="el-icon-arrow-up" v-if="this.$route.path != '/play'"></i>
        <i class="el-icon-arrow-down" v-else></i>
      </div>
    </div>
    <div class="tran-area">
      <transition name="songInfo">
        <div class="songInfo" v-show="this.$route.path != '/play'">
          <p class="songName" @click="changeRouter()">
            {{ songData.name }}
          </p>
          <div class="little-like">
            <span
              @click="like"
              title="喜欢"
              class="like glyphicon glyphicon-heart-empty"
              v-if="!liked"
            ></span>
            <span
              @click="unlike"
              title="取消喜欢"
              class="unlike glyphicon glyphicon-heart"
              v-else
            ></span>
          </div>
          <p class="arName">
            <span v-for="(item, index) in songData.ar" :key="item.id">
              <span class="hoverPointer">{{ item.name }}</span
              ><span v-if="index !== songData.ar.length - 1" style="font-weight: bolder"> / </span>
            </span>
          </p>
        </div>
      </transition>
      <transition name="songOperate">
        <div class="songOperate" v-show="this.$route.path == '/play'">
          <ul>
            <li
              @click="like"
              title="喜欢"
              class="like glyphicon glyphicon-heart-empty"
              v-if="!liked"
            ></li>
            <li @click="unlike" title="取消喜欢" class="like glyphicon glyphicon-heart" v-else></li>
            <li
              @click="collected = !collected"
              title="收藏"
              class="collect glyphicon glyphicon-star-empty"
              v-if="!collected"
            ></li>
            <li
              @click="collected = !collected"
              title="取消收藏"
              class="collect glyphicon glyphicon-star"
              v-else
            ></li>
            <li
              @click="downloaded = !downloaded"
              title="下载"
              class="download glyphicon glyphicon-save"
              v-if="!downloaded"
            ></li>
            <li title="已下载" class="download glyphicon glyphicon-saved" v-else></li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import bus from '@/EventBus'
export default {
  name: 'SongInfoVue',
  data() {
    return {
      songData: {},
      picShow: false,
      liked: false,
      collected: false,
      downloaded: false,
      likesId: [0],
      likes: []
    }
  },
  created() {
    bus.$off('showSongInfo')
    bus.$on('showSongInfo', data => {
      this.songData = data
      this.picShow = true

      if (this.likesId.indexOf(data.id) !== -1) {
        this.liked = true
      } else {
        this.liked = false
      }
      localStorage.setItem('songData', JSON.stringify(data))

      //记录播放歌曲的id，以判断正在播放哪首歌
      bus.playId = this.songData.id
    })

    let songData = localStorage.getItem('songData')
    if (songData) {
      this.songData = JSON.parse(songData)
      this.picShow = true
      this.$store.dispatch('getSongLyrics', { id: this.songData.id })
      bus.playId = this.songData.id
    }

    let likesId = JSON.parse(localStorage.getItem('likesId'))
    let likes = JSON.parse(localStorage.getItem('likes'))
    if (likesId) {
      this.likesId = likesId
      if (likesId.indexOf(this.songData.id) !== -1) {
        this.liked = true
      } else {
        this.liked = false
      }
    }
    if (likes) {
      this.likes = likes
    }
  },
  methods: {
    changeRouter() {
      if (this.$route.path != '/play') {
        this.$router.push('/play')
        this.$nextTick(() => {
          bus.$emit('songInfo', this.songData)
        })
      } else {
        bus.$emit('stopPlayRotate')
        bus.$emit('goPrev')
        setTimeout(() => {
          this.$router.go(-1)
        }, 300)
      }
    },
    like() {
      this.liked = !this.liked
      this.likesId[this.likesId.length] = this.songData.id
      localStorage.setItem('likesId', JSON.stringify(this.likesId))

      this.likes[this.likes.length] = this.songData
      localStorage.setItem('likes', JSON.stringify(this.likes))
      bus.$emit('updateLikes')
    },
    unlike() {
      this.liked = !this.liked

      this.likesId = this.likesId.filter(item => item != this.songData.id)
      localStorage.setItem('likesId', JSON.stringify(this.likesId))

      this.likes = this.likes.filter(item => item.id != this.songData.id)
      localStorage.setItem('likes', JSON.stringify(this.likes))
      bus.$emit('updateLikes')
    }
  }
}
</script>

<style lang="less" scoped>
.song-info-container {
  width: 100%;
  display: flex;
  float: left;
  position: relative;
  overflow: hidden;
  .alPic {
    float: left;
    margin-top: 8px;
    margin-left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    overflow: hidden;
    &:hover {
      cursor: pointer;
      .mask {
        display: block;
      }
    }
    img {
      width: 50px;
      height: 50px;
    }
    .mask {
      position: relative;
      top: -50px;
      display: none;
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.49);
      text-align: center;
      line-height: 50px;
      i {
        color: #fff;
        font-size: 20px;
      }
    }
  }
  .tran-area {
    float: left;
    position: relative;
    width: 100%;
    overflow: hidden;
    .songInfo {
      display: inline-block;
      position: absolute;
      top: 10px;
      left: 20px;
      .songName {
        display: inline-block;
        margin-bottom: 2px;
        font-size: 18px;
        font-weight: 700;
        font-family: '黑体';
        &:hover {
          cursor: pointer;
        }
      }

      .little-like {
        margin-left: 5px;
        display: inline-block;
        font-size: 18px;
        font-family: '华文细黑';
        .like {
          color: #d0fff0;
        }
        .unlike {
          color: red;
        }
      }
      .hoverPointer:hover {
        cursor: pointer;
        color: hotpink;
      }

      a {
        text-decoration: none;
        color: black;
      }
    }
    .songOperate {
      display: block;
      margin-top: 20px;
      margin-left: 15px;
      margin-bottom: 20px;
      li {
        display: inline-block;
        text-align: center;
        margin: 0 10px;
        padding: 0 7px;
        font-size: 30px;
        &:hover {
          cursor: pointer;
        }
      }
      .like {
        background-image: -webkit-gradient(linear, left 50, right 0, from(red), to(yellow));
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .collect {
        background-image: -webkit-gradient(linear, left 50, right 0, from(yellow), to(green));
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .download {
        position: relative;
        top: -2px;
        font-size: 28px;
        background-image: -webkit-gradient(linear, left 0, right 50, from(blue), to(red));
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .songInfo-enter {
      margin-top: 100px;
      height: 0;
    }
    .songInfo-enter-to {
      margin-top: 10px;
      height: 100%;
    }
    .songInfo-enter-active {
      transition: all 0.3s linear;
    }
    .songInfo-leave {
      margin-top: 10px;
      height: 100%;
    }
    .songInfo-leave-to {
      margin-top: 100px;
      height: 0;
    }
    .songInfo-leave-active {
      transition: all 0.3s linear;
    }
    .songOperate-enter {
      margin-top: -100px;
      height: 0;
    }
    .songOperate-enter-to {
      margin-top: 20px;
      height: 100%;
    }
    .songOperate-enter-active {
      transition: all 0.3s linear;
    }
    .songOperate-leave {
      margin-top: 20px;
      height: 100%;
    }
    .songOperate-leave-to {
      margin-top: -100px;
      height: 0;
    }
    .songOperate-leave-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
