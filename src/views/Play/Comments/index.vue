<template>
  <div id="comments-container">
    <p style="margin-top: 100px" v-loading="loading" v-if="loading"></p>
    <div class="hotComments" v-else>
      <h3 class="title">全部评论({{ comments.total }})</h3>
      <CommentsListVue :comments="comments.hotComments"></CommentsListVue>
    </div>
  </div>
</template>

<script>
import CommentsListVue from './CommentsList'
import bus from '@/EventBus'

export default {
  name: 'CommentsVue',
  data() {
    return {
      loading: true
    }
  },
  props: {
    comments: {
      type: Object
    }
  },
  components: {
    CommentsListVue
  },
  mounted() {
    bus.$off('commentsChange')
    /**评论更新 */
    bus.$on('commentsChange', () => {
      this.loading = true
    })
  },
  watch: {
    /**新评论加载完成后，去除loading */
    comments() {
      this.loading = false
    }
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

  /deep/ .el-loading-spinner {
    .path {
      stroke-width: 4;
      stroke: @primaryColor;
    }
  }
}
</style>
