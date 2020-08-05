<template>
  <div class="home_container">
    <el-container>
      <el-header>
        <div>
          <img src="../assets/haima.png" alt="haima.png">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="quit">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff" unique-opened>
            <el-submenu :index="submenu.id+''" v-for="submenu in menulist" :key="submenu.id">
              <template slot="title">
                <i :class="iconsObj[submenu.id]"></i>
                <span>{{submenu.authName}}</span>
              </template>
              <el-menu-item :index="item.id+''" v-for="item in submenu.children" :key="item.id">
                <i class="el-icon-menu"></i>
                <span>{{item.authName}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menulist: [],
      iconsObj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-tools',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      }
    }
  },
  methods: {
    quit () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  async created () {
    const { data: res } = await this.$axios.get('menus')
    console.log(res)
    if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    this.menulist = res.data
  }
}
</script>

<style lang="less" scoped>
  .home_container {
    height: 100%;
  }

  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0px;

    div {
      display: flex;
      font-size: 20px;
      align-items: center;
      color: #fff;

      span {
        margin-left: 10px;
      }
    }
  }

  .el-aside {
    height: 100%;
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    height: 100%;
    background-color: #eaedf1;
  }
</style>
