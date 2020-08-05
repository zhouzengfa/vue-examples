<script src="../main.js"></script>
<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar-box">
        <img src="../assets/logo.png" alt="logo.png">
      </div>
      <!--表单区域-->
      <el-form  label-width="0px" class="login_form">
        <el-form-item>
          <el-input ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary">登陆</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login'
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
