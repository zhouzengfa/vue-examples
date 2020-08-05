<template>
    <div>
      <h2>用户修改</h2>
      <form action="">
        编号：<input v-model="user.num" type="text"><br>
        姓名：<input v-model="user.name" type="text"><br>
        年龄：<input v-model="user.age" type="text"><br>
        出生日期<input v-model="user.birthday" type="text"><br>
        <input type="button" value="修改" @click="modify"><br>
      </form>
    </div>
</template>

<script>
export default {
  name: 'UserModify',
  data () {
    return {
      user: {
        num: 0,
        name: 'default'
      }
    }
  },
  methods: {
    modify () {
      this.$axios.get('http://rap2.taobao.org:38080/app/mock/262445/user/modify', this.user)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.$router.push('/student')
          }
        })
        .catch(error => console.log(error))
    },
    freshUser () {
      this.user = {
        num: this.$route.query.num,
        age: this.$route.query.age,
        birthday: this.$route.query.birthday,
        name: this.$route.query.name
      }
    }
  },
  created () {
    this.freshUser()
  },
  watch: {
    $route: {
      handler (to, from) {
        if (to.path === '/student/modify') {
          this.freshUser()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
