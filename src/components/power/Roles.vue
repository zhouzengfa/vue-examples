<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="rolesList" stripe border>
        <el-table-column  type="expand">
          <template v-slot:="scope">
            <el-row :class="['bd-bottom','vccenter', i1 === 0 ? 'bd-top' : '']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
              <el-col :span="5">
                <el-tag closable>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row :class="['vccenter','bd-sub-bottom']" v-for="(item2) in item1.children" :key="item2.id">
                  <el-col :span="5">
                    <el-tag type="success" closable>{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="19" >
                    <el-tag v-for="item3 in item2.children" :key="item3.id" type="warning" closable>{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
<!--            <pre>{{scope.row}}</pre>-->
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" width="300px">
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          <el-button type="warning" size="mini" icon="el-icon-setting">分配权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data () {
    return {
      rolesList: []
    }
  },
  async created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const { data: res } = await this.$axios.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.rolesList = res.data
    }
  }
}
</script>

<style scoped lang="less">
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
    .bd-top {
      border-top: 1px solid #eee;
    }
    .bd-bottom {
      border-bottom: 1px solid #eee;
    }
    .bd-sub-bottom {
      border-bottom: 1px solid #eee;
    }
    .bd-sub-bottom:last-child {
      border-bottom: none;
    }
    .el-tag {
         margin: 7px 7px;
       }
    .vccenter {
      display: flex;
      align-items: center;
    }
  }
</style>
