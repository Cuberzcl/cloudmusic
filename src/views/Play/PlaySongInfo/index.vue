<template>
  <div class="playSongInfo-container">
    <h1 class="songName">{{ songData.name }}</h1>
    <p class="arName">
      <span v-for="(item, index) in songData.ar" :key="item.id">
        <span class="hoverPointer">{{ item.name }}</span
        ><span v-if="index !== songData.ar.length - 1" style="font-weight: bolder"> / </span>
      </span>
    </p>
    <em> - </em>
    <p class="alName hoverPointer">{{ songData.al.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'playSongInfoVue',
  props: {
    songData: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.playSongInfo-container {
  text-align: center;
  h1 {
    text-align: center;
  }
  p {
    display: inline-block;
    color: #aabbcc;
  }
  em {
    color: #aabbcc;
  }
  .hoverPointer:hover {
    cursor: pointer;
    color: blueviolet;
  }
}
</style>
