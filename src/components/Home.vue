<template>
  <div class="home_container">
    <el-container>
      <el-header>
        <div>
          <img src="../assets/haima.png" alt="haima.png">
          <span>电商后台管理系统</span>
        </div>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0px;
    div{
      display: flex;
      font-size: 20px;
      align-items: center;
      color: #fff;
      span{
        margin-left: 10px;
      }
    }
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
