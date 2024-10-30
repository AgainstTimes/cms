<script setup>
import { shallowRef,reactive,onMounted,onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from 'vue-router'
import CategoryAPI from '@/api/CategoryAPI'
import ArticleAPI from '@/api/ArticleAPI'

//初始化
const route = useRoute() //路由
const router = useRouter() //路由器

//wang editor --- start
import '@wangeditor/editor/dist/css/style.css' // 导入 wang editor 样式
import '@/assets/admin/css/wangEditor.css' //导入自定义样式
import wangEditor from '@/assets/admin/js/wangEditor.js' //导入自定义配置
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {Plus} from "@element-plus/icons-vue";

const editorRef = shallowRef() //shallowRef 仅提供一层浅层的响应性, 而 ref 那提供深层嵌套的响应性

//配置
//const toolbarConfig = {}
//const editorConfig = {}

const editorInit = (editor) => {  //辑器初始化完成时的回调函数
  editorRef.value = editor
}

onBeforeUnmount(() => { //组件卸载时销毁编辑器
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})
//wang editor --- end

//数据
const data = reactive({
  category_id: '',
  title: '',
  author: '',
  url: '',
  thumbnail: '',
  content: '',
  sort: '0',
  status: '1'
})

const category = reactive({ //下拉框
  list: []
})

//在组件成功挂载到DOM并完成首次渲染后调用
onMounted(() => {
  //获取类别列表
  CategoryAPI.getAllById(import.meta.env.VITE_CATEGORY_ID).then(result => {
    if(!result.status){
      ElMessage.error(result.msg)
      return
    }

    category.list = result.data
  }).catch(err => {
    console.log("err:", err)
  })

  //获取文章
  ArticleAPI.getById(route.query.id).then(result => {
    if(!result.status){
      ElMessage.error(result.msg)
      return
    }
    data.category_id = result.data.category_id
    data.title = result.data.title
    data.author = result.data.author
    data.url = result.data.url
    data.thumbnail = result.data.thumbnail
    data.content = result.data.content
    data.sort = result.data.sort
    data.status = result.data.status
  }).catch(err => {
    console.log("err:", err)
  })
})

//上传缩略图 --- start
let apiUrl = import.meta.env.VITE_API_URL

const beforeUpload = file => {
  if (file.type !== 'image/jpeg') {
    ElMessage.error('请上传 jpg 格式图片')
    return false
  }

  if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB')
    return false
  }

  return true
}

const uploadSuccess = result => {
  //console.log(result)
  data.thumbnail = apiUrl + "/" + result.data.filePath
}
//上传缩略图 --- end

//添加
const edit = () => {

  if (data.category_id === '') {
    ElMessage.error("请选择类别")
    return
  }
  if (data.title === '') {
    ElMessage.error("请填写标题")
    return
  }

  data.id = route.query.id //添加属性

  ArticleAPI.edit(data).then(result => {
    //console.log(result)

    if(!result.status){
      ElMessage.error(result.msg)
      return
    }

    ElMessage.success("编辑成功")
  }).catch(err => {
    console.log("err:", err)
  })
}


//返回
const back = () => {
  router.go(-1)
}
</script>

<template>
  <el-form label-width="80" style="width: 400px;">
    <el-form-item label="类别">
      <el-select v-model="data.category_id" placeholder="请选择">
        <!-- :value="String(value.id)" 强制转换为字符串类型  -->
        <el-option v-for="value in category.list" :value="String(value.id)" :label="value.level_padding + value.name" :key="value.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="标题">
      <el-input v-model="data.title" placeholder="请填写标题" />
    </el-form-item>

    <el-form-item label="作者">
      <el-input v-model="data.author" />
    </el-form-item>

    <el-form-item label="作者网站">
      <el-input v-model="data.url" />
    </el-form-item>

    <el-form-item label="缩略图">
      <el-upload :action="`${apiUrl}/api/article/uploadImg`"
                 :before-upload="beforeUpload"
                 :on-success="uploadSuccess"
                 :show-file-list="false" >

        <img v-if="data.thumbnail" :src="data.thumbnail" style="width: 180px;"  alt=""/>
        <el-icon v-else><Plus /></el-icon>
      </el-upload>
    </el-form-item>

    <el-form-item label="内容" style="width: 1000px;">
      <div class="wangEditor">
        <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="wangEditor.toolbarConfig" />
        <Editor class="content" v-model="data.content" :defaultConfig="wangEditor.editorConfig" @onCreated="editorInit" />
      </div>
    </el-form-item>

    <el-form-item label="排序">
      <el-input v-model="data.sort" />
    </el-form-item>

    <el-form-item label="状态">
      <el-radio-group v-model="data.status">
        <el-radio value="1">显示</el-radio>
        <el-radio value="0">隐藏</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="edit">编辑</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>