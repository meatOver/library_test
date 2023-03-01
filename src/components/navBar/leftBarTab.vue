<template>
  <el-menu  router
            :default-active="$route.path">
    <el-menu-item index="/checkin">图书登记</el-menu-item>
    <el-menu-item index="/return">归还记录</el-menu-item>
    <el-menu-item index="/search">图书查询</el-menu-item>
    <el-menu-item index="/online">在线读者</el-menu-item>
    <el-menu-item index="/userSearch">查询管理</el-menu-item>
    <el-menu-item index="/logs">借阅日志</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "oneTwo",
  data() {
    return{
    }
  }
}
</script>

<style scoped>

</style>