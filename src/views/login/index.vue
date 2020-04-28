<template>
  <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
          <div class="title-container">
              <h3 class="title">
                  <!-- $t国际化 读取的是src\lang\zh.js中的数据 如果是中文显示 -->
                  <!-- {{ $t('login.title') }} -->
                  {{text.title}}
              </h3>
          </div>

        <!--参数prop： 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
        <el-form-item prop="username">
            <span class="svg-container">
                <!-- vue 全局注册的组件 -->
                <!-- <svg-icon icon-class="user" /> -->
            </span>
            <el-input ref="username" v-model="loginForm.username" :placeholder="text.inpNamePlaceholder" name="username" type="text" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <span class="svg-container">
                <!-- <svg-icon icon-class="password" /> -->
            </span>
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" :placeholder="text.inpPwdPlaceholder" name="password" auto-complete="on" @keyup.enter.native="handleLogin"></el-input>
            <span class="show-pwd" @click="showPwd">
                <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon> -->
            </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">
            <!-- {{ $t('login.logIn') }} -->
            {{text.btnText}}
        </el-button>

        <div style="position: relative">
            <div class="tips">
                <span>{{tips.username}} : admin</span>
                <span>{{tips.password}} : 随便填</span>
            </div>
            <div class="tips">
                <span style="margin-right: 18px;">{{tips.username}} : editor</span>
                <span>{{tips.password}} : 随便填</span>
            </div>
            <el-button class="thirdparty-button" type="primary" @click="showDialog = true">
                <!-- {{ $t('login.thirdparty') }} -->
                {{text.login}}
            </el-button>
        </div>
      </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
    name: 'Login',
    data () {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Pleace enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            text: {
                title: '系统登录',
                inpNamePlaceholder: '账号',
                inpPwdPlaceholder: '密码',
                btnText: '登录',
                login: '第三方登录'
            },
            loginForm: {
                username: 'admin',
                password: '111111'
            },
            loginRules: {
                username: [{required: true, trigger: 'blur', validator: validateUsername}],
                password: [{required: true, trigger: 'blur', validator: validatePassword}]
            },
            passwordType: 'password',
            loading: false,
            tips: {
                username: '账号',
                password: '密码'
            },
            showDialog: false,
            redirect: undefined
        }
  },
  created () {
      console.log('$router：VueRouter的实例：', this.$router)
      console.log('$route：处于激活状态(当前页面)的路由：', this.$route)
  },
  mounted () {
      if (this.$refs.username === '') {
          this.$refs.username.focus()
      } else if (this.$refs.password === '') {
          this.$refs.password.focus()
      }
  },
  methods: {
      handleLogin () {
          console.log('handleLogin')
          this.$refs.loginForm.validate(valid => {
              if (valid) {
                  this.loading = true
                //   dispatch含有异步操作，例如想后台提交数据，写法
                // this.$store.dispatch('mutations方法名', 值)
                this.$store.dispatch('user/login', this.loginForm)
                    .then(() => {
                        this.$router.push({path: this.redirect || '/'})
                        this.loading = false
                    })
              } else {
                  console.log('error submit!!')
                  return false
              }
          })
      },
      showPwd () {
          console.log('showPwd')
      }
  },
  watch: {
    //   复用组件时，想对路由参数的变化作出相应，可以watch(检测变化)$route对象
      $route: {
          handler: function (route) {
              console.log(route)
          }
      }
    //   除了上面的方式，也可以使用2.2中引入的beforeRouteUpdate 导航守卫
    // beforeRouteUpdate (to, from, next) {
    //     // react to route changes...
    //     // don't forget to call next()
    //     next()
    // }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not(cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

// reset element-ui css
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            cater-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .title-container {
        position: relative;

        .title {
        font-size: 26px;
        color: $light_gray;
            margin: 0 auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
