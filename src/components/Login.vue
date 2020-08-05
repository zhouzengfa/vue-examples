<script src="../main.js"></script>
<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar-box">
        <img src="../assets/logo.png" alt="logo.png">
      </div>
      <!--表单区域-->
      <el-form  label-width="0px" ref="formRef" class="login_form" :model="loginForm" :rules="verifyRules">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary">登陆</el-button>
          <el-button type="info" @click="resetForm('formRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        verifyRules: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      resetForm(from)
      {
        this.$refs[from].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_box {
    width: 450px;
    height: 300px;
    border-radius: 3px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .avatar-box{
    width: 100px;
    height: 100px;
    border: #eee solid 1px;
    background-color: #fff;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);

    img{
      width: 100px;
      height: 100px;
      border: #eee solid 1px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: #ddd;
    }
  }
.login_form{
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0px;
  .btns{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
