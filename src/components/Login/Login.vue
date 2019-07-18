<template>
  <el-form class="login-container"
           label-position="left"
           :model="loginForm"
           ref="loginForm"
           v-loading="loading"
           :rules="rules">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text"
                auto-complete="off"
                placeholder="请输入用户名"
                v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password"
                auto-complete="off"
                placeholder="请输入密码"
                v-model="loginForm.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%" @click="submitForm('loginForm')">登录</el-button>
    </el-form-item>
    <el-link type="primary" :underline="false" @click="goRegister">没有账号？去注册</el-link>
  </el-form>
</template>

<script>
    export default {
      name: "Login",
      data () {
        return {
          rules: {
            username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
            pwd: [{required: true, message: '请输入密码', trigger: 'blur'}]
          },
          loginForm: {
            username: '',
            pwd: ''
          },
          loading: false
        }
      },
      methods: {
        submitForm (formName) {
          this.loading = true
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post('/api/users/login',{
                username: this.loginForm.username,
                pwd: this.loginForm.pwd
              }).then((res) => {
                this.loading = false
                if (res.data.code === 0) {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                  this.$router.push('/')
                } else {
                  this.$message.error('用户名或密码错误')
                }
              },(err) => {
                this.loading = false
                this.$message.error('找不到服务器QAQ~~~!!!')
                console.info(err)
              })
            } else {
              this.loading = false
              this.$message.error('亲亲再检查下哟~~~!!!');
              return false;
            }
          });
        },
        goRegister () {
          this.$router.push('/register')
        }
      }
    }
</script>

<style lang="stylus" scoped>
  .login-container
    border-radius 15px
    background-clip padding-box
    margin 180px auto
    width 320px
    padding 35px 35px 15px 35px
    border 1px solid #eaeaea
    box-shadow 0 0 15px #cac6c6
    .login_title
      margin 0 auto 40px auto
      text-align center
      color #303133
</style>
