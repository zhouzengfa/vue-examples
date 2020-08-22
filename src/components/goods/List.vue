<template>
  <base-card>
    <template v-slot:nav>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </template>
    <template v-slot:card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="searchContent">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodList" stripe border>
        <el-table-column  type="expand">
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="商品名称" prop=""> </el-table-column>
        <el-table-column label="商品价格(元)" prop=""> </el-table-column>
        <el-table-column label="商品重量" prop=""> </el-table-column>
        <el-table-column label="创建时间" prop=""> </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot:="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" >编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      goodList: []
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>
