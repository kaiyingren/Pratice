<template>
  <div>
    NavBar
    <slot>
      <p>默认内容1</p>
    </slot>
    <slot name="slot1"></slot>
    <slot name="slot2"></slot>
    <!-- <slot :user="user">{{user.gender}}1111</slot> -->
    <slot name="slot3" :user="user">
      <p>默认内容2{{user}}</p>
    </slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        gender: 'male',
        age: 22
      }
    }
  },
  created () {},
  methods: {}
}
</script>

<style scoped="scoped">
</style>
