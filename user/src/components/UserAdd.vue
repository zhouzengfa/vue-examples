<template>
    <div>
      <h2>用户添加</h2>
      <form action="">
        用户名：<input v-model="user.name" type="text"><br>
        年  龄：<input v-model="user.age" type="text"><br>
        出生日期：<input v-model="user.birthday" type="text"><br>
        <input type="button" @click="clickAdd" value="添加">
      </form>
    </div>
</template>

<script>
export default {
  name: 'UserAdd',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    clickAdd: function () {
      this.$axios({
        method: 'post',
        url: 'http://rap2.taobao.org:38080/app/mock/262445/user/add',
        data: this.user
      }).then(res => {
        console.log(res)
        if (res.data.success === true) {
          this.$router.push('/student')
        }
      }).catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>

</style>
