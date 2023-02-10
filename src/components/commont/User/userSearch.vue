<template>
  <div>
    <search-input></search-input>
    <div style="width: 1000px;height: 600px;position: absolute;left: 300px">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            label="用户名"
            width="180" prop="userId">
        </el-table-column>
        <el-table-column
            label="状态"
            width="180" prop="userStatus">
        </el-table-column>
        <el-table-column
            label="权限"
            width="180" prop="userType">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="dialogFormVisible = true">编辑
            </el-button>
            <el-dialog title="编辑" :visible.sync="dialogFormVisible">
              <el-form>
                <el-form-item label="账号" :label-width="formLabelWidth">
                  <el-input v-model="scope.row.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号权限" :label-width="formLabelWidth">
                  <el-select v-model="scope.row.userType" placeholder="请选择权限">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="0" value="0"></el-option>
                  </el-select>
                  <i>注:1为读者,0为管理员</i>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
              </div>
            </el-dialog>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.userId)">删除
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
  name: "userSearch",
  components: {
    searchInput
  },
  inject:['reload'],
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      region: '',
      formLabelWidth: '120px',
      user: '',
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
    // 删除在线人员
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
            message: '删除成功!'
          });this.reload()   // 删除数据后重新获取数据
        } ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      })
    },
    // 获取在线人员
    async getUsersList() {
      const {data: res} = await this.$axios.get("/api/user/page?page=" + this.currentPage + "&pageSize=" + this.pageSize)
      if (res.code != 1) {
        console.log(res);
        return this.$message.error("获取用户列表失败！");
      }
      console.log(res);
      this.tableData = res.data.records;
      // console.log(this.tableData[0].userId);
      this.total = res.data.total;
      // this.pageSize = res.data.records.pages;
    },
    submit() {
      this.$axios({
        url: '/api/user/login',
        method: 'post',
        params: {
          userId: 'u962104789',
          userPassword: '67813831'
        },
        dataType: 'json',
        data: {},
      }).then(res => {
        console.log(res);
      })
    }
  },
  created() {
    // this.$axios({
    //   url: '/api/student/all',
    //   method: 'get'
    // }).then(res => {
    //   console.log(res);
    // })
    this.getUsersList()
  }
}
</script>
<style>
body {
  text-align: center;
}
</style>