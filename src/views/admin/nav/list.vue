<script setup>
import {onMounted, onUpdated} from 'vue'
import {useRoute} from 'vue-router'
import {ElMessage,ElMessageBox} from 'element-plus'
import NavAPI from '@/api/NavAPI'
import {House} from "@element-plus/icons-vue"; //导入添加导航组件
import { useNavStore } from '@/stores/admin/nav'
import NavAdd from '@/components/admin/nav/NavAdd.vue' //导入添加导航组件
import NavEdit from '@/components/admin/nav/NavEdit.vue' //导入编辑导航组件
//初始化
const route = useRoute()
const navStore = useNavStore()

//参数
let parentId = route.query.parent_id

//在组件成功挂载到DOM并完成首次渲染后调用
onMounted(() => {
  funcGetList() //获取列表
})

//在组件更新之后调用
onUpdated(() => {
  if (parentId !== route.query.parent_id) { // 当路由参数 parent_id 发生变化时
    parentId = route.query.parent_id //重置
    funcGetList() //重新获取列表
  }
})

//添加页
const pageAdd = () => {
  navStore.data.pageAdd = true
}
//编辑页
const pageEdit = (row) => {
  navStore.data.id = row.id
  navStore.data.pageEdit = true
}

//删除
const del = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除?', '标题', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })

    //删除
    let delResult = await NavAPI.del(String(row.id))
    if(!delResult.status){
      ElMessage.error(delResult.msg)
      return
    }

    ElMessage.success("删除成功")

    //重新获取列表
    let getListResult = await NavAPI.getListByParentId(parentId)

    if(getListResult.data == null){ //若没有数据则重置
      navStore.listData.list = []
      return
    }
    if(!getListResult.status){
      ElMessage.error(getListResult.msg)
      return
    }
    navStore.listData.list = getListResult.data.list //重置
  } catch (err) {
    console.log("err:", err)
  }
}

const funcGetList = () => { //func - 获取列表
  NavAPI.getListByParentId(parentId).then(result => {
    if (!result.status) {
      ElMessage.error(result.msg)
      return
    }

    navStore.listData.path = result.data.path //重置
    navStore.listData.list = result.data.list

    navStore.update(navStore.listData.path, parentId) //更新
  }).catch(err => {
    console.log("err:", err)
  })
}

const funcFormatDate = (time) => { //func - 格式化日期
  return time.slice(0, 10) //截取前10个字符
}
</script>

<template>
  <NavAdd/>
  <NavEdit/>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/admin/nav/list', query: { parent_id: 0 } }">
      <el-icon>
        <House/>
      </el-icon>
    </el-breadcrumb-item>

    <el-breadcrumb-item v-for="value in navStore.listData.path"
                        :to="{path:'/admin/nav/list',query:{ parent_id: value.id}}" :key="value.id">
      {{ value.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 按钮 -->
  <el-button type="primary" @click="pageAdd">添加导航</el-button>

  <!-- 表格 -->
  <el-table :data="navStore.listData.list" border>
    <el-table-column prop="id" label="ID" width="60"/>

    <el-table-column prop="name" label="名称" width="100">
      <template #default="scope">
        <router-link :to="{ path: '/admin/nav/list', query: { parent_id: scope.row.id } }" class="blue">
          {{ scope.row.name }}
        </router-link>
      </template>
    </el-table-column>

    <el-table-column prop="icon" label="图标" width="60">
      <template #default="scope">
        <el-icon v-if="scope.row.icon">
          <component :is="scope.row.icon"/>
        </el-icon>
      </template>
    </el-table-column>

    <el-table-column prop="path" label="路径"/>

    <el-table-column prop="status" label="状态" width="60">
      <template #default="scope">
        <span v-if="scope.row.status === '1'" class="green">显示</span>
        <span v-else class="orange">隐藏</span>
      </template>
    </el-table-column>

    <!-- <el-table-column prop="create_time" label="日期" width="180" /> -->
    <el-table-column prop="create_time" label="日期" width="180">
      <template #default="scope">
        {{ funcFormatDate(scope.row.create_time) }}
      </template>
    </el-table-column>

    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button size="small" type="primary" @click="pageEdit(scope.row)">编辑</el-button>
        <el-button size="small" @click="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<style scoped>

</style>