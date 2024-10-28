<script setup>
import {reactive} from 'vue'
import {House} from "@element-plus/icons-vue";

//数据
const data = reactive({
  path: [
    {id: '1', name: '类别', parent_id: '0', create_time: '2024-03-22'},
    {id: '2', name: '前端', parent_id: '1', create_time: '2024-03-23'}
  ],
  list: [
    {id: '3', name: 'Vue', parent_id: '2', status: '1', create_time: '2024-03-23'},
    {id: '4', name: 'ES', parent_id: '2', status: '1', create_time: '2024-03-24'},
    {id: '5', name: 'JS', parent_id: '2', status: '0', create_time: '2024-03-25'}
  ]
})
</script>

<template>
  <!-- 面包屑
  <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="#"><el-icon><House /></el-icon></a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="#">类别</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="#">前端</a></el-breadcrumb-item>
  </el-breadcrumb>
  -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>
      <a href="/admin/category/list?parent_id=0">
        <el-icon>
          <House/>
        </el-icon>
      </a>
    </el-breadcrumb-item>

    <el-breadcrumb-item v-for="value in data.path" :key="value.id">
      <a :href="`/admin/category/list?parent_id=${value.id}`">{{ value.name }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 按钮 -->
  <el-button type="primary">添加类别</el-button>

  <!-- 表格 -->
  <el-table :data="data.list" border>
    <el-table-column prop="id" label="ID" width="80"/>
    <!-- <el-table-column prop="name" label="名称"/> -->
    <el-table-column prop="name" label="name">
      <template #default="scope">
        <a :href="`/admin/category/list?parent_id=${scope.row.id}`" class="blue">{{ scope.row.name }}</a>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="status" label="状态" width="80" /> -->
    <el-table-column prop="status" label="状态" width="80">
      <template #default="scope">
        <span v-if="scope.row.status === '1'" class="green">显示</span>
        <span v-else class="orange">隐藏</span>
      </template>
    </el-table-column>
    <el-table-column prop="create_time" label="日期" width="200"/>

    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>