<template>
  <div>
    <h1>学生管理界面</h1>
    <table border="1">
      <tr>
        <td>编号</td>
        <td>姓名</td>
        <td>年龄</td>
        <td>出生日期</td>
        <td>操作</td>
      </tr>
      <tr v-for="user in users" :key="user.num">
        <td>{{user.num}}</td>
        <td>{{user.name}}</td>
        <td>{{user.age}}</td>
        <td>{{user.birthday}}</td>
        <td><a href="javascript:void(0);" @click="deleteUser(user.num)">删除</a>|
          <router-link :to="'/student/modify?num=' + user.num
          +'&&name='+user.name
          +'&&age='+user.age
          +'&&birthday='+user.birthday">修改</router-link></td>
      </tr>
    </table>
    <router-link to="/student/add">添加</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Students',
  data () {
    return {
      users: []
    }
  },
  methods: {
    findAll () {
      this.$axios({
        method: 'get',
        url: 'http://rap2.taobao.org:38080/app/mock/262445/users',
        data: {
          page: '1',
          num: 10
        }
      }).then(res => {
        this.users = res.data.result
        console.log(res)
      }).catch(error => console.log(error))
    },
    deleteUser (userid) {
      console.log(userid)
      this.$axios.get('http://rap2.taobao.org:38080/app/mock/262445/user/delete?id=' + userid)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.findAll()
          }
        })
        .catch(error => console.log(error))
    }
  },
  components: {},
  created () {
    this.findAll()
  },
  watch: {
    $route: {
      handler: function (to, from) {
        console.log('route change:')
        console.log(to)
        if (to.path === '/student') {
          this.findAll()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
