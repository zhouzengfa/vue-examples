<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input @clear="getUserList" clearable placeholder="请输入姓名" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogVisiable=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <!--方法一-->
          <template v-slot:="slot">
            <el-switch v-model="slot.row.mg_state" @change="onChangeUserState(slot.row)"></el-switch>
          </template>
          <!--方法二-->
          <!--          <template slot-scope="scope">-->
          <!--          <el-switch v-model="scope.row.mg_state"></el-switch>-->
          <!--          </template>-->
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot:="slot">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditUserDialog(slot.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(slot.row.id)"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRoleDialog(slot.row)"></el-button>
            </el-tooltip>
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
        :total="totaluser">
      </el-pagination>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="addUserDialogVisiable" width="50%" @close="onCloseAddUserDialog">
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserFormRef" label-width="70px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisiable= false">取 消</el-button>
        <el-button type="primary" @click="addUser('addUserFormRef')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改用户" :visible.sync="editUserDialogVisiable" width="50%" @close="onCloseEditUserDialog">
      <el-form :model="editUserForm" :rules="editUserRules" ref="editUserFormRef" label-width="70px">
        <el-form-item label="姓名">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisiable= false">取 消</el-button>
        <el-button type="primary" @click="modifyUser('editUserFormRef')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="roleDialogVisiable" width="50%" @close="onCloseRoleDialog">
      <p>当前用户：{{allocRole.username}}</p>
      <p>当前角色：{{allocRole.role_name}}</p>
      <p>分配新角色：
        <el-select v-model="selectedRoleValue" placeholder="请选择">
          <el-option
            v-for="item in userinfo"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisiable= false">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data: function () {
    var checkMobile = (rule, value, callback) => {
      const regEmail = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regEmail.test(value)) {
        return callback()
      }
      return callback(new Error('请输入合法的手机号'))
    }
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9-_])+@([a-zA-Z0-9-_])+(\.[a-zA-Z0-9-_])+/
      if (regEmail.test(value)) {
        return callback()
      }
      return callback(new Error('请输入合法的邮箱'))
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      userlist: [],
      totaluser: 0,
      addUserDialogVisiable: false,
      editUserDialogVisiable: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在3-10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在6-15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      editUserRules: {
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      roleDialogVisiable: false,
      allocRole: '',
      userinfo: [],
      selectedRoleValue: ''
    }
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$axios.get('users', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.userlist = res.data.users
      this.totaluser = res.data.total
    },
    handleSizeChange: function (val) {
      console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      this.getUserList()
    },
    handleCurrentChange: function (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getUserList()
    },
    onChangeUserState: async function (userinfo) {
      console.log('userinfo:', userinfo)
      // userinfo.mg_state = !userinfo.mg_state
      const { data: res } = await this.$axios.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
    },
    onCloseAddUserDialog () {
      this.$refs.addUserFormRef.resetFields()
    },
    async addUser (form) {
      this.$refs[form].validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios.post('users', this.addUserForm)
        console.log(res)
        if (res.meta.status !== 201) {
          this.$message.error(res.meta.msg)
          return
        }
        this.$message.success(res.meta.msg)
        this.addUserDialogVisiable = false
        this.getUserList()
      })
    },
    onCloseEditUserDialog () {
      this.$refs.editUserFormRef.resetFields()
      console.log('click close edit user dialog')
    },
    async showEditUserDialog (id) {
      console.log('user id:', id)
      const { data: res } = await this.$axios.get('users/' + id)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.editUserForm = res.data
      this.editUserDialogVisiable = true
    },
    async modifyUser (form) {
      this.$refs[form].validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios.put('users/' + this.editUserForm.id, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        })
        console.log(res)
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
          return
        }
        this.$message.success(res.meta.msg)
        this.editUserDialogVisiable = false
        this.getUserList()
      })
    },
    async deleteUser (id) {
      console.log('delete id:", id')
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((op) => {
        this.$axios.delete('users/' + id)
          .then(data => {
            console.log(data)
            if (data.data.meta.status !== 200) return this.$message.error(data.data.meta.msg)
            this.$message({
              type: 'success',
              message: data.data.meta.msg
            })
            this.getUserList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    onCloseRoleDialog () {
      console.log('关闭角色分配对话框')
      this.roleDialogVisiable = false
      this.allocRole = ''
      this.userinfo = []
    },
    async showRoleDialog (role) {
      const { data: res } = await this.$axios.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.userinfo = res.data
      this.roleDialogVisiable = true
      this.allocRole = role
    },
    async assignRole () {
      const { data: res } = await this.$axios.put(`users/${this.allocRole.id}/role`, { rid: this.selectedRoleValue })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getUserList()
      this.roleDialogVisiable = false
      console.log('分配角色操作')
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

  .box-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
  }

  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }

  .el-pagination {
    margin-top: 15px;
  }

</style>
