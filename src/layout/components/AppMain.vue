<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <div class="bottomCopyright" :class="{'mini':!this.sidebar.opened,'mobile':this.device == 'mobile'}">技术支持：北京盛元广通科技有限公司 Copyright©2016-2021</div>
  </section>
</template>

<script>
  import {mapState} from "vuex";
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    })
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 84px);
        min-height: calc(100vh - 100px);
        background: #F5F5F5;
  }

  .fixed-header+.app-main {
    padding-top: 90px;
  }
}
.app-container {
  padding-bottom: 46px;
}
.bottomCopyright {
  height: 36px;line-height: 36px;background-color: #fff;font-size: 12px;text-align: center;
  position: fixed;bottom: 0;right: 0;
  color: #606266;
  z-index: 10;
  transition: left 0.25s;
  width: -moz-calc(100% - 230px);
  width: -webkit-calc(100% - 230px);
  width: calc(100% - 230px);
  &.mini {
    width: -moz-calc(100% - 54px);
    width: -webkit-calc(100% - 54px);
    width: calc(100% - 54px);
  }
  &.mobile {
    width: 100%;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
