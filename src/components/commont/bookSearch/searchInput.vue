<template>
  <div style="position: relative;left: -350px;margin-bottom: 10px">
    <el-autocomplete
        class="inline-input"
        v-model="search.state2"
        :fetch-suggestions="querySearch"
        placeholder="请输入要查询的书籍"
        :trigger-on-focus="false"
        @select="handleSelect"
        style="width: 400px;"
    >
      <el-button slot="append" icon="el-icon-search" @click="getUserList" ></el-button>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "searchInput",
  data() {
    return {
      // 查询变量
      search: {
        restaurants: [],  // 书籍存放的变量
        state1: '',
        state2: '',
      },
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    async getUserList(){
      const {data:res} =await this.$axios.get('users',{params:this.queryInfo})
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userlist = res.data.users
      this.total = res.data.total
    },
  }
}
</script>

<style scoped>

</style>