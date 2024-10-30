<script setup>
import {ref, reactive, onMounted, watch} from 'vue'
import ArticleAPI from '@/api/ArticleAPI'
import {ElMessage,ElMessageBox } from 'element-plus'
import {Delete, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
//初始化
const router = useRouter()

//数据
const data = reactive({
  list: []
})

const page = ref(1) //当前页 默认第1页
const total = ref(20) //总记录数
let pageSize = Number(import.meta.env.VITE_PAGE_SIZE) //每页显示记录数
//在组件成功挂载到DOM并完成首次渲染后调用
onMounted(() => {
  funcPageList() //获取列表
})

//监听 page
watch(page, (newValue, oldValue) => {
  if (oldValue !== newValue) {
    funcPageList() //重新获取列表
  }
})
//删除
const del = (row) => {
  funcDel(String(row.id))
}
//工具栏 - 删除
let selectedIdArr = []
const selectionChange = (data) => {
  selectedIdArr = [] //重置
  data.forEach((value) => {
    selectedIdArr.push(value.id)
  })
}
const toolDel = () => {
  if (selectedIdArr.length === 0) {
    ElMessage.error("请勾选要删除的记录")
    return
  }
  funcDel(String(selectedIdArr))
}

//编辑
const edit = (row) => {
  //console.log("row:", row)

  router.push({ path: '/admin/article/edit', query: { id: row.id } })
}
//工具栏 - 编辑
const toolEdit = () => {
  if(selectedIdArr.length === 0){
    ElMessage.error("请勾选需要编辑记录")
    return
  }

  if(selectedIdArr.length !== 1){
    ElMessage.error("请勾选单条记录")
    return
  }

  router.push({ path: '/admin/article/edit', query: { id: String(selectedIdArr) } })
}
//工具栏 - 添加
const toolAdd = () => {
  router.push("/admin/article/add")
}


//获取新页码
const currentChange = (newPage) => {
  page.value = newPage //重置当前页
}
const funcPageList = () => { //func - 获取列表
  ArticleAPI.pageList(page.value, pageSize).then(result => {
    if (!result.status) {
      ElMessage.error(result.msg)
      return
    }
    data.list = result.data.list //更新列表
    total.value = result.data.pages.total //设置总记录数
  }).catch(err => {
    console.log("err:", err)
  })
}
const funcDel = async (id) => { //func - 删除
  try {
    await ElMessageBox.confirm('确认删除?', '标题', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })

    //删除
    let delResult = await ArticleAPI.del(id)
    if (!delResult.status) {
      ElMessage.error(delResult.msg)
      return
    }

    //删除数据后重置到第1页
    if (page.value !== 1) {
      page.value = 1 //重置当前页
    } else {
      funcPageList() //若当前页是第1页重新获取列表
    }
  } catch (err) {
    console.log("err:", err)
  }
}
</script>

<template>
  <!-- 工具栏 -->
  <el-button-group size="small">
    <el-button type="primary"  @click="toolAdd">
      <el-icon>
        <Plus/>
      </el-icon>
    </el-button>

    <el-button type="primary" @click="toolEdit">
      <el-icon>
        <Edit/>
      </el-icon>
    </el-button>

    <el-button type="primary" @click="toolDel">
      <el-icon>
        <Delete/>
      </el-icon>
    </el-button>
  </el-button-group>

  <!-- 表格 -->
  <el-table :data="data.list" border @selection-change="selectionChange" >
    <el-table-column type="selection" width="55"></el-table-column>

    <el-table-column prop="id" label="ID" width="80"/>
    <el-table-column prop="title" label="标题" width="200"/>
    <el-table-column prop="url" label="网址" width="200"/>
    <el-table-column prop="status" label="状态" width="80">
      <template #default="scope">
        <span v-if="scope.row.status === '1'" class="green">显示</span>
        <span v-else class="orange">隐藏</span>
      </template>
    </el-table-column>
    <el-table-column prop="sort" label="排序" width="80"/>
    <el-table-column prop="create_time" label="日期" width="150"/>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
        <el-button size="small" @click="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination layout="prev, pager, next, jumper, total" :total="total" :page-size="pageSize" :current-page="page"
                 @current-change="currentChange"/>
</template>

<style scoped>

</style>