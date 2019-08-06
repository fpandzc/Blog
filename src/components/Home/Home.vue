<template>
  <el-container style="width: 100%;">
    <el-header class="home-header">
      <span class="home-header-tittle">博客系统</span>
      <el-dropdown class="home-header-dropdown">
        <span>
          {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="home-content">
      <el-aside style="width: 200px;" class="home-aside">
        <el-menu default-active="$router.path"
                 style="background-color: #ECECEC;"
                 :default-openeds="defaultOpeneds"
                 router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>博客管理</span>
            </template>
            <el-menu-item index="/Home/BlogList">博客列表</el-menu-item>
            <el-menu-item index="/Home/AddBlog/-1">发表博客</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "Home",
      data() {
       return {
         username: '',
         defaultOpeneds: ['1','/Home/BlogList'],
       }
      },
      created () {
        this.$http.get('/api/blog/index').then(res => {
          if(res.data.code !== 0){
            this.$message({
              showClose: true,
              message: '未登录'
            });
            return setTimeout(() => {
              this.$router.push('/login')
            },200)
          }
          const data = res.data.data
          this.username = data.username
        })
      },
      methods: {
        handleLogout () {
          this.$http.get('/api/users/logout').then(res => {
            console.info(res)
            if(res.data.code !== 0){
              this.$message({
                showClose: true,
                message: 'o(╥﹏╥)o注销失败'
              });
            }else {
              this.$message({
                showClose: true,
                message: '(*╹▽╹*)注销成功',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.push('/login')
              },200)
            }
          })
        }
      }
    }
</script>

<style lang="stylus" scoped>
  .home-header
    display flex
    justify-content space-between
    align-items center
    background #20a0ff
    .home-header-tittle
      font-size 22px
      color #f1f1f1
    .el-dropdown
      color #f1f1f1
  .home-content
    position absolute
    top 60px
    bottom 0
    width 100%
    .home-aside
      background: #ECECEC;
</style>
