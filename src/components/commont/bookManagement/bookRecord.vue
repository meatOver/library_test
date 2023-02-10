<template>
  <div>
    <search-input></search-input>
    <div style="width: 1000px;height: 600px;position: absolute;left: 300px">
      <el-table
          :data="realData" stripe>
        <el-table-column
            prop="date"
            label="日期">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="address"
            label="书籍名称">
        </el-table-column>
        <el-table-column
            prop="address"
            label="时间">
        </el-table-column>
        <el-table-column
            prop="address"
            label="借阅时长">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import searchInput from "@/components/commont/bookSearch/searchInput";

export default {
  name: "bookRecord",
  components: {
    searchInput
  },
  data() {
    return {
      // 查询变量
      search: {
        restaurants: [],  // 书籍存放的变量
        state1: '',
        state2: '',
      },
      // 获取到的数据储存
      realData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
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
  },
  created() {
    // this.$axios({
    //   url: '',           // 获取后台数据
    //   method: "post",
    // }).then(res => {
    //   this.tableData = res
    // })
  }
}
</script>

<style scoped>

</style>