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
              @change="handleChange">
            </el-cascader>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleTabsClick">
          <el-tab-pane label="动态参数" name="many">
            <el-button type="primary" size="mini" :disabled="isDisable" @click="showEditDialog">添加参数</el-button>
            <el-table :data="manyParamData" stripe border>
              <el-table-column  type="expand">
                <template v-slot:="scope">
                  <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable @close="handleClose(scope.row, i)">
                    {{item}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <el-table-column label="#" type="index"> </el-table-column>
              <el-table-column label="参数名称" prop="attr_name"> </el-table-column>
              <el-table-column label="操作" width="180px">
                <template v-slot:="scope">
                  <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleModify(scope.row)">编辑</el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDeleteParam(scope.row.attr_id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="only">
            <el-button type="primary" size="mini" :disabled="isDisable" @click="showEditDialog">添加属性</el-button>
            <el-table :data="onlyParamData" stripe border>
              <el-table-column  type="expand">
                <template v-slot:="scope">
                    <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable @close="handleClose(scope.row, i)">
                      {{item}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="scope.row.inputVisible"
                      v-model="scope.row.inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm(scope.row)"
                      @blur="handleInputConfirm(scope.row)"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <el-table-column label="#" type="index"> </el-table-column>
              <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
              <el-table-column label="操作" width="180px">
                <template v-slot:="scope">
                  <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleModify(scope.row)">编辑</el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDeleteParam(scope.row.attr_id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <edit-param-dialog :prop="propInfo" :is-visiable="editDialogVisiable" @confirm="onEditConfirm" @close="onCloseEditDialog()"></edit-param-dialog>
        <edit-param-dialog :prop="propInfo" :is-visiable="modifyDialogVisiable" @confirm="onModifyConfirm" @close="onCloseModifyDialog()"></edit-param-dialog>
      </template>
    </BaseCard>
</template>

<script>
import BaseCard from '../common/BaseCard'
import EditParamDialog from './EditParamDialog'

export default {
  name: 'Params',
  components: {
    BaseCard,
    EditParamDialog
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
      activeName: 'many',
      manyParamData: [],
      onlyParamData: [],
      editDialogVisiable: false,
      modifyDialogVisiable: false,
      dialogTitle: '',
      curRow: null
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
    handleTabsClick (tab, event) {
      console.log('table click', tab, event)
      this.getParamData()
    },
    handleChange () {
      console.log('handle change')
      this.getParamData()
    },
    async getParamData () {
      if (this.selectedKeys.length !== 3) return
      var id = this.selectedKeys[this.selectedKeys.length - 1]
      const { data: res } = await this.$axios.get(`categories/${id}/attributes`, { params: { sel: this.activeName } })
      console.log('res:', res)
      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        item.inputVisible = false
        item.inputValue = ''
      })
      console.log('get param data:', res)
      if (this.activeName === 'many') {
        this.manyParamData = res.data
      } else {
        this.onlyParamData = res.data
      }
    },
    handleModify (row) {
      console.log('row:', row)
      this.curRow = row
      if (this.activeName === 'many') {
        this.dialogTitle = '动态参数'
      } else {
        this.dialogTitle = '静态参数'
      }
      console.log('handleModify 1')
      this.modifyDialogVisiable = true
      console.log('handleModify 2')
    },
    showEditDialog () {
      if (this.activeName === 'many') {
        this.dialogTitle = '动态参数'
      } else {
        this.dialogTitle = '静态参数'
      }
      this.editDialogVisiable = true
      console.log('show edit dialog')
    },
    async onEditConfirm (param) {
      console.log('param:', param)
      if (this.selectedKeys.length !== 3) return
      var id = this.selectedKeys[this.selectedKeys.length - 1]
      const { data: res } = await this.$axios.post(`categories/${id}/attributes`,
        {
          attr_name: param.content,
          attr_sel: this.activeName
        })
      if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getParamData()
      console.log('get param data:', res)
    },
    onCloseEditDialog () {
      console.log('close many dialog')
      this.editDialogVisiable = false
    },
    async onModifyConfirm (param) {
      console.log('param:', param)
      if (this.selectedKeys.length !== 3) return
      var id = this.selectedKeys[this.selectedKeys.length - 1]
      const { data: res } = await this.$axios.put(`categories/${id}/attributes/${this.curRow.attr_id}`,
        {
          attr_name: param.content,
          attr_sel: this.activeName
        })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getParamData()
    },
    onCloseModifyDialog () {
      console.log('close many dialog')
      this.modifyDialogVisiable = false
      this.curRow = null
    },
    handleDeleteParam (attrid) {
      this.$confirm('此操作将永久删除该属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async (op) => {
        if (this.selectedKeys.length !== 3) return
        var id = this.selectedKeys[this.selectedKeys.length - 1]
        const { data: res } = await this.$axios.delete(`categories/${id}/attributes/${attrid}`)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getParamData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    handleClose (row, i) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      row.attr_vals.splice(i, 1)
      this.saveTagValue(row)
      console.log('handle close tag')
    },
    showInput (row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        // 获得焦点
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm (row) {
      const inputValue = row.inputValue
      if (inputValue) {
        row.attr_vals.push(inputValue)
        this.saveTagValue(row)
      }
      row.inputVisible = false
      row.inputValue = ''
      console.log('handle input confirm')
    },
    async saveTagValue (row) {
      const { data: res } = await this.$axios.put(`categories/${this.cateId}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(' ')
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
    }
  },
  computed: {
    isDisable: function () {
      if (this.selectedKeys.length === 3) {
        return false
      }
      return true
    },
    cateId () {
      if (this.selectedKeys.length !== 3) return
      var id = this.selectedKeys[this.selectedKeys.length - 1]
      return id
    },
    propInfo () {
      var prop = { title: this.dialogTitle }
      if (this.curRow !== null) {
        prop.content = this.curRow.attr_name
        // prop.title = this.curRow.attr_name
        console.log('param propinfo:', prop)
      }
      return prop
    }
  }
}
</script>

<style lang="less" scoped>
  .el-cascader {
    margin-top: 15px;
  }
  .el-table {
    margin-top: 15px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
  }
  .input-new-tag {
    width: 90px;
  }
</style>
