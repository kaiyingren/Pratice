<template>
  <div></div>
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
  methods: {},
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    })
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
