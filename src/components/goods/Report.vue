<template>
  <base-card>
    <template v-slot:nav>
      <el-breadcrumb-item><a href="/">数据统计</a></el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </template>
    <template v-slot:card>

    </template>
  </base-card>
</template>

<script>
import BaseCard from '../common/BaseCard'

export default {
  name: 'Report',
  components: {
    BaseCard
  }
}
</script>

<style lang="less" scoped>

</style>
