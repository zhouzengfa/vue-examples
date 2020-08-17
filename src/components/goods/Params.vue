<template>
    <BaseCard>
      <template v-slot:nav>
        <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>分类参数</el-breadcrumb-item>
      </template>
      <template v-slot:card>
        <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false" > </el-alert>
        <el-row>
          <el-col>
            <span>选择商品分类：</span>
            <el-cascader
              v-model="selectedKeys"
              :options="cateList"
              :props="cascaderProps"
              clearable
              @change="handleChange">
            </el-cascader>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleTableClick">
          <el-tab-pane label="动态参数" name="first">
            <el-button type="primary" size="mini" :disabled="isDisable">添加参数</el-button>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="second">
            <el-button type="primary" size="mini" :disabled="isDisable">添加属性</el-button>
          </el-tab-pane>
        </el-tabs>
      </template>
    </BaseCard>
</template>

<script>
import BaseCard from '../common/BaseCard'

export default {
  name: 'Params',
  components: {
    BaseCard
  },
  data () {
    return {
      cateList: [],
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      selectedKeys: [],
      activeName: 'first'
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$axios.get('categories', { params: { type: 3 } })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.cateList = res.data
      console.log('categories:', this.catelist)
    },
    handleTableClick (tab, event) {
      console.log('table click', tab, event)
    },
    handleChange () {
      console.log('handle change')
    }
  },
  computed: {
    isDisable: function () {
      if (this.selectedKeys.length === 3) { return false }
      return true
    }
  }

}
</script>

<style lang="less" scoped>
  .el-cascader {
    margin-top: 15px;
  }

</style>
