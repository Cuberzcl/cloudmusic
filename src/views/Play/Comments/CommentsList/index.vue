<template>
  <div id="comments-list-container">
    <ul>
      <li class="comment" v-for="item in comments" :key="item.commentId">
        <img class="user-img" :src="item.user.avatarUrl" alt="" />
        <div class="user-comment">
          <div class="content">
            <span class="user-name">{{ item.user.nickname }}</span>
            <i style="font-weight: bolder"> : </i> {{ item.content }}
          </div>
          <div class="date">
            {{ item.timeStr.split('-')[0] }}年{{ item.timeStr.split('-')[1] }}月{{
              item.timeStr.split('-')[2]
            }}日&nbsp;&nbsp;{{ new Date(item.time).getHours() }}:{{
              new Date(item.time).getHours()
            }}
          </div>
        </div>
        <el-divider class="divide-line"></el-divider>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'commentsListVue',
  props: { comments: { type: Array } }
}
</script>

<style lang="less" scoped>
#comments-list-container {
  /deep/ .comment {
    height: auto;
    width: 100%;
    .user-img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      vertical-align: top;
    }
    .user-comment {
      font-family: '华文粗黑';
      display: inline-block;
      height: auto;
      width: 700px;
      margin-left: 10px;
      padding: 0;
      font-size: 17px;
      .user-name {
        font-size: 18px;
        text-decoration: none;
        font-weight: 500;
        width: 100px;
        height: 20px;
        cursor: pointer;
        color: @primaryColor;
        &:hover {
          color: @primaryColorDarken;
        }
      }
      .date {
        position: relative;
        top: 10px;
        font-size: 15px;
        color: grey;
      }
    }
    .divide-line {
      background-color: @primaryColor;
    }
  }
}
</style>
