<template>
  <div>
    <h2>增加用户</h2>
    <div style="width: 1000px;height: 600px;position: absolute;left: 350px;top: 150px">
      <div>
        <el-input v-model="user" placeholder="请输入要增加的账号" style="width: 500px;">
          <template slot="prepend">账号</template>
        </el-input>
      </div>
      <div>
        <el-input v-model="password" placeholder="请输入密码" style="width: 500px;" type="password">
          <template slot="prepend">密码</template>
        </el-input>
      </div>
      <el-input v-model="password" placeholder="请再次输入密码" style="width: 500px;" type="password">
        <template slot="prepend">密码</template>
      </el-input>
      <template>
        <div style="margin-top: 20px;margin-left: -150px">
          账号权限:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radio" label="1" border size="medium">管理员</el-radio>&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radio" label="2" border size="medium">读者</el-radio>
        </div>
      </template>
      <div style="margin-top: 20px;margin-left: -150px">
        <el-button @click="submit" style="width: 200px;">保存账号</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "addUser",
  data() {
    return {
      user: '',
      radio: '1',  // 默认为管理员
      password: ''
    }
  },
  methods: {
    // submit() {    //保存账号
    //   this.$axios({
    //     url: '/api/user/register',
    //     methods: 'get',
    //     data: {},
    //     dataType: 'json'
    //   }).then(res => {
    //     console.log(res);
    //     //把从json获取的数据赋值给数组
    //     self.sites = res;
    //   })
    // }
    submit: function () {
      let params = {
        userId: this.user,
        userPassword: this.password
      };
      var url = "/api/user/register";
      this.$axios.get(url, { //注意数据是保存到json对象的params属性
        params: params,
        dataType: 'json'
      }).then(res => {
        console.log(params);
        console.log(res);
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>

</style>