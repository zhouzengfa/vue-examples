<template>
    <div>
      <BaseCard>
        <template v-slot:nav>
          <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </template>
        <template v-slot:card>
          <el-button type="primary">添加分类</el-button>
        </template>
      </BaseCard>
    </div>
</template>

<script>
import BaseCard from '../common/BaseCard'

export default {
  components: {
    BaseCard
  },
  name: 'Cat'
}
</script>

<style lang="less" scoped>
  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }
</style>
