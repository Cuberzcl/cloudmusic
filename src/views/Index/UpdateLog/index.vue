<template>
  <div id="update-log-container">
    <h1>更新日志</h1>
    <el-collapse v-model="activeName" accordion
      ><el-collapse-item class="log" v-for="(item, index) in myLog" :key="index" :name="index">
        <template slot="title">
          <h3>{{ item.date }}</h3>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <h2>{{ item.title }}</h2>
        </template>
        <ul class="news" v-if="item.news[0]">
          <h3 style="color: aquamarine">更新功能</h3>
          <li v-for="(item1, index1) in item.news" :key="index1">
            <h4>{{ item1 }}</h4>
          </li>
        </ul>
        <ul class="bugs" v-if="item.bugs[0]">
          <h3 style="color: aqua">修复漏洞</h3>
          <li v-for="(item1, index1) in item.bugs" :key="index1">
            <h4>{{ item1 }}</h4>
          </li>
        </ul>
      </el-collapse-item></el-collapse
    >
  </div>
</template>

<script>
import logs from './log.json'

export default {
  name: 'UpdateVue',
  data() {
    return {
      myLog: logs
    }
  }
}
</script>

<style lang="less" scoped>
#update-log-container {
  h1 {
    margin-left: 100px;
    font-family: @primaryFontFamily;
  }
  /deep/ .log {
    vertical-align: top;
    width: auto;
    margin: 10px 20px;
    padding: 20px 20px;
    border: 2px @primaryColor dotted;
    border-radius: 20px;
    font-family: '华文中宋';
    .el-collapse-item__header {
      font-weight: bold;
      font-size: 20px;
    }
    ul {
      margin-left: 50px;
      font-family: '华文行楷';
      li {
        list-style: disc;
        font-family: '华文粗黑';
      }
    }
  }
}
</style>
