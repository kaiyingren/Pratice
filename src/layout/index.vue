<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    <!-- 主要区域 -->
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <!-- 是否固定头部 -->
      <div :class="{'fixed-header': fixedHeader}">
        <!-- 导航栏 -->
        <navbar />
        <!-- 根据设置确定是否显示tag -->
        <tags-view v-if="needTagsView"/>
      </div>
      <!-- 内容显示区域 -->
      <app-main/>
      <!-- 设置面板 -->
      <right-panel v-if="showSettings">
        <setting/>
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { Navbar, Sidebar, AppMain, TagsView, Settings } from './components'
import ResizeMixin from './mixin/ResizeHandler.js'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  data () {
    return {
    }
  },
  created () {},
  methods: {
    handleClickOutside: () => {
      // console.log('handleClickOutside')
      this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
    }
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'device'
      }
    }
  },
  components: {
    RightPanel,
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    Settings
  }
}
</script>

<style scoped="scoped">
</style>
