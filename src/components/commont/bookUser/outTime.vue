<template>
  <div>
    <search-input></search-input>
    <el-table :data="tableData" style="width: 70%;position: relative;left: 275px" border stripe>
      <el-table-column
          prop="id"
          label="名字">
      </el-table-column>
      <el-table-column
          prop="title"
          label="书籍">
      </el-table-column>
      <el-table-column
          prop="address"
          label="借阅时长">
      </el-table-column>
      <el-table-column
          prop="address"
          label="超时时长">
      </el-table-column>
      <el-table-column
          prop="address"
          label="操作">
        <template>
          <el-button
              size="mini"
              @click="remind">提醒归还
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页插件-->
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import searchInput from "@/components/commont/bookSearch/searchInput";


export default {
  name: "outTime",
  components: {
    searchInput
  },
  data() {
    return {
      total: 0,
      pageSizes: 10,
      // 默认显示几条
      pageSize: 20,
      currentPage: 2,
      tableData: []
    }
  },
  methods: {
    // 获取数据
    async getUsersList() {
      const {data: res} = await this.$axios.get("https://api.apiopen.top/api/getImages?" + this.currentPage + "&page=" + this.pageSize)
      if (res.code != 200) {
        return this.$message.error("获取用户列表失败！");
      }
      console.log(res);
      this.tableData = res.result.list;
      this.total = res.result.list.length;
    },
    //监听 pagesize 改变的事件
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
    remind() {
      alert("提醒成功")
    }
  },
  // 计算属性
  mounted() {
    this.getUsersList();
  }
}
</script>

<style scoped>

</style>