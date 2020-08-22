<template>
  <base-card>
    <template v-slot:nav>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </template>
    <template v-slot:card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodList" stripe border>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="商品名称" prop="goods_name"> </el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price"> </el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"> </el-table-column>
        <el-table-column label="创建时间" width="140px">
          <template v-slot:="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot:="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" >编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)">删除</el-button>
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
      商品列表
  </base-card>
</template>

<script>
import BaseCard from '../common/BaseCard'

export default {
  name: 'List',
  components: {
    BaseCard
  },
  data () {
    return {
      goodList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      totalpage: 0
    }
  },
  methods: {
    async getGoodList () {
      const { data: res } = await this.$axios.get('goods', { params: this.queryInfo })
      console.log('goodlist', res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.totalpage = res.data.total
      this.goodList = res.data.goods
      console.log('goodlist:', this.goodList)
    },
    async removeById (id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async (op) => {
        const { data: res } = await this.$axios.delete(`goods/${id}`)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getGoodList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    handleSizeChange (pagesize) {
      console.log('page size change:', pagesize)
      this.queryInfo.pagesize = pagesize
      this.getGoodList()
    },
    handleCurrentChange (pagenum) {
      console.log('handle current change. page num:', pagenum)
      this.queryInfo.pagenum = pagenum
      this.getGoodList()
    }
  },
  created () {
    this.getGoodList()
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin: 15px 0px;
  font-size: 12px;
}
</style>
