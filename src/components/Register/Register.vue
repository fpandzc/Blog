<template>
  <el-form class="register-container"
           label-position="left"
           label-width="0px"
           :model="registerForm"
           ref="registerForm"
           v-loading="loading"
           :rules="rules">
    <h3 class="register_title">用户注册</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="registerForm.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="secondPwd">
      <el-input type="password" v-model="registerForm.secondPwd" auto-complete="off" placeholder="请确认密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%" @click="submitForm('registerForm')">注册</el-button>
    </el-form-item>
    <el-link type="primary" :underline="false" @click="goLogin">已有账号? 去登陆</el-link>
  </el-form>
</template>

<script>
    export default {
      name: "Register",
      data() {
        const usernameCheck = (rule,value,callback) => {
          const len = value.length
          if (value === ''){
            callback(new Error('用户名不能为空'))
          }

          if (len < 3 || len > 15){
            callback(new Error('长度在 3 到 15 个字符'))
          }

          for (let item of value){
            if(!(/[A-Za-z0-9_\-]+/.test(item))) {
              callback(new Error('用户名只支持数字，字母以及中划线 - 和下划线 _'))
            }
          }
          this.$http.post('/api/users/username',{
            username: this.registerForm.username
          }).then((res) => {
            if (res.data.code === 0) {
              callback()
            } else {
              callback(new Error('用户名已存在'))
            }
          },(err) => {
            console.error(err)
          })
        }

        const pwdCheck = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('密码不能为空'));
          } else {
            if (this.registerForm.secondPwd !== '') {
              this.$refs.registerForm.validateField('secondPwd');
            }
            callback();
          }
        }

        const secondPwdCheck = (rule,value,callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          }

          if (value !== this.registerForm.pwd) {
            callback(new Error('两次输入密码不一致!'));
          }

          callback();
        }

        return {
          rules: {
            username: [
              {
                validator: usernameCheck,
                trigger: 'blur'
              }
            ],
            pwd: [
              {
                validator: pwdCheck,
                trigger: 'blur'
              }
            ],
            secondPwd: [
              {
                validator: secondPwdCheck,
                trigger: 'blur'
              }
            ]
          },
          registerForm: {
            username: '',
            pwd: '',
            secondPwd: ''
          },
          loading: false
        }
      },
      methods: {
        submitForm(formName){
          this.loading = true
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post('/api/users/register',{
                username: this.registerForm.username,
                pwd: this.registerForm.pwd
              }).then((res) => {
                this.loading = false
                if (res.data.code === 0) {
                  this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                  this.goLogin()
                } else {
                  this.$message.error('注册失败')
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
        goLogin () {
          this.$router.push('/login')
        }
      }
    }
</script>

<style lang="stylus" scoped>
  .register-container
    border-radius 15px
    background-clip padding-box
    margin 180px auto
    width 320px
    padding 35px 35px 15px 35px
    border 1px solid #eaeaea
    box-shadow 0 0 15px #cac6c6
    .register_title
      margin 0 auto 40px auto
      text-align center
      color #303133
</style>
