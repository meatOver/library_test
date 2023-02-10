<template>
  <el-menu  router
            :default-active="$route.path">
    <el-submenu index="/index">
      <template slot="title"><i class="el-icon-s-home"></i>图书管理</template>
      <el-menu-item-group>
        <el-menu-item index="/checkin">图书登记</el-menu-item>
        <el-menu-item index="/record">借阅查询</el-menu-item>
        <el-menu-item index="/return">归还记录</el-menu-item>
        <el-menu-item index="/search">图书查询</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/two">
      <template slot="title"><i class="el-icon-s-home"></i>读者管理</template>
      <el-menu-item-group>
        <el-menu-item index="/online">在线读者</el-menu-item>
        <el-menu-item index="/outTime">超时查询</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/five">
      <template slot="title"><i class="el-icon-s-home"></i>用户管理</template>
      <el-menu-item-group>
        <el-menu-item index="/userSearch">查询管理</el-menu-item>
        <el-menu-item index="/addUser">增加管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/three">
      <template slot="title"><i class="el-icon-s-home"></i>借阅统计</template>
      <el-menu-item-group>
        <el-menu-item index="/logs">借阅日志</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
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