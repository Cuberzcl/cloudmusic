<template>
  <div id="comments-container">
    <div class="hotComments">
      <h3 class="title">全部评论({{ comments.total }})</h3>
      <CommentsListVue :comments="comments.hotComments"></CommentsListVue>
    </div>
  </div>
</template>

<script>
import CommentsListVue from './CommentsList'
export default {
  name: 'CommentsVue',
  props: {
    comments: {
      type: Object
    }
  },
  components: {
    CommentsListVue
  }
}
</script>

<style lang="less" scoped>
#comments-container {
  margin-top: 50px;
  height: auto;
  width: 800px;
  .title {
    font-weight: bold;
    margin-bottom: 20px;
    font-family: '黑体';
  }
}
</style>
