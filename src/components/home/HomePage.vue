<template>
  <div>
    <el-container>
      <el-header>
        <h2 style="display: inline-block">欢迎来到XX图书系统</h2>
        <div style="position:absolute;right: 100px;top:20px;display: inline-block">
          <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
            <el-submenu index="1">
              <template slot="title">{{ user1 }}</template>
              <el-button @click="dialogVisible = true" style="border-color: white">密码管理</el-button>
              <div>
                <el-dialog
                    title="修改密码"
                    :visible.sync="dialogVisible"
                    width="30%"
                    >
          <span>
            <div>
                <el-input v-model="password">
                  <template slot="prepend">原密码</template>
                </el-input>
                <el-input v-model="password">
                  <template slot="prepend">新密码</template>
                </el-input>
              </div>
          </span>
          <span slot="footer" class="dialog-footer">
            <form>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="submit">修改</el-button>
            </form>
          </span>
                </el-dialog>
              </div>
              <el-button @click="tuichu" style="border-color: white">
                安全退出
              </el-button>
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
      dialogVisible: false,
      password: '',
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