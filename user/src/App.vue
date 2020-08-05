<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/user">用户管理</router-link> |
      <router-link to="/student">学生管理</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
}
</style>
