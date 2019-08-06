<template>
    <div>
      <el-input type="text"
                v-model="blog.tittle"
                auto-complete="off"
                placeholder="请输入博客标题"
                size="large">
      </el-input>
      <mavon-editor :toolbars="toolbars"
                    :boxShadow="boxShadow"
                    class="mavon-editor"
                    v-model="blog.content"
                    @imgAdd="handleAddImg"
                    ref="md"></mavon-editor>
      <span>
          <el-button type="success" @click="handlePush">发布</el-button>
          <el-button type="danger">取消</el-button>
      </span>
    </div>
</template>

<script>
  import mavonEditor from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: 'AddBlog',
    components: {
      'mavon-editor': mavonEditor.mavonEditor
    },
    computed: {
      status () {
        return this.$route.params.id === '-1' ? 'add' : 'update'
      }
    },
    data () {
      return {
        boxShadow: false,
        blog: {
          tittle: '',
          content: ''
        },
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: false, // 上角标
          subscript: false, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      }
    },
    methods: {
      handlePush () {
        let url = {
          add: '/api/blog/addBlog',
          update: `/api/blog/updateBlog?id=${this.$route.params.id}`
        }
        if (this.status === 'add'){
          this.blog.createTime = Date.now()
        } else {
          this.blog.updateTime = Date.now()
        }

        this.$http.post(url[this.status],this.blog).then(res => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: '发布成功',
              type: 'success'
            });
            this.$router.push(`/`)
          }
        })
      },
      // 绑定@imgAdd event
      handleAddImg(pos, $file){
        // 第一步.将图片上传到服务器.
        const formdata = new FormData();
        formdata.append('image', $file);
        this.$http.post('/api/blog/imgAdd',formdata,{
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          this.$refs.md.$img2Url(pos, res.data.data.url);
        })
      },
      _getBlogData () {
        this.$http.get(`/api/blog/blogDetail?id=${this.$route.params.id}`).then(res => {
          const blogDetail = res.data.data.blogDetail

          this.blog.tittle = blogDetail.tittle
          this.blog.content = blogDetail.content
        })
      }
    },
    mounted () {
      if(this.status === 'update') {
        this._getBlogData ()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .mavon-editor
    padding 20px 0
    height 350px
</style>
