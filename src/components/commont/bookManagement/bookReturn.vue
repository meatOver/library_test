<template>
  <div>
    <search-input></search-input>
    <div style="width: 1000px;height: 600px;position: absolute;left: 300px">
      <div style="top: -50px;position: relative;width: 20px;left: 500px;">
        <el-button @click="dialogVisible = true">上传文件</el-button>
        <el-dialog
            title="上传文件"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
          <span>
            <div>
                <input type="file" ref="fileInput" @change="changeFile" style="top: 50px;"/>
              </div>
          </span>
          <span slot="footer" class="dialog-footer">
            <form @submit.prevent="uploadFile">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="submit" @click="openUploadModal = false">上传文件</el-button>
            </form>
          </span>
        </el-dialog>
      </div>
      <el-table
          :data="realData" stripe>
        <el-table-column
            prop="id"
            label="借阅id">
        </el-table-column>
        <el-table-column
            prop="userId"
            label="名字id">
        </el-table-column>
        <el-table-column
            prop="bookId"
            label="书籍id">
        </el-table-column>
        <el-table-column
            prop="startTime"
            :formatter="formatTime"
            label="开始时间">
        </el-table-column>
        <el-table-column
            prop="endTime"
            :formatter="formatTime"
            label="结束时间">
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
  inject:['reload'], // 删除后刷新
  data() {
    return {
      dialogVisible: false,
      // 获取到的数据储存
      realData: [],
      showUploadModal: false,
      file: null,
      pageSize: 10,
      currentPage: 1,
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
        this.$axios.delete('/api/borrowRecords/' + id).then(result => {
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

    // 上传文件
    openUploadModal() {
      this.showUploadModal = true;
    },
    closeUploadModal() {
      this.showUploadModal = false;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    changeFile(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      this.$axios.post('/api/book/import', formData).then(response => {
        console.log(response.data);
        this.closeUploadModal();
      }).catch(error => {
        console.error(error);
      });
    },
    // 获取数据
    async getUsersList() {
      const {data: res} = await this.$axios.get("/api/borrowRecords?page=" + this.currentPage + "&pageSize=" + this.pageSize)
      if (res.code !== 1) {
        return this.$message.error("获取用户列表失败！");
      }
      console.log(res);
      this.realData = res.data;
      this.total = res.data.length;
      // this.pageSize = res.data.records.pages;
    },
    // 时间格式化
    formatTime(row, column){
      let data = row[column.property]
      let dtime = new Date(data)
      const year = dtime.getFullYear()
      let month = dtime.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = dtime.getDate()
      if (day < 10) {
        day = '0' + day
      }
      let hour = dtime.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }
      let minute = dtime.getMinutes()
      if (minute < 10) {
        minute = '0' + minute
      }
      let second = dtime.getSeconds()
      if (second < 10) {
        second = '0' + second
      }
      return year+ '-' + month+ '-' + day + ' ' + hour + ':' + minute + ':' + second
    },
  },
  created() {
    // this.$axios({
    //   url: '',           // 获取后台数据
    //   method: "post",
    // }).then(res => {
    //   this.tableData = res
    // })
    this.getUsersList()
  }
}
</script>

<style scoped>

</style>