<template>
  <!--<div>在线读者</div>-->
  <div>
    <search-input></search-input>
    <div style="width: 1000px;height: 600px;position: absolute;left: 300px">
      <el-table
          :data="realData" stripe>
        <el-table-column
            prop="id"
            label="id">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="grade"
            label="班级">
        </el-table-column>
        <el-table-column
            prop="major"
            label="专业">
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-dialog>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)">下线   <!--scope.row获取本行数据-->
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
            :page-sizes="[10, 15, 20]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import searchInput from "@/components/commont/bookSearch/searchInput";

export default {
  name: "onlineUser",
  components: {
    searchInput
  },
  inject:['reload'],
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 获取到的数据储存
      realData: [],
      //
      total: 0,
      pageSizes: 5,
      // 默认显示几条
      pageSize: 10,
      currentPage: 1,
    }
  },
  methods: {
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
    // 删除
    handleDelete(id) {
      this.$confirm('此操作将下线该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios.delete('api/user/' + id).then(result => {
          this.$message({
            type: 'success',
            message: '下线成功!'
          });this.reload()   // 删除数据后刷新网页
        } ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下线'
          });
        });
      })
    },

    async getUsersList() {
      const {data: res} = await this.$axios.get("/api/user/all")
      if (res.code != 1) {
        console.log(res);
        return this.$message.error("获取用户列表失败！");
      }
      console.log(res);
      this.realData = res.data;
      this.total = res.data.length;
      // this.pageSize = res.data.;
    },

  },
  created() {
    this.getUsersList()
  }
}
</script>

<style scoped>

</style>