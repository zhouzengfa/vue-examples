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
      <el-form ref="form" :rules="rules" :model="form" label-position="top">
        <el-tabs tab-position="left" v-model="activeStep">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input type="number" v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" v-model="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input type="number" v-model="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_kind">
              <el-cascader
                v-model="selectedKeys"
                :options="catlist"
                :props="props"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
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
      activeStep: '0',
      catlist: [],
      selectedKeys: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      form: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_kind: []
      },
      rules: {
        goods_name: [{ required: true, message: '请输入商品名', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入重量', trigger: 'blur' }],
        goods_kind: [{ required: true }]
      }
    }
  },
  methods: {
    async getCatList () {

    },
    handleChange () {
      // this.getCatList()
      console.log('handle change')
    }
  },
  created () {
    this.getCatList()
  }
}
</script>

<style lang="less" scoped>
.el-steps {
  margin: 15px 0px;
}
</style>
