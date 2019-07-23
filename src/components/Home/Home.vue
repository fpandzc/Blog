<template>
  <el-container style="width: 100%">
    <el-header>
      <span>博客系统</span>
      <el-container>
        <span>fpandzc</span>
      </el-container>
    </el-header>
    <el-container>
      <el-aside>2</el-aside>
      <el-main>3</el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "Home",
      created () {
        this.$http.get('/api/blog/index').then(res => {
          if(res.data.code !== 0){
            this.$message({
              showClose: true,
              message: '未登录'
            });
            setTimeout(() => {
              this.$router.push('/login')
            },200)
          }
        })
      }
    }
</script>

<style scoped>

</style>
