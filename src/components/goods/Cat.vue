<template>
    <div>
      <BaseCard>
        <template v-slot:nav>
          <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </template>
        <template v-slot:card>
          <el-button type="primary">添加分类</el-button>
          <zk-table
            border
            :selection-type="false"
            :expand-type="false"
            show-index index-text="#"
            :data="cateList" :columns="columns" role-key="cat_id">
            <template slot="isok" slot-scope="scope">
              <i class="el-icon-success" style="color: lightgreen" v-if="scope.row.cat_deleted == false"></i>
              <i v-else class="el-icon-delete" style="color: red"></i>
            </template>
            <template slot="order" slot-scope="scope">
              <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
              <el-tag v-else-if="scope.row.cat_level==1" type="success">二级</el-tag>
              <el-tag v-else type="warning">三级</el-tag>
            </template>
            <template slot="operator" slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDeleteDialog()">删除</el-button>
            </template>
          </zk-table>
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
    </div>
</template>

<script>
import BaseCard from '../common/BaseCard'
import ZkTable from 'vue-table-with-tree-grid'

export default {
  components: {
    BaseCard,
    ZkTable
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
      totalpage: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operator',
          width: 180
        }
      ]
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
    },
    showEditDialog (row) {
      console.log('show edit dialog')
    },
    showDeleteDialog () {
      console.log('show delete dialog')
    },
    handleSizeChange (pagesize) {
      console.log('page size change:', pagesize)
      this.queryInfo.pagesize = pagesize
      this.getCateList()
    },
    handleCurrentChange (pagenum) {
      console.log('handle current change. page num:', pagenum)
      this.queryInfo.pagenum = pagenum
      this.getCateList()
    }
  }
}
</script>

<style lang="less" scoped>
  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }
  .zk-table {
    margin-top: 15px;
  }
  .el-pagination {
    margin-top: 15px;
  }
</style>
