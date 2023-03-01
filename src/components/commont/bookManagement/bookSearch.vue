<template>
  <div>
      <search-input></search-input>
    <!--图书列表区-->
    <div style="top: -50px;position: relative;width: 20px;left: 800px">
      <el-button @click="dialogVisible = true">增加书籍</el-button>
      <el-dialog
          title="增加书籍"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>
            <div>
              <el-input v-model="book.name" style="width: 350px;">
                  <template slot="prepend">书籍名称:</template>
              </el-input>
              <el-input v-model="book.id" style="width: 350px;top: 5px">
                  <template slot="prepend">图书id&nbsp;&nbsp;&nbsp;:</template>
              </el-input>
              <el-input v-model="book.author" style="width: 350px;top: 10px">
                  <template slot="prepend">图书作者:</template>
              </el-input>
              <el-input v-model="book.publish" style="width: 350px;top: 15px">
                  <template slot="prepend">出版社&nbsp;&nbsp;&nbsp;:</template>
              </el-input>
              <el-input v-model="book.amount" style="width: 350px;top: 20px">
                  <template slot="prepend">书籍库存:</template>
              </el-input>

              </div>
            </span>
            <span slot="footer" class="dialog-footer">
                  <form>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="submit" @click="submit">添加书籍</el-button>
                  </form>
          </span>
      </el-dialog>
    </div>
    <el-table :data="tableData" style="width: 70%;position: relative;left: 265px" border stripe>
      <!--      <el-table-column type="index"></el-table-column>-->

      <el-table-column prop="id" label="图书id">
      </el-table-column>
      <el-table-column prop="name" label="书籍名称">
      </el-table-column>
      <el-table-column prop="author" label="图书作者">
      </el-table-column>
      <el-table-column prop="publisher" label="出版社">
      </el-table-column>
      <el-table-column prop="borrowedAmount" label="借出数量">
      </el-table-column>
      <el-table-column prop="amount" label="图书库存">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
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
  inject:['reload'], // 删除后刷新
  data() {
    return {
      dialogVisible: false,
      total: 0,
      pageSizes: 5,
      // 默认显示几条
      pageSize: 10,
      currentPage: 1,
      tableData: [],

      // 添加书籍
      book: {
        name: '',
        author: '',
        id: '',
        publish: '',
        amount: ''
      }
    }
  },
  methods: {
    handleDelete(id) {
      this.$confirm('此操作将下线该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        console.log(id);
        this.$axios.delete('/api/book/' + id).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });this.reload()   // 删除数据后刷新网页
        } ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      })
    },
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
    // 关闭窗口
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },

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
    // 增加书籍方法
    submit() {
      this.$axios.post('/api/book/add').then(res => {
        console.log(res);
      })
    }

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