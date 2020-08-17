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
  name: 'Cat',
  data () {
    return {
      queryInfo: {
        pagesize: 5,
        pagenum: 1,
        type: 3
      },
      cateList: [],
      totalpage: 0
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$axios.get('categories', { params: this.queryInfo })
      console.log('categories:', res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.cateList = res.data.result
      this.totalpage = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>
  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }
</style>
