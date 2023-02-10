<template>
  <div>
    <search-input></search-input>
    <!--图书列表区-->
    <el-table :data="tableData" style="width: 70%;position: relative;left: 265px" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="bookName" label="书籍名称">
      </el-table-column>
      <el-table-column prop="bookId" label="图书id">
      </el-table-column>
      <el-table-column prop="authorName" label="图书作者">
      </el-table-column>
      <el-table-column prop="bookType" label="图书类型">
      </el-table-column>
      <el-table-column prop="borrowedNumber" label="借出数量">
      </el-table-column>
      <el-table-column prop="remainingNumber" label="图书库存">
      </el-table-column>
      <el-table-column prop="bookStatus" label="图书状态">
      </el-table-column>
    </el-table>

    <!--分页插件-->
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,15]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import searchInput from "@/components/commont/bookSearch/searchInput";

export default {
  name: "bookSearch",
  components: {
    searchInput,
  },
  data() {
    return {
      total: 0,
      pageSizes: 5,
      // 默认显示几条
      pageSize: 10,
      currentPage: 1,
      tableData: []
    }
  },
  methods: {

    // // 分页操作
    // handleCurrentChange(val) {
    //   this.currentPage = val; //val可以获取当前用户选择的页码数
    //   this.initTable();//页面加载触发的查询所有的事件
    // },
    // //每页显示的条数大小改变时触发的方法
    // handleSizeChange(val) {
    //   this.pageSize = val;//获取用户想要每页显示的条数
    //   this.initTable();
    // },
    // //页面加载事件
    // initTable() {
    //   this.$axios.get("https://api.apiopen.top/api/getImages?" + this.currentPage + "&page=" + this.pageSize).then(function (result) {
    //     console.log(result.data)
    //     if (result.data.code == 200) {
    //       app.tableData = result.data.list;
    //       // app.total = result.data.data.total;
    //     } else{
    //       this.$message.error(result.data.msg);
    //     }
    //   })
    // },
    handleSizeChange(newSize) {
      console.log(newSize);
      this.pageSize = newSize;//重新指定每页数据量
      this.getUsersList();//带着新的分页请求获取数据
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.currentPage = newPage;//重新指定当前页
      this.getUsersList();//带着新的分页请求获取数据
    },
    async getUsersList() {
      const {data: res} = await this.$axios.get("/api/book/page?page=" + this.currentPage + "&pageSize=" + this.pageSize)
      if (res.code != 1) {
        console.log(res);
        return this.$message.error("获取用户列表失败！");
      }
      console.log(res);
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.pageSize = res.data.records.pages;
    },
    //监听 pagesize 改变的事件

  },
  // 计算属性
  mounted() {
    this.getUsersList();
  }
}
</script>

<style scoped>
* {
  text-align: center;
}
</style>