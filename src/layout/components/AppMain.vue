<template>
  <div>APP-main程序主要部分
    <!-- <div class="btnWrp" @click="click"> -->
      <!-- 添加.stop可阻止父级元素点击事件的发生 -->
      <!-- <div class="btn" @click.stop="clickMe($event)">clickMe</div> -->
      <!-- contextmenu事件右击鼠标会出现浏览器默认的菜单选项 添加.prevent可阻止出现菜单栏 -->
      <!-- 在函数中传$event,然后函数中接受一下便可获取事件对象 -->
      <!-- <div class="btn"  @contextmenu.stop.prevent="preventClick($event)">click</div> -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {},
  methods: {
    // 父级元素事件
    click: () => {
      console.log('click!')
    },
    // 子级元素事件
    clickMe: (event) => {
      console.log('clickMe:', event)
    },
    preventClick: (event) => {
      console.log('show', event.currentTarget)
    }
  }
}
</script>

<style scoped="scoped">
  .btnWrp {
    display: flex;
    justify-content: center;
  }
  .btn{
    display: flex;
    align-items: center;
    justify-content: center;
    /* 上面三行和下面两行都能实现上下左右垂直居中的效果 */
    /* line-height: 40px; */
    /* text-align: center; */
    margin-right: 20px;
    width: 80px;
    height: 40px;
    background-color: #7fa0ff;
    color: #fff;
    border-radius: 10px;
  }
</style>
