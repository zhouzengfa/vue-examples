<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="rolesList" stripe border>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="权限名称" prop="authName"> </el-table-column>
        <el-table-column label="路径" prop="path"> </el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template v-slot:="scope">
            <el-tag v-if="scope.row.level==0" type="">一级</el-tag>
            <el-tag v-if="scope.row.level==1" type="success">二级</el-tag>
            <el-tag v-if="scope.row.level==2" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Rights',
  data () {
    return {
      rolesList: []
    }
  },
  methods: {

  },
  async created () {
    const { data: res } = await this.$axios.get('rights/list')
    console.log('rights:', res)
    if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    this.rolesList = res.data
  }

}

</script>

<style lang="less" scoped>
  .el-breadcrumb {
    font-size: 12px;
    margin-bottom: 15px;
  }

  .box-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
  }
  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }
</style>
