<template>
  <div>
    <h2>登录</h2>
    <el-input placeholder="请输入账号" v-model="user"></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button @click="loginFun">登录</el-button>
  </div>
</template>

<script>
//
export default {
  name: "LoginView",
  data() {
    return {
      user: '',
      password: '',
      token: ''
    }
  },
  // 验证登录
  methods: {
    loginFun() {
      this.$axios({
        url: '/api/admin/login',
        method: 'post',
        dataType: 'json',
        data: {
              "username": this.user,
              "password": this.password
            }
        ,
      }).then(res => {
        console.log(name);
        // localStorage.setItem('token', res.data.result.token)
        console.log(res);
        localStorage.setItem('user', this.user)
        this.$router.push('/homePage')
        console.log("登录成功")
      })
      // return request({
      //   url: 'login',
      //   method: 'post',
      //   params: {
      //     "account": this.user,
      //     "password": this.password
      //   }
      // })
    }
  }
}
</script>

<style scoped>
.el-input {
  display: block;
  width: 200px;
  text-align: center;
  margin: 10px auto;
}
</style>