<template>
  <div>
    <el-table :data="blogList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
      <el-table-column
        label="标题">
        <template slot-scope="scope">
          <span style="color: #409eff;cursor: pointer" @click="itemClick(scope.row)">{{scope.row.tittle}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          <span>{{_getTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最近更新时间">
        <template slot-scope="scope">
          <span>{{_getTime(scope.row.updateTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getTime} from '@/common/js/common'
    export default {
      name: "BlogList",
      data () {
        return {
          blogList: [],
          total: 0,
          pageSize: 5,
          currentPage: 1
        }
      },
      created () {
        this._getBlogList()
      },
      methods: {
        handleEdit ($index,row) {
          this.$router.push(`/Home/AddBlog/${row.id}`)
        },
        handleDelete ($index,row) {
          this.$confirm('￣へ￣此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
          }).then(() => {
            this.$http.get(`/api/blog/deleteBlog?id=${row.id}`).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '(*^▽^*)删除成功!'
                });
                this._getBlogList()
              }else {
                this.$message({
                  type: 'error',
                  message: 'o(╥﹏╥)o删除失败!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        itemClick (row) {
          this.$router.push(`/blogDetail/${row.id}`)
        },
        current_change (currentPage) {
          this.currentPage = currentPage
        },
        _getBlogList(){
          this.$http.get('/api/blog/blogList').then(res => {
            this.blogList = res.data.data.blogList
            this.total = this.blogList.length
          })
        },
        _getTime (val) {
          return getTime(val)
        }
      }
    }

</script>

<style scoped>

</style>
