<template>
  <base-card>
    <template v-slot:nav>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </template>
    <template v-slot:card>
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"> </el-alert>
    </template>
  </base-card>
</template>

<script>
import BaseCard from '../common/BaseCard'

export default {
  name: 'Add',
  components: {
    BaseCard
  }
}
</script>

<style lang="less" scoped>

</style>
