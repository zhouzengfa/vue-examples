<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" stripe border>
        <el-table-column type="index" ></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="ms_state" label="状态" ></el-table-column>
        <el-table-column label="操作" ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 6
      },
      userlist: [],
      totaluser: 0
    }
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$axios.get('users', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.userlist = res.data.users
      this.totaluser = res.data.total
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    font-size: 12px;
    margin-bottom: 15px;
  }
  .box-card{
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
  }
  .el-table{
    margin-top: 15px;
    font-size: 12px;
  }

</style>
