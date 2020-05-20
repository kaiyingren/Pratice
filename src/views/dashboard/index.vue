<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  data () {
    return {
      currentRole: 'adminDashboard'
    }
  },
  created () {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {},
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  components: {
    adminDashboard,
    editorDashboard
  }
}
</script>

<style scoped="scoped">
</style>
