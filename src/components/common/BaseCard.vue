<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <slot name="nav">
        <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </slot>
    </el-breadcrumb>
    <el-card class="box-card">
     <slot name = "card">default card</slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BaseCard'
}
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    font-size: 12px;
    margin-bottom: 15px;
  }
  .box-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
  }
  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }
</style>
