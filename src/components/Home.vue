<template>
  <div class="home_container">
    <el-container>
      <el-header>Header
        <el-button type="info" @click="quit">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    quit () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  .home_container{
    height: 100%;
  }
  .el-container{
    height: 100%;
  }
  .el-header{
    background-color: #373d41;
  }
  .el-aside{
    height: 100%;
    background-color: #333744;
  }
  .el-main{
    height: 100%;
    background-color: #eaedf1;
  }
</style>
