<template>
  <div class="wscn-http404-container">
      <div class="wscn-http404">
          <div class="pic-404">
              <img class="pic-404__parent" src="@/assets/404_images/404.png" alt="404">
              <img class="pic-404__child left" src="@/assets/404_images/404_cloud.png" alt="404">
              <img class="pic-404__child mid" src="@/assets/404_images/404_cloud.png" alt="404">
              <img class="pic-404__child right" src="@/assets/404_images/404_cloud.png" alt="404">
          </div>
          <div class="bullshit">
              <div class="bullshit__oops">
                  OOPS!
              </div>
              <div class="bullshit__info">
                  版权所有
                  <a class="link-type" href="http://wallstreetcn.com" target="_blank">华尔街见闻</a>
              </div>
              <div class="bullshit_headline">
                  {{message}}
              </div>
              <div class="bullshit__info">
                  请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告
              </div>
              <router-link to="/" class="bullshit__return-home">
                  返回首页
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Page404',
    computed: {
        message () {
            return '网管说这个页面你不能进......'
        }
    },
  created () {},
  methods: {}
}
</script>

<style scoped="scoped" lang="scss">
.wscn-http404-container {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 40%;
    left: 40%;
}
.wscn-http404 {
    position: relative;
    width: 1200px;
    padding: 0 50px;
    overflow: hidden;
    .pic-404 {
        position: relative;
        float: left;
        width: 600px;
        overflow: hidden;
        &__parent {
            width: 100%;
        }
        &__child {
            position: absolute;
            &.left {
               width: 80px;
               top: 17px;
               left: 220px;
               opacity: 0;
               animation: cloudLeft 2s linear forwards;
               animation-delay: 1s;
            }
        }
    }
}
</style>
