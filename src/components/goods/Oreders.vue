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
      <el-table :data="orderList" stripe border>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="订单编号" prop="order_number" width="260px"> </el-table-column>
        <el-table-column label="订单价格" prop="order_price"> </el-table-column>
        <el-table-column label="是否付款">
          <template v-slot:="scope">
            <el-tag v-if="scope.row.pay_status==0" type="danger">未付款</el-tag>
            <el-tag v-else type="success">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"> </el-table-column>
        <el-table-column label="下单时间" width="160px">
          <template v-slot:="scope">
            {{scope.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template v-slot:="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" ></el-button>
            <el-button type="success" size="mini" icon="el-icon-location" @click="removeById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage">
      </el-pagination>
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
    handleSizeChange (pagesize) {
      console.log('page size change:', pagesize)
      this.queryInfo.pagesize = pagesize
      this.orderList()
    },
    handleCurrentChange (pagenum) {
      console.log('handle current change. page num:', pagenum)
      this.queryInfo.pagenum = pagenum
      this.getOrderList()
    },
    async getOrderList () {
      const { data: res } = await this.$axios.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log('order list:', res)
      this.orderList = res.data.goods
      this.totalpage = res.data.total
    }
  },
  created () {
    this.getOrderList()
  }

}
</script>

<style lang="less" scoped>
.el-table {
  margin: 15px 0px;
}
</style>
