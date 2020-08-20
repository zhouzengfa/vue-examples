<template>
  <div>
  <el-dialog :title="'修改' + prop.title" :visible.sync="isShow" width="50%" @close="onCloseDialog">
    <el-form :model="data" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item :label="prop.title" prop="content">
        <el-input v-model="data.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditParamDialog',
  props: {
    prop: {
      type: Object,
      required: true
    },
    isVisiable: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      isShow: this.isVisiable,
      data: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入参数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onCloseDialog () {
      console.log('close dialog')
      this.$emit('close')
    }
  },
  watch: {
    isVisiable () {
      this.isShow = this.isVisiable
      console.log('isVisiable change')
    }
  }
}
</script>

<style scoped>

</style>
