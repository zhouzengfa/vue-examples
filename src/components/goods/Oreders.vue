<template>
  <BaseCard>
    <template v-slot:nav>
      <el-breadcrumb-item><a href="/">订单管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </template>
    <template v-slot:card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable >
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </el-col>
      </el-row>
<!--      <el-table :data="goodList" stripe border>-->
<!--        <el-table-column label="#" type="index"> </el-table-column>-->
<!--        <el-table-column label="商品名称" prop="goods_name"> </el-table-column>-->
<!--        <el-table-column label="创建时间" width="140px">-->
<!--          <template v-slot:="scope">-->
<!--            {{scope.row.add_time | dateFormat}}-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="操作" width="180px">-->
<!--          <template v-slot:="scope">-->
<!--            <el-button type="primary" size="mini" icon="el-icon-edit" >编辑</el-button>-->
<!--            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--      <el-pagination-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page="queryInfo.pagenum"-->
<!--        :page-sizes="[1, 2, 5, 10]"-->
<!--        :page-size="queryInfo.pagesize"-->
<!--        layout="total, sizes, prev, pager, next, jumper"-->
<!--        :total="totalpage">-->
<!--      </el-pagination>-->
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '../common/BaseCard'
export default {
  name: 'Oreders',
  components: {
    BaseCard
  },
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      totalpage: 0,
      orderList: []
    }
  },
  methods: {

  },
  async created () {
    const { data: res } = await this.$axios.get('orders', { params: this.queryInfo })
    if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    console.log('order list:', res)
    this.orderList = res.data.goods
    this.totalpage = res.data.total
  }

}
</script>

<style lang="less" scoped>

</style>
