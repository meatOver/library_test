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
            label="归还时间">
        </el-table-column>
        <el-table-column
            prop="address"
            label="借阅时长">
        </el-table-column>
        <el-table-column
            prop="address"
            label="是否超时">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import searchInput from "@/components/commont/bookSearch/searchInput";

export default {
  name: "bookReturn",
  components: {
    searchInput
  },
  data() {
    return {
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
      }],
      timer: ''
    }
  },
  methods: {
    showNotice() {
      // this.marginTop -= 1

      if (true) {     // 滚上去36px后把前两条数据拉下来
        this.realData.push(this.realData[0])
        this.realData.push(this.realData[1])
        this.realData.shift()
        this.realData.shift()
        // this.marginTop = 0
      }
    }
  },
  created() {
    // this.$axios({
    //   url: '',           // 获取后台数据
    //   method: "post",
    // }).then(res => {
    //   this.tableData = res
    // })
    this.timer= setInterval(this.showNotice, 1000)
  }
}
</script>

<style scoped>

</style>