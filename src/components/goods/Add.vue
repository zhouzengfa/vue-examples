<template>
  <base-card>
    <template v-slot:nav>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </template>
    <template v-slot:card>
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"> </el-alert>
      <el-steps :active="activeStep - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </template>
  </base-card>
</template>

<script>
import BaseCard from '../common/BaseCard'

export default {
  name: 'Add',
  components: {
    BaseCard
  },
  data () {
    return {
      activeStep: '0'
    }
  }
}
</script>

<style lang="less" scoped>
.el-steps {
  margin: 15px 0px;
}
</style>
