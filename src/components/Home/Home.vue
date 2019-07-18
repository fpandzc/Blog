<template>
  <div></div>
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
            },300)
          } else {
            alert('首页')
          }
        })
      }
    }
</script>

<style scoped>

</style>
