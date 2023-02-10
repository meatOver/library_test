<template>
  <div>
    <el-container>
      <el-header>
        <h2 style="display: inline-block">欢迎来到XX图书系统</h2>
        <div style="position:absolute;right: 100px;top:20px;display: inline-block">
          <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
            <el-submenu index="1">
              <template slot="title">{{user1}}</template>
              <el-menu-item index="/search">密码管理</el-menu-item>
              <el-menu-item index="2-2" @click="tuichu">
                安全退出
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);position: absolute;top: 110px;">
        <left-bar-tab></left-bar-tab>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import homeIndex from "@/components/commont/home/homeIndex";
import leftBarTab from "@/components/navBar/leftBarTab";

export default {
  name: "HomePage",
  components: {
    leftBarTab,
    homeIndex
  },
  data() {
    return {
      activeIndex: '1',
      user1: ''
    };
  },
  methods: {
    tuichu() {
      localStorage.removeItem('token');
      this.$router.push('/')
    },
  },
  created() {
    this.user1 = localStorage.getItem('user')
  }
}
</script>

<style scoped>

</style>